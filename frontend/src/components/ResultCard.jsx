import React from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function ResultCard({ result, originalPreview }) {
  if (!result) return null;

  const { language } = useLanguage();
  const isInvalid = result.disease === "Not_Pomegranate" || result.disease === "Unknown";

  const getDiseaseColor = (disease) => {
    if (disease === "Healthy") return "healthy";
    if (isInvalid) return "invalid";
    if (disease === "Bacterial_Blight") return "critical";
    return "warning";
  };

  const confidenceColor = result.confidence > 80 ? "high" : result.confidence > 60 ? "medium" : "low";

  // Use translations object to support real-time language changing
  const lang = language || "en";
  const diseaseName = result.translations?.[lang]?.name || result.diseaseName || result.disease?.replace(/_/g, " ");
  const cause = result.translations?.[lang]?.cause || result.cause;
  const prevention = result.translations?.[lang]?.prevention || result.prevention;
  const remedy = result.translations?.[lang]?.remedy || result.remedy;

  const warningMessages = {
    Not_Pomegranate: {
      en: "Wrong object detected! The uploaded image is not recognized as a pomegranate fruit. Please upload a clear image of a pomegranate fruit.",
      hi: "गलत वस्तु पाई गई! अपलोड की गई छवि अनार का फल नहीं है। कृपया अनार के फल की एक स्पष्ट छवि अपलोड करें।",
      mr: "चुकीचे फळ आढळले! अपलोड केलेले चित्र डाळिंबाचे नाही. कृपया डाळिंबाचे स्पष्ट चित्र अपलोड करा."
    },
    Unknown: {
      en: "No pomegranate or disease detected. Please upload a clear, well-lit image of a pomegranate fruit.",
      hi: "कोई अनार या बीमारी नहीं पाई गई। कृपया अनार के फल की एक स्पष्ट और अच्छी रोशनी वाली छवि अपलोड करें।",
      mr: "कोणतेही डाळिंब किंवा रोग आढळला नाही. कृपया डाळिंबाचे स्पष्ट आणि चांगल्या प्रकाशातील चित्र अपलोड करा."
    }
  };

  const warningMsg = isInvalid
    ? warningMessages[result.disease]?.[lang] || warningMessages[result.disease]?.["en"]
    : "";

  return (
    <div className={`result-card ${getDiseaseColor(result.disease)}`}>
      <div className="result-header">
        <h2 className="disease-name">{diseaseName}</h2>
        {!isInvalid && (
          <div className={`confidence ${confidenceColor}`}>
            <span className="confidence-value">{result.confidence}%</span>
            <span className="confidence-label">Confidence</span>
          </div>
        )}
      </div>

      {/* Side-by-Side Image Comparison Grid (Original vs. Annotated) */}
      {!isInvalid && (originalPreview || result.annotatedImage) && (
        <div className="comparison-section">
          <h3 className="visual-title">Visual Analysis Comparisons</h3>
          <div className="comparison-grid">
            {originalPreview && (
              <div className="comparison-box">
                <span className="comparison-label">Original Upload</span>
                <div className="comparison-image-container">
                  <img src={originalPreview} alt="Original uploaded pomegranate" className="comparison-image" />
                </div>
              </div>
            )}

            {result.annotatedImage && (
              <div className="comparison-box">
                <span className="comparison-label">AI Detections (Bounding Boxes)</span>
                <div className="comparison-image-container">
                  <img src={result.annotatedImage} alt="YOLO Annotated detection result" className="comparison-image" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Just show original preview or warning annotated image for wrong objects */}
      {isInvalid && (originalPreview || result.annotatedImage) && (
        <div className="result-image-wrapper">
          <h3 className="visual-title">Uploaded Image Preview</h3>
          <div className="result-image-container">
            <img 
              src={originalPreview || result.annotatedImage} 
              alt="Uploaded wrong object preview" 
              className="annotated-image" 
            />
          </div>
        </div>
      )}

      {isInvalid ? (
        <div className="invalid-object-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content" style={{ width: "100%" }}>
            <h3 style={{ margin: "0 0 8px 0", color: "#c0392b", fontSize: "1.2rem", fontWeight: "700" }}>
              {language === "hi" ? "त्रुटि: " : language === "mr" ? "त्रुटी: " : "Warning: "}
              {diseaseName}
            </h3>
            <p className="alert-text" style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "16px", color: "var(--text-primary)" }}>
              {warningMsg}
            </p>
            <div className="invalid-details" style={{
              marginTop: "16px",
              borderTop: "1px solid rgba(231, 76, 60, 0.2)",
              paddingTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
              <div>
                <strong style={{ color: "#c0392b", fontSize: "0.95rem" }}>🔍 {language === "hi" ? "कारण (Reason):" : language === "mr" ? "कारण (Reason):" : "Reason:"}</strong>
                <p style={{ margin: "4px 0 0 0", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>{cause}</p>
              </div>
              <div>
                <strong style={{ color: "#c0392b", fontSize: "0.95rem" }}>🛡️ {language === "hi" ? "सुझाव (Recommendation):" : language === "mr" ? "सुझाव (Recommendation):" : "Recommendation:"}</strong>
                <p style={{ margin: "4px 0 0 0", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>{prevention}</p>
              </div>
              {remedy && remedy !== "N/A" && (
                <div>
                  <strong style={{ color: "#c0392b", fontSize: "0.95rem" }}>💡 {language === "hi" ? "अगला कदम (Next Step):" : language === "mr" ? "पुढील पाऊल (Next Step):" : "Next Step:"}</strong>
                  <p style={{ margin: "4px 0 0 0", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>{remedy}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="result-sections">
          <div className="result-section cause-section">
            <div className="section-icon">🔍</div>
            <h3>Cause</h3>
            <p>{cause}</p>
          </div>

          <div className="result-section prevention-section">
            <div className="section-icon">🛡️</div>
            <h3>Prevention</h3>
            <p>{prevention}</p>
          </div>

          <div className="result-section remedy-section">
            <div className="section-icon">💊</div>
            <h3>Remedy</h3>
            <p>{remedy}</p>
          </div>
        </div>
      )}
    </div>
  );
}
