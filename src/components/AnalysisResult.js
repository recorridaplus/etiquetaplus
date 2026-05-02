"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";

export default function AnalysisResult({ data }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="results-wrapper"
    >
      <section className="summary-section glass">
        <h1 className="product-title">{data.productName || "Producto Analizado"}</h1>
        <p className="product-summary">{data.summary}</p>
      </section>

      <div className="grid-results">
        <section className="highlights-section">
          <h2 className="section-title">Valores Clave</h2>
          <div className="highlights-grid">
            {data.highlights?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="highlight-card glass"
              >
                <div className={`status-dot ${item.level?.toLowerCase()}`}></div>
                <div className="highlight-info">
                  <span className="highlight-label">{item.label}</span>
                  <span className="highlight-value">{item.value}</span>
                  <p className="highlight-explanation">{item.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="ingredients-section">
          <h2 className="section-title">¿Qué contiene realmente?</h2>
          <div className="ingredients-list">
            {data.ingredients?.map((ing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="ingredient-item glass"
              >
                <div className="ingredient-header">
                  <span className="ingredient-name">{ing.name}</span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
                <p className="ingredient-translation">{ing.translation}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

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
          gap: 24px;
          padding-bottom: 40px;
        }
        .summary-section {
          padding: 32px 24px;
          text-align: center;
        }
        .product-title {
          font-size: var(--font-size-xl);
          margin-bottom: 12px;
          color: var(--accent-color);
        }
        .product-summary {
          font-size: var(--font-size-lg);
          font-weight: 500;
          line-height: 1.4;
        }
        .section-title {
          font-size: var(--font-size-lg);
          margin-bottom: 16px;
          padding-left: 8px;
          border-left: 4px solid var(--accent-color);
        }
        .highlights-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .highlight-card {
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }
        .status-dot.alto, .status-dot.high { background: var(--error); box-shadow: 0 0 10px var(--error); }
        .status-dot.medio, .status-dot.medium { background: var(--warning); }
        .status-dot.bajo, .status-dot.low { background: var(--success); }
        
        .highlight-label {
          display: block;
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          font-weight: 500;
        }
        .highlight-value {
          display: block;
          font-size: var(--font-size-lg);
          font-weight: 700;
          margin-bottom: 4px;
        }
        .highlight-explanation {
          font-size: var(--font-size-base);
          line-height: 1.4;
        }
        .ingredients-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ingredient-item {
          padding: 16px 20px;
        }
        .ingredient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .ingredient-name {
          font-weight: 700;
          font-size: var(--font-size-base);
        }
        .ingredient-translation {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          line-height: 1.3;
        }
        .verdict-section {
          padding: 24px;
          border-left: 4px solid var(--accent-color);
        }
        .verdict-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .verdict-title {
          font-size: var(--font-size-lg);
          margin: 0;
        }
        .verdict-text {
          font-size: var(--font-size-base);
          line-height: 1.5;
        }
        .text-accent { color: var(--accent-color); }
        .text-muted { color: var(--text-muted); }

        @media (min-width: 768px) {
          .grid-results {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 24px;
          }
        }
      `}</style>
    </motion.div>
  );
}
