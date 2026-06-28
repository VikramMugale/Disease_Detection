# Pomegranate Disease Detection System - Project Context

This document contains a comprehensive analysis of the "Pomegranate Disease Detection" full-stack project, including the tech stack, project structure, architecture, and complete data flow. You can use this as context to understand the application.

## 1. Project Overview
This is an AI-powered React and Flask application designed to detect diseases in pomegranate fruits using computer vision and machine learning (YOLOv11). It features multilingual support (English, Hindi, Marathi) for disease information.

## 2. Technology Stack
### Frontend
- **Framework/Library:** React 19
- **Build Tool:** Vite
- **Styling:** Vanilla CSS3
- **State Management:** React Hooks (`useState`) and Context API (`LanguageContext`)
- **Key Components:** `Home`, `UploadForm`, `ResultCard`, `LanguageSelect`, `Footer`, `Loader`

### Backend
- **Framework:** Flask (Python)
- **Machine Learning Model:** YOLOv11 (via `ultralytics` library)
- **Computer Vision:** OpenCV, Pillow
- **Data Handling:** NumPy, JSON (for disease database)
- **Server:** Gunicorn (for production)
- **CORS:** `flask-cors` to allow frontend-backend communication

## 3. Project Structure

```text
├── backend/
│   ├── app/
│   │   ├── __init__.py         # Flask App Factory
│   │   ├── predictor.py        # YOLO model loading and inference logic
│   │   ├── routes.py           # API endpoints (e.g., /predict)
│   │   ├── utils.py            # Helper functions
│   │   └── disease_db.json     # Multilingual database of diseases (causes, prevention, remedy)
│   ├── model/
│   │   ├── best.pt             # Trained YOLOv11 model weights
│   │   └── best0.pt            # Alternative model weights
│   ├── uploads/                # Temporary directory for uploaded images
│   ├── config.py               # App configuration (paths, debug modes)
│   ├── requirements.txt        # Python dependencies
│   └── run.py                  # Entry point for running the Flask server
├── frontend/
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images, icons, etc.
│   │   ├── components/         # Reusable React components (UploadForm, ResultCard, etc.)
│   │   ├── context/            # LanguageContext.jsx
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Page views (Home.jsx)
│   │   ├── services/           # api.js for backend HTTP communication
│   │   ├── styles/             # Application CSS files
│   │   ├── App.jsx             # Main React Application Wrapper
│   │   └── main.jsx            # React DOM rendering entry point
│   ├── package.json            # Node.js dependencies and scripts
│   └── vite.config.js          # Vite configuration
└── README.md
```

## 4. Application Architecture & Data Flow

### Step-by-Step Flow:
1. **User Interaction (Frontend)**
   - The user opens the web application (React app via Vite on port `5173`).
   - The user selects their preferred language (English, Hindi, or Marathi) using the `LanguageSelect` component.
   - The user uploads an image of a pomegranate fruit using the `UploadForm` component.

2. **API Request (Frontend -> Backend)**
   - The frontend's `api.js` service creates a `FormData` object containing the uploaded `file` and the selected `language`.
   - A `POST` request is sent to the backend endpoint `http://localhost:5000/predict`.

3. **Request Processing (Backend)**
   - The request hits the `/predict` route in `backend/app/routes.py`.
   - The server validates the file existence, name, and allowed extensions (`.jpg`, `.jpeg`, `.png`).
   - The image is saved temporarily in the `backend/uploads/` directory using `secure_filename`.

4. **Machine Learning Inference (Backend)**
   - `routes.py` calls the `predict_image(filepath)` function from `backend/app/predictor.py`.
   - The YOLOv11 model (`model/best.pt`) runs an inference prediction on the saved image.
   - It identifies bounding boxes, calculates confidence scores, and determines the top prediction (disease label).
   - If no disease is detected, it returns "Unknown".

5. **Information Retrieval (Backend)**
   - Using the predicted disease `label` (e.g., "bacterial_blight"), `routes.py` queries the `disease_db.json` file.
   - It fetches the corresponding information (name, cause, prevention, remedy) specifically matched to the user's requested `language`.

6. **API Response (Backend -> Frontend)**
   - The backend constructs a JSON response containing:
     - `disease`: the raw label
     - `diseaseName`: the translated name
     - `confidence`: probability percentage
     - `cause`, `prevention`, `remedy` in the selected language.
   - The JSON is returned to the frontend.

7. **Result Rendering (Frontend)**
   - The `UploadForm` receives the response data and passes it up to `Home.jsx` via the `onResult` callback.
   - `Home.jsx` updates its `result` state.
   - The `ResultCard` component renders the predicted disease information, confidence score, and treatment details seamlessly to the user.

## 5. Potential Discussion Topics for AI
- **Scalability:** How to improve the YOLO inference time (e.g., ONNX runtime, TensorRT) or move it to a cloud provider?
- **Security:** Adding rate limiting or stricter file validation for the image uploads.
- **Frontend Optimization:** Improving user experience during the loading states or offline caching.
- **Database:** Migrating `disease_db.json` to a real database (PostgreSQL/MongoDB) for easier content management.
