const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function predictDisease(file, language = "en") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Prediction failed");
  }

  return response.json();
}
