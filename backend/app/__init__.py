from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to Python path to resolve config imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.routes import routes
from config import UPLOAD_FOLDER


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    app.register_blueprint(routes)

    @app.errorhandler(Exception)
    def handle_exception(e):
        # Pass through HTTP exceptions
        from werkzeug.exceptions import HTTPException
        code = 500
        if isinstance(e, HTTPException):
            code = e.code
        
        # Log the error on the server side
        app.logger.error(f"Unhandled Exception: {str(e)}", exc_info=True)
        
        return jsonify({
            "error": str(e),
            "type": e.__class__.__name__
        }), code

    return app

