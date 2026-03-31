import { useState } from "react";
import { predictDisease } from "../services/api";
import { useLanguage } from "../hooks/useLanguage";

export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await predictDisease(file, language);
      onResult(result);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-container">
        <div className="upload-box">
          <label htmlFor="file-input" className="file-label">
            <div className="upload-icon">📸</div>
            <p className="upload-text">
              {preview ? "Image Selected ✓" : "Click or drag to upload image"}
            </p>
            <p className="upload-hint">PNG, JPG, JPEG (Max 10MB)</p>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            disabled={loading}
          />
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="button-group">
        <button
          type="submit"
          disabled={loading || !file}
          className="btn-analyze"
        >
          {loading ? (
            <>
              <span className="spinner-small"></span>
              Analyzing...
            </>
          ) : (
            "Analyze Image"
          )}
        </button>
        {file && (
          <button type="button" onClick={handleClear} className="btn-clear">
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
