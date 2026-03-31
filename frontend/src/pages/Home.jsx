import { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import LanguageSelect from "../components/LanguageSelect";
import Footer from "../components/Footer";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="home">
      <header className="hero-section">
        <div className="hero-content">
          <img src="/src/assets/pomegranate.png" alt="Pomegranate" className="pomegranate-img" />
          <h1 className="hero-title">Pomegranate Health Analyzer</h1>
          <p className="hero-subtitle">
            AI-powered disease detection for pomegranate fruits
          </p>
        </div>
      </header>

      <div className="container">
        <LanguageSelect />
        <UploadForm onResult={setResult} />
        {result && <ResultCard result={result} />}
      </div>

      <Footer />
    </div>
  );
}
