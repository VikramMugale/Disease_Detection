# Pomegranate Health Analyzer

An AI-powered web application for detecting diseases in pomegranate fruits using computer vision and machine learning.

## 🌟 Features

- **Image Upload**: Upload pomegranate fruit images for analysis
- **AI Disease Detection**: Uses YOLOv11 model for accurate disease identification
- **Multi-language Support**: Get disease information in English, Hindi, and Marathi
- **Real-time Results**: Instant prediction with confidence scores
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

### Backend
- **Flask**: Web framework for API development
- **Ultralytics YOLOv11**: Deep learning model for object detection
- **OpenCV**: Computer vision library
- **Pillow**: Image processing
- **NumPy**: Numerical computing

### Frontend
- **React 19**: Modern JavaScript library for UI
- **Vite**: Fast build tool and development server
- **CSS3**: Styling and animations

## 🚀 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (create `.env` file):
   ```env
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

5. Run the backend server:
   ```bash
   python run.py
   ```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## 📖 Usage

1. Open your browser and go to `http://localhost:5173`
2. Select your preferred language (English, Hindi, or Marathi)
3. Upload a clear image of a pomegranate fruit
4. View the disease detection results with:
   - Disease name
   - Confidence percentage
   - Cause of the disease
   - Prevention methods
   - Treatment recommendations

```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

