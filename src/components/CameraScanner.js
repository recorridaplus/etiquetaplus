"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CameraScanner({ onCapture, isLoading }) {
  const [preview, setPreview] = useState(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="scanner-container">
      {/* Camera Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        ref={cameraInputRef}
        style={{ display: "none" }}
      />
      
      {/* Gallery Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={galleryInputRef}
        style={{ display: "none" }}
      />

      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="capture-card glass"
          >
            <div className="icon-wrapper" onClick={() => cameraInputRef.current?.click()} style={{ cursor: 'pointer' }}>
              <Camera size={48} className="icon-main" />
            </div>
            <h2 className="title-large">Escanea tu alimento</h2>
            <p className="text-secondary">
              Captura una foto clara de los ingredientes o la tabla nutricional.
            </p>
            <button className="btn-primary" onClick={() => cameraInputRef.current?.click()}>
              Empezar Escaneo
            </button>
            <button className="btn-secondary gallery-btn" onClick={() => galleryInputRef.current?.click()}>
              <Upload size={20} /> Elegir de la galería
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="preview-card glass"
          >
            <div className="image-preview-wrapper">
              <img src={preview} alt="Vista previa" className="image-preview" />
              {isLoading && (
                <div className="loading-overlay">
                  <Loader2 className="animate-spin" size={48} />
                  <p>Interpretando etiqueta...</p>
                </div>
              )}
            </div>
            
            {!isLoading && (
              <div className="preview-actions">
                <button className="btn-primary" onClick={() => cameraInputRef.current?.click()}>
                  Tomar otra foto
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scanner-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        .capture-card {
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .icon-wrapper {
          width: 100px;
          height: 100px;
          background: var(--accent-glow);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          animation: pulse-glow 2s infinite;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .icon-wrapper:active {
          transform: scale(0.95);
        }
        .icon-main {

          color: var(--accent-color);
        }
        .title-large {
          font-size: var(--font-size-xl);
          color: var(--text-primary);
        }
        .text-secondary {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .btn-primary {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: var(--border-radius-lg);
          font-size: var(--font-size-lg);
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: transform 0.2s, opacity 0.2s;
        }
        .btn-primary:active {
          transform: scale(0.98);
        }
        .btn-secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
          padding: 12px 24px;
          border-radius: var(--border-radius-lg);
          font-size: var(--font-size-base);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .preview-card {
          overflow: hidden;
          padding: 12px;
        }
        .image-preview-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
        }
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .loading-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: white;
          font-weight: 600;
        }
        .preview-actions {
          padding: 20px 8px 8px;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
