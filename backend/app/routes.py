import os
import json
import sys
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

# Add parent directory to Python path to resolve config imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from app.predictor import predict_image

routes = Blueprint("routes", __name__)

# Load disease database once
DB_PATH = os.path.join(os.path.dirname(__file__), "disease_db.json")
with open(DB_PATH, "r", encoding="utf-8") as f:
    DISEASE_DB = json.load(f)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@routes.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    language = request.form.get("language", "en")

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    prediction = predict_image(filepath)
    label = prediction["label"]
    confidence = prediction["confidence"]

    disease_info = DISEASE_DB.get(label, {})
    lang_info = disease_info.get(language, {})

    response = {
        "disease": label,
        "diseaseName": lang_info.get("name", label.replace("_", " ")),
        "confidence": confidence,
        "cause": lang_info.get("cause", "N/A"),
        "prevention": lang_info.get("prevention", "N/A"),
        "remedy": lang_info.get("remedy", "N/A"),
        "language": language
    }

    return jsonify(response)
