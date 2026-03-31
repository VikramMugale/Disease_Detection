import { useLanguage } from "../hooks/useLanguage";

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-select">
      <label htmlFor="language-select" className="language-label">🌐 Language</label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-dropdown"
      >
        <option value="en">🇬🇧 English</option>
        <option value="hi">🇮🇳 Hindi</option>
        <option value="mr">🇮🇳 Marathi</option>
      </select>
    </div>
  );
}
