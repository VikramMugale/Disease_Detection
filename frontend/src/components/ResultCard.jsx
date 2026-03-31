export default function ResultCard({ result }) {
  if (!result) return null;

  const getDiseaseColor = (disease) => {
    if (disease === "Healthy") return "healthy";
    if (disease === "Bacterial_Blight") return "critical";
    return "warning";
  };

  const confidenceColor = result.confidence > 80 ? "high" : result.confidence > 60 ? "medium" : "low";

  // Use disease name from response if available, otherwise fallback to default
  const diseaseName = result.diseaseName || result.disease?.replace(/_/g, " ");

  return (
    <div className={`result-card ${getDiseaseColor(result.disease)}`}>
      <div className="result-header">
        <h2 className="disease-name">{diseaseName}</h2>
        <div className={`confidence ${confidenceColor}`}>
          <span className="confidence-value">{result.confidence}%</span>
          <span className="confidence-label">Confidence</span>
        </div>
      </div>

      <div className="result-sections">
        <div className="result-section cause-section">
          <div className="section-icon">🔍</div>
          <h3>Cause</h3>
          <p>{result.cause}</p>
        </div>

        <div className="result-section prevention-section">
          <div className="section-icon">🛡️</div>
          <h3>Prevention</h3>
          <p>{result.prevention}</p>
        </div>

        <div className="result-section remedy-section">
          <div className="section-icon">💊</div>
          <h3>Remedy</h3>
          <p>{result.remedy}</p>
        </div>
      </div>
    </div>
  );
}
