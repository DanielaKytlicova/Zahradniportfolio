import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import RichText from "../components/RichText";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function OAtelieru() {
  const { t } = useLang();
  const { about } = useContent();
  return (
    <div className="page active about-page" data-testid="page-about">
      <SEO
        title={{ cz: "O ateliéru", en: "About the studio" }}
        description={about.body1}
        path="/o-atelieru"
        image={about.hero}
      />
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url('${about.hero}')` }} />
        <div className="page-hero-content">
          <span className="page-hero-label">{t(about.eyebrow)}</span>
          <h1 className="page-hero-title">{t(about.title)}</h1>
        </div>
      </div>

      <div className="about-content">
        <div className="about-portrait">
          <div className="about-img" style={{ backgroundImage: `url('${about.portrait}')` }} />
          <div className="about-img-caption">{t(about.caption)}</div>
        </div>
        <div className="about-text">
          <RichText as="h2" html={t(about.h2)} />
          <p className="highlight">{t(about.highlight)}</p>
          <p>{t(about.body1)}</p>
          <p>{t(about.body2)}</p>
          <div className="philosophy">
            <div className="philosophy-label">{t(about.philosophyLabel)}</div>
            <RichText as="h3" html={t(about.philosophyTitle)} />
            <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 2, color: "var(--gray)" }}>
              {t(about.philosophyText)}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
