import sys
import os
from ultralytics import YOLO
import threading

# Add parent directory to Python path to resolve config imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import MODEL_PATH

# Load model once at startup
_model = None
_lock = threading.Lock()


def load_model():
    global _model
    if _model is None:
        with _lock:
            if _model is None:
                _model = YOLO(MODEL_PATH)
    return _model


def predict_image(image_path):
    model = load_model()
    results = model.predict(image_path, conf=0.4, verbose=False)[0]

    # No detections
    if len(results.boxes) == 0:
        return {
            "label": "Unknown",
            "confidence": 0.0
        }

    # Prefer the detection with highest confidence instead of taking the first box
    try:
        confs = results.boxes.conf
        clss = results.boxes.cls
        # convert to numpy if tensors
        if hasattr(confs, "cpu"):
            conf_vals = confs.cpu().numpy()
        else:
            conf_vals = confs.numpy()

        best_idx = int(conf_vals.argmax())
        cls = int(clss[best_idx])
        conf = float(conf_vals[best_idx])
    except Exception:
        # Fallback to first box if something unexpected in results shape
        cls = int(results.boxes.cls[0])
        conf = float(results.boxes.conf[0])

    # Resolve label name for best prediction
    try:
        label = model.names[int(cls)]
    except Exception:
        label = model.names.get(int(cls), str(int(cls)))

    # Build top-k predictions (include best as primary for backward compatibility)
    preds = []
    try:
        # convert to numpy arrays if needed
        if hasattr(confs, "cpu"):
            all_confs = confs.cpu().numpy()
        else:
            all_confs = confs.numpy()

        if hasattr(clss, "cpu"):
            all_clss = clss.cpu().numpy()
        else:
            all_clss = clss.numpy()

        order = all_confs.argsort()[::-1]
        top_k = min(3, len(order))
        for i in range(top_k):
            idx = int(order[i])
            c = int(all_clss[idx])
            cf = float(all_confs[idx])
            try:
                name = model.names[c]
            except Exception:
                name = model.names.get(c, str(c))
            preds.append({"label": name, "confidence": round(cf * 100, 2)})
    except Exception:
        # fallback: just return the selected best
        preds.append({"label": label, "confidence": round(conf * 100, 2)})

    print("MODEL NAMES:", model.names)
    print(f"Selected class {cls} with confidence {conf}")
    print("Top predictions:", preds)

    return {
        "label": label,
        "confidence": round(conf * 100, 2),
        "predictions": preds
    }
