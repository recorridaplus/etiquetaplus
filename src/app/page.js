"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CameraScanner from "@/components/CameraScanner";
import AnalysisResult from "@/components/AnalysisResult";
import { Sparkles, History, Info, X, ChevronLeft, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { saveScan, getHistory, clearHistory } from "@/lib/storage";
import { compressImage } from "@/lib/image";

export default function Home() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    setHistoryItems(getHistory());
  }, [analysisData, showHistory]);

  const handleCapture = async (imageBase64) => {
    setIsLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const compressedImage = await compressImage(imageBase64);
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: compressedImage }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      saveScan(data);
      setAnalysisData(data);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#ffffff']
      });
    } catch (err) {
      setError(err.message || "Algo salió mal. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    setAnalysisData(null);
    setError(null);
    setShowHistory(false);
  };

  const loadFromHistory = (item) => {
    setAnalysisData(item);
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    if (confirm("¿Estás seguro de que quieres borrar todo el historial?")) {
      clearHistory();
      setHistoryItems([]);
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="logo-section" onClick={resetScanner} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <Sparkles size={24} fill="currentColor" />
          </div>
          <h1 className="logo-text">Etiqueta<span>+</span></h1>
        </div>
        <button 
          className={`btn-icon ${showHistory ? 'active' : ''}`} 
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? <X size={24} /> : <History size={24} />}
        </button>
      </header>

      <div className="content-scroll">
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="history-view"
            >
              <div className="history-header">
                <h2 className="title-large">Historial</h2>
                {historyItems.length > 0 && (
                  <button className="btn-text" onClick={handleClearHistory}>
                    <Trash2 size={18} /> Borrar todo
                  </button>
                )}
              </div>
              
              {historyItems.length === 0 ? (
                <div className="empty-history glass">
                  <p>Aún no has escaneado ningún producto.</p>
                </div>
              ) : (
                <div className="history-list">
                  {historyItems.map((item) => (
                    <button 
                      key={item.id} 
                      className="history-item glass" 
                      onClick={() => loadFromHistory(item)}
                    >
                      <div className="history-item-info">
                        <span className="history-item-name">{item.productName}</span>
                        <span className="history-item-date">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <ChevronLeft className="rotate-180" size={20} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ) : !analysisData && !error ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="scanner-wrapper"
            >
              <CameraScanner onCapture={handleCapture} isLoading={isLoading} />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="error-card glass"
            >
              <Info size={48} className="text-error" />
              <h2>¡Ups! Algo falló</h2>
              <p>{error}</p>
              <button className="btn-primary" onClick={resetScanner}>
                Reintentar
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="results-container"
            >
              <div className="sticky-actions">
                <button className="btn-secondary blur-bg" onClick={resetScanner}>
                  <ChevronLeft size={20} /> Nuevo Escaneo
                </button>
              </div>
              <AnalysisResult data={analysisData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 0 16px;
          max-width: 800px;
          margin: 0 auto;
        }
        .app-header {
          padding: 24px 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon {
          background: var(--accent-color);
          color: white;
          padding: 8px;
          border-radius: 12px;
          display: flex;
        }
        .logo-text {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .logo-text span {
          color: var(--accent-color);
        }
        .btn-icon {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 12px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-icon.active {
          background: var(--accent-color);
          color: white;
        }
        .content-scroll {
          flex: 1;
          padding-top: 10px;
        }
        .history-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          text-align: left;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          cursor: pointer;
          width: 100%;
        }
        .history-item-info {
          display: flex;
          flex-direction: column;
        }
        .history-item-name {
          font-size: var(--font-size-lg);
          font-weight: 700;
        }
        .history-item-date {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
        }
        .empty-history {
          padding: 40px;
          text-align: center;
          color: var(--text-secondary);
        }
        .rotate-180 { transform: rotate(180deg); }
        .error-card {
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .text-error { color: var(--error); }
        .sticky-actions {
          position: sticky;
          top: 0;
          z-index: 10;
          padding: 12px 0;
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
        }
        .blur-bg {
          backdrop-filter: blur(20px);
          background: rgba(5,5,5,0.8);
          border: 1px solid var(--glass-border);
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
        }
        .btn-secondary {
          color: var(--text-primary);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          padding: 12px 24px;
          border-radius: var(--border-radius-lg);
          font-size: var(--font-size-base);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-text {
          background: transparent;
          border: none;
          color: var(--error);
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
