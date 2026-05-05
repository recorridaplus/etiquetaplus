"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad | Etiqueta+",
  description: "Política de privacidad de la aplicación Etiqueta+.",
};

export default function PrivacyPolicy() {
  return (
    <main className="app-container">
      <header className="app-header">
        <Link href="/" className="logo-section" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/icon.png" alt="Etiqueta+ Logo" className="app-logo-img" />
          <h1 className="logo-text">Etiqueta<span>+</span></h1>
        </Link>
        <Link href="/" className="btn-secondary">
          <ArrowLeft size={20} /> Volver
        </Link>
      </header>

      <div className="content-scroll animate-fade-in">
        <div className="policy-card glass">
          <h2 className="title-xl">Política de Privacidad</h2>
          <p className="last-update">Última actualización: mayo 2026</p>
          
          <section>
            <h3>1. Información General</h3>
            <p>
              Etiqueta+ ("la Aplicación") es una herramienta diseñada para ayudar a los usuarios a entender la información nutricional de los alimentos mediante el escaneo de etiquetas con Inteligencia Artificial. Tu privacidad es fundamental para nosotros.
            </p>
          </section>

          <section>
            <h3>2. Uso de la Cámara</h3>
            <p>
              La Aplicación requiere acceso a la cámara de tu dispositivo para capturar imágenes de las etiquetas de los productos. Este acceso es estrictamente necesario para el funcionamiento del escáner. Las imágenes se procesan únicamente cuando el usuario presiona el botón de captura.
            </p>
          </section>

          <section>
            <h3>3. Procesamiento de Datos e IA</h3>
            <p>
              Las imágenes capturadas se envían a través de una conexión segura a un servicio de procesamiento de lenguaje natural e imágenes (IA) para extraer y analizar la información nutricional. Estas imágenes se utilizan exclusivamente para el análisis del producto y no para identificar personas ni recopilar datos biométricos.
            </p>
          </section>

          <section>
            <h3>4. Almacenamiento de Datos</h3>
            <p>
              Etiqueta+ prioriza el almacenamiento local. El historial de tus escaneos se guarda directamente en tu dispositivo. No almacenamos tu historial de escaneos en servidores externos ni lo asociamos con una cuenta de usuario personal, a menos que se indique explícitamente lo contrario en futuras actualizaciones.
            </p>
          </section>

          <section>
            <h3>5. Cookies y Tecnologías Similares</h3>
            <p>
              Como Aplicación Web Progresiva (PWA), utilizamos tecnologías de almacenamiento local para que la app funcione correctamente y para recordar tus preferencias de configuración.
            </p>
          </section>

          <section>
            <h3>6. Cambios en esta Política</h3>
            <p>
              Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te recomendamos revisar esta página periódicamente para ver cualquier cambio.
            </p>
          </section>

          <section>
            <h3>7. Contacto</h3>
            <p>
              Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a través de los canales oficiales de Concreta.
            </p>
          </section>
        </div>
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
        .app-logo-img {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          object-fit: cover;
        }
        .logo-text {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }
        .logo-text span {
          color: var(--accent-color);
        }
        .btn-secondary {
          color: var(--text-primary);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          padding: 10px 20px;
          border-radius: var(--border-radius-lg);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .content-scroll {
          flex: 1;
          padding: 20px 0 40px 0;
        }
        .policy-card {
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .title-xl {
          font-size: var(--font-size-xl);
          margin-bottom: 4px;
        }
        .last-update {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 20px;
        }
        section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        h3 {
          font-size: 20px;
          color: var(--accent-color);
        }
        p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        @media (max-width: 600px) {
          .policy-card {
            padding: 24px 20px;
          }
          .title-xl {
            font-size: 24px;
          }
        }
      `}</style>
    </main>
  );
}
