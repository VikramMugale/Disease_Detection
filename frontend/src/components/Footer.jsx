import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Accuracy Metrics */}
        <div className="footer-accuracy">
          <div className="accuracy-badge">
            <span className="badge-label">Model Accuracy</span>
            <span className="badge-value">99.5%</span>
            <span className="badge-unit">mAP</span>
          </div>
          <p className="accuracy-subtitle">Powered by YOLOv11 • Python • React • Flask</p>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Disclaimers */}
        <div className="footer-disclaimers">
          <p className="disclaimer-item disclaimer-main">
            The model achieves near-perfect accuracy but may show minor ambiguity in visually overlapping diseases, reflecting real-world agricultural uncertainty.
          </p>
          <p className="disclaimer-item disclaimer-warning">
            ⚠️ AI-assisted predictions only. Consult agricultural experts before applying treatments.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bar">
        <p>© 2026 Pomegranate Disease Detection</p>
      </div>
    </footer>
  );
}
