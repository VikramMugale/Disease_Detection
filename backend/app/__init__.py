from flask import Flask
from flask_cors import CORS
import sys
import os

# Add parent directory to Python path to resolve config imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.routes import routes
from config import UPLOAD_FOLDER


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    app.register_blueprint(routes)

    return app
