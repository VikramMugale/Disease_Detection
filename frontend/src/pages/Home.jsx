import { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import LanguageSelect from "../components/LanguageSelect";
import Footer from "../components/Footer";

// Import pomegranate image so Vite bundles it for production
import pomegranateImg from "../assets/pomegranate.png";

export default function Home() {
  const [result, setResult] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);

  const handleResult = (res, originalImg) => {
    setResult(res);
    setOriginalPreview(originalImg);
  };

  return (
    <div className="home">
      <header className="hero-section">
        <div className="hero-content">
          <img src={pomegranateImg} alt="Pomegranate" className="pomegranate-img" />
          <h1 className="hero-title">Pomegranate Health Analyzer</h1>
          <p className="hero-subtitle">
            AI-powered disease detection for pomegranate fruits
          </p>
        </div>
      </header>

      <div className="container">
        <div className="toolbar-section" style={{ justifyContent: "flex-end" }}>
          <LanguageSelect />
        </div>

        <UploadForm onResult={handleResult} />
        {result && <ResultCard result={result} originalPreview={originalPreview} />}
      </div>

      <Footer />
    </div>
  );
}
