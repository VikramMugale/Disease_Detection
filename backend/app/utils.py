import os
import uuid


def generate_unique_filename(filename):
    """
    Prevent filename collisions
    """
    ext = filename.rsplit(".", 1)[-1]
    return f"{uuid.uuid4().hex}.{ext}"


def safe_delete(filepath):
    """
    Delete file safely if exists
    """
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
    except Exception:
        pass
