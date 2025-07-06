import { useState } from "react";
import UserNavbar from "../inc/UserNavbar";

function CropDiseaseDetection() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Prediction failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-700">🩺 Crop Disease Detection</h2>
        <p className="mt-2 text-gray-800">Upload a clear image of your crop leaf to detect diseases.</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-4 mb-2"
        />

        {preview && (
          <div className="mt-4">
            <p className="font-medium">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-60 h-auto border border-green-600 rounded shadow-md"
            />
          </div>
        )}

        {loading && <p className="mt-4 text-blue-600">🔍 Analyzing image...</p>}

        {result && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 rounded">
            {result.error ? (
              <p className="text-red-600 font-semibold">{result.error}</p>
            ) : (
              <>
                <p><strong>🌿 Disease:</strong> {result.disease}</p>
                <p><strong>📈 Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropDiseaseDetection;
