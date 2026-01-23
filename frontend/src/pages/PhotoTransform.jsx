import React, { useState } from "react";
import axios from "axios";

export default function PhotoTransform() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ===============================
  // Handle file select (camera/gallery)
  // ===============================
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ===============================
  // Mock transformation (demo mode)
  // ===============================
  const handleTransform = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    try {
      setLoading(true);

      // simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // mock result (same image)
      setResult(preview);

      alert("✅ Demo transformation completed!");
    } catch (err) {
      alert("Error transforming image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📸 Transform Your Future Self</h2>

      {/* Camera / File Upload */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={styles.input}
      />

      {/* Preview */}
      {preview && (
        <div style={styles.previewBox}>
          <p>Original Image</p>
          <img src={preview} alt="preview" style={styles.image} />
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleTransform}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Transforming..." : "Transform Photo"}
      </button>

      {/* Result */}
      {result && (
        <div style={styles.previewBox}>
          <p>✨ Transformed Result (Demo)</p>
          <img src={result} alt="result" style={styles.image} />
        </div>
      )}
    </div>
  );
}


// ===============================
// Simple clean styles
// ===============================

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
  },

  title: {
    marginBottom: "20px",
  },

  input: {
    marginBottom: "20px",
  },

  previewBox: {
    marginTop: "20px",
  },

  image: {
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  button: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "15px",
  },
};
