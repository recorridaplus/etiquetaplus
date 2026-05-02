"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle2, Leaf, FlaskConical, Candy, Wheat, AlertCircle, Beef, Waves, Droplets } from "lucide-react";

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

        <div className="unified-results-grid">
          {/* Highlights (Sodium, Sugar, Fats) */}
          {data.highlights?.map((item, index) => (
            <motion.div
              key={`high-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`status-card ${item.level?.toLowerCase()}`}
            >
              <div className="card-header">
                <span className="card-label">{item.label}</span>
                {item.id === 'sugar' && <Candy size={18} />}
                {item.id === 'sodium' && <Waves size={18} />}
                {item.label?.toLowerCase().includes('grasa') && <Droplets size={18} />}
              </div>
              <div className="card-body">
                <span className="card-value">{item.value}</span>
              </div>
            </motion.div>
          ))}

          {/* Badges (Gluten, Animal, Allergens) */}
          {data.badges?.map((badge, index) => {
            const config = {
              gluten: { label: 'GLUTEN', icon: Wheat },
              allergens: { label: 'ALÉRGENOS', icon: AlertCircle },
              animal: { label: 'DIETA', icon: Beef }
            }[badge.id] || { label: 'INFO', icon: Info };

            return (
              <motion.div
                key={`badge-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (0.1 * index) }}
                className={`status-card info badge-style`}
              >
                <div className="card-header">
                  <span className="card-label">{config.label}</span>
                  <config.icon size={18} />
                </div>
                <div className="card-body">
                  <span className="card-value">{badge.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="ingredients-section">
        <div className="section-header-flex">
          <h2 className="section-title">Análisis de Ingredientes</h2>
          <div className="ingredient-counters">
            <div className="counter-badge natural">
              <Leaf size={14} /> 
              <span className="counter-label">Naturales:</span>
              <span className="counter-value">{data.ingredients?.filter(i => i.type === 'natural').length}</span>
            </div>
            <div className="counter-badge synthetic">
              <FlaskConical size={14} /> 
              <span className="counter-label">Sintéticos:</span>
              <span className="counter-value">{data.ingredients?.filter(i => i.type === 'synthetic').length}</span>
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
        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ingredient-counters {
          display: flex;
          gap: 8px;
        }
        .counter-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
        }
        .counter-label {
          opacity: 0.8;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
        }
        .counter-value {
          font-size: 14px;
        }
        .counter-badge.natural {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .counter-badge.synthetic {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .unified-results-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
        }
        .status-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .status-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background: var(--text-secondary);
          opacity: 0.5;
        }
        .status-card.alto, .status-card.high { 
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.2);
        }
        .status-card.alto::before, .status-card.high::before { background: var(--error); opacity: 1; }

        .status-card.info {
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.2);
        }
        .status-card.info::before { background: var(--accent-color); opacity: 1; }

        .status-card.medio, .status-card.medium { 
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.2);
        }
        .status-card.medio::before, .status-card.medium::before { background: var(--warning); opacity: 1; }

        .status-card.bajo, .status-card.low { 
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
        }
        .status-card.bajo::before, .status-card.low::before { background: var(--success); opacity: 1; }

        .badge-style {
          background: rgba(0, 0, 0, 0.3);
          border-style: dashed;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-secondary);
        }
        .card-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .card-value {
          font-size: var(--font-size-lg);
          font-weight: 800;
          color: var(--text-primary);
        }

        .section-title {
          font-size: var(--font-size-lg);
          margin-bottom: 24px;
          padding-left: 12px;
          border-left: 4px solid var(--accent-color);
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .ingredients-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ingredient-item {
          padding: 24px;
          border-radius: var(--border-radius-lg);
        }
        .ingredient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .ingredient-name-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ingredient-name {
          font-weight: 800;
          font-size: var(--font-size-lg);
          color: var(--text-primary);
        }
        .ingredient-translation {
          font-size: var(--font-size-base);
          color: var(--text-primary);
          line-height: 1.5;
          opacity: 0.9;
        }

        .verdict-section {
          padding: 40px 32px;
          border: 1px solid var(--glass-border);
          border-left: 8px solid var(--accent-color);
          margin-top: 60px;
          position: relative;
          z-index: 1;
        }
        .verdict-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .verdict-title {
          font-size: var(--font-size-xl);
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.5px;
        }
        .verdict-text {
          font-size: var(--font-size-lg);
          line-height: 1.7;
          color: var(--text-primary);
        }
        .text-accent { color: var(--accent-color); }
        .text-muted { color: var(--text-muted); }
        .text-success { color: var(--success); }
        .text-warning { color: var(--warning); }

        @media (min-width: 768px) {
          .key-highlights-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </motion.div>
  );
}
