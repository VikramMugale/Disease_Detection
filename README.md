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

## 📁 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── predictor.py      # YOLO model prediction logic
│   │   ├── routes.py         # Flask API routes
│   │   ├── utils.py          # Utility functions
│   │   └── disease_db.json   # Disease information database
│   ├── model/
│   │   ├── best.pt           # Trained YOLO model
│   │   └── best0.pt          # Alternative model
│   ├── uploads/              # Uploaded images storage
│   ├── config.py             # Configuration settings
│   ├── requirements.txt      # Python dependencies
│   └── run.py                # Flask application entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React context for state management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   └── styles/           # CSS stylesheets
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Vite configuration
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YOLOv11 model trained on pomegranate disease dataset
- Disease information sourced from agricultural research
- Icons and UI inspiration from various open-source projects

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.</content>
<parameter name="filePath">c:\Users\Abhishek Mugale\OneDrive\Desktop\colab\README.md