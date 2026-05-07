import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import Footer from "../components/Footer";

export default function Portfolio() {
  const { t, lang } = useLang();
  const { projects } = useContent();
  const [activeId, setActiveId] = useState(null);
  const active = projects.find((p) => p.id === activeId);

  useEffect(() => {
    if (activeId) {
      const el = document.getElementById("portfolio-detail");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeId]);

  return (
    <div className="page active" data-testid="page-portfolio">
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1600&q=80')" }}
        />
        <div className="page-hero-content">
          <span className="page-hero-label">{lang === "cz" ? "Naše práce" : "Our work"}</span>
          <h1 className="page-hero-title">Portfolio</h1>
        </div>
      </div>

      <div className="portfolio-grid">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`portfolio-item ${i === 3 ? "wide" : ""}`}
            onClick={() => setActiveId(p.id)}
            data-testid={`portfolio-item-${p.id}`}
          >
            <div
              className="portfolio-img"
              style={{ backgroundImage: `url('${p.cover}')` }}
            />
            <div className="portfolio-overlay">
              <div className="portfolio-info">
                <h3>{t(p.title)}</h3>
                <p>{t(p.location)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="portfolio-detail active" id="portfolio-detail" data-testid="portfolio-detail">
          <div className="portfolio-detail-header">
            <h2 className="portfolio-detail-title" data-testid="portfolio-detail-title">{t(active.title)}</h2>
            <p className="portfolio-detail-text">{t(active.text)}</p>
          </div>
          <div className="portfolio-gallery">
            {active.gallery.map((src, idx) => (
              <div key={idx} style={{ backgroundImage: `url('${src}')` }} />
            ))}
          </div>
          <button
            type="button"
            className="close-detail"
            onClick={() => setActiveId(null)}
            data-testid="portfolio-detail-close"
          >
            {lang === "cz" ? "Zavřít detail" : "Close detail"}
          </button>
        </div>
      )}

      <div className="portfolio-cta">
        <p>
          {lang === "cz"
            ? "Každý projekt je jiný. Každý rozhovor je začátek."
            : "Every project is different. Every conversation is a beginning."}
        </p>
        <Link to="/kontakt" className="btn-primary" style={{ color: "var(--green)", borderColor: "rgba(23,52,44,0.4)" }}>
          <span>{lang === "cz" ? "Domluvme si konzultaci" : "Book a consultation"}</span>
          <span className="arrow">→</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
