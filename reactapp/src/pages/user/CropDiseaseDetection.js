
import React, { useState } from "react";
import UserNavbar from "../../inc/UserNavbar";
import "./cropdetection.css";

function CropDiseaseDetection() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageSelected, setImageSelected] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult(null);
    setLoading(true);
    setSelectedFileName(file.name);
    setImageSelected(true);

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
      <div className="crop-wrapper">
        <h2 className="crop-title">🌿🔍 Crop Disease Detection</h2>
        <p className="crop-subtitle">
          Upload a clear image of your crop leaf. Our AI model will identify if the plant is healthy or diseased.
        </p>

        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-label">
            {imageSelected ? "📸 Image Selected" : "📁 Select Image"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {selectedFileName && (
            <span className="file-name">({selectedFileName})</span>
          )}
        </div>
        <div className="finalresult">
        {preview && (
          <div>
            <p className="font-medium">Image Preview:</p>
            <img src={preview} alt="Preview" className="image-preview" />
          </div>
        )}

        {loading && <p className="loading-text">🔍 Analyzing image...</p>}

        {result && (
          <div className="result-box">
            {result.error ? (
              <p className="result-error">{result.error}</p>
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
    </div>
  );
}

export default CropDiseaseDetection;
