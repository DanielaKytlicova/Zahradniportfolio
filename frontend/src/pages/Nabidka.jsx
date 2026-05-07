import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import RichText from "../components/RichText";
import Footer from "../components/Footer";

export default function Nabidka() {
  const { t } = useLang();
  const { services, processList } = useContent();
  return (
    <div className="page active services-page" data-testid="page-nabidka">
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1600&q=80')" }}
        />
        <div className="page-hero-content">
          <span className="page-hero-label">{t(services.pageEyebrow)}</span>
          <h1 className="page-hero-title">{t(services.pageTitle)}</h1>
        </div>
      </div>

      <div className="services-page-content">
        <div className="services-intro">
          <RichText as="h2" html={t(services.introTitle)} />
          <p>{t(services.introText)}</p>
        </div>

        <div className="process-list">
          {processList.map((step) => (
            <div className="process-item" key={step.num} data-testid={`process-item-${step.num}`}>
              <div
                className="process-img"
                style={{ backgroundImage: `url('${step.img}')` }}
              />
              <div className="process-num">{step.num}</div>
              <div className="process-content">
                <div className="process-sub">{t(step.sub)}</div>
                <div className="process-title">{t(step.title)}</div>
                <div className="process-desc">{t(step.desc)}</div>
              </div>
              <div className="process-detail">{t(step.detail)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-band">
        <RichText as="h2" className="cta-band-text" html={t(services.ctaTitle)} />
        <Link to="/kontakt" className="btn-cta" data-testid="services-cta">
          <span>{t(services.ctaBtn)}</span>
          <span>→</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
