"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle2, Leaf, FlaskConical, Candy, Wheat, AlertCircle, Beef, Waves } from "lucide-react";

export default function AnalysisResult({ data }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="results-wrapper"
    >
      <section className="hero-card glass">
        <div className="hero-header">
          <h1 className="product-title">{data.productName || "Producto Analizado"}</h1>
          <p className="product-summary">{data.summary}</p>
        </div>

        {data.badges && data.badges.length > 0 && (
          <div className="badges-wrapper">
            {data.badges.map((badge, idx) => {
              const Icon = {
                sugar: Candy,
                gluten: Wheat,
                allergens: AlertCircle,
                animal: Beef,
                sodium: Waves
              }[badge.id] || Info;

              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`octagon-badge ${badge.type}`}
                >
                  <Icon size={20} className="badge-icon" />
                  <span className="badge-label">{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="key-highlights-grid">
          {data.highlights?.map((item, index) => (
            <div key={index} className="key-highlight-item">
              <div className={`status-pill ${item.level?.toLowerCase()}`}>
                <span className="pill-label">{item.label}</span>
                <span className="pill-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ingredients-section">
        <div className="section-header-flex">
          <h2 className="section-title">Análisis de Ingredientes</h2>
          <div className="ingredient-counters">
            <div className="counter-badge natural">
              <Leaf size={14} /> <span>{data.ingredients?.filter(i => i.type === 'natural').length}</span>
            </div>
            <div className="counter-badge synthetic">
              <FlaskConical size={14} /> <span>{data.ingredients?.filter(i => i.type === 'synthetic').length}</span>
            </div>
          </div>
        </div>
        
        <div className="ingredients-list">
          {data.ingredients?.map((ing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`ingredient-item glass ${ing.type}`}
            >
              <div className="ingredient-header">
                <div className="ingredient-name-wrapper">
                  {ing.type === 'natural' ? (
                    <Leaf size={18} className="text-success" />
                  ) : (
                    <FlaskConical size={18} className="text-warning" />
                  )}
                  <span className="ingredient-name">{ing.name}</span>
                </div>
              </div>
              <p className="ingredient-translation">{ing.translation}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="verdict-section glass animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="verdict-header">
          <Info size={24} className="text-accent" />
          <h2 className="verdict-title">Conclusión</h2>
        </div>
        <p className="verdict-text">{data.verdict}</p>
      </section>

      <style jsx>{`
        .results-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-bottom: 80px;
        }
        .hero-card {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .hero-header {
          text-align: center;
        }
        .product-title {
          font-size: var(--font-size-xl);
          margin-bottom: 12px;
          color: var(--accent-color);
          letter-spacing: -1px;
        }
        .product-summary {
          font-size: var(--font-size-lg);
          font-weight: 500;
          line-height: 1.5;
          opacity: 0.9;
          max-width: 500px;
          margin: 0 auto;
        }
        .badges-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .octagon-badge {
          background: #000;
          color: #fff;
          padding: 12px;
          font-weight: 900;
          font-size: 10px;
          text-transform: uppercase;
          border: 2px solid #fff;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          min-width: 90px;
          aspect-ratio: 1/1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 1;
          gap: 4px;
        }
        .badge-icon {
          color: var(--accent-color);
        }
        
        .key-highlights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 8px;
        }
        .status-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .status-pill.alto, .status-pill.high { 
          border-left: 8px solid var(--error);
          background: rgba(239, 68, 68, 0.05);
        }
        .status-pill.medio, .status-pill.medium { 
          border-left: 8px solid var(--warning);
          background: rgba(245, 158, 11, 0.05);
        }
        .status-pill.bajo, .status-pill.low { 
          border-left: 8px solid var(--success);
          background: rgba(16, 185, 129, 0.05);
        }
        .pill-label {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 14px;
          opacity: 0.7;
        }
        .pill-value {
          font-weight: 800;
          font-size: var(--font-size-lg);
        }

        .section-title {
          font-size: var(--font-size-lg);
          margin-bottom: 24px;
          padding-left: 12px;
          border-left: 4px solid var(--accent-color);
          font-weight: 800;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .key-highlights-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </motion.div>
  );
}
