import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import RichText from "../components/RichText";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { asset } from "../utils/asset";

export default function Home() {
  const { t } = useLang();
  const { home, HERO_BG } = useContent();
  return (
    <div className="page page-home active" data-testid="page-home">
      <SEO
        title={{ cz: "Zahrady, které dýchají", en: "Gardens that breathe" }}
        description={home.sub}
        path="/"
        image={HERO_BG}
      />
      <section className="hero" style={{ padding: 0 }}>
        <div className="hero-bg" style={{ backgroundImage: `url('${asset(HERO_BG)}')` }} />
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="hero-eyebrow">{t(home.eyebrow)}</p>
          <RichText as="h1" className="hero-headline" html={t(home.headline)} />
          <p className="hero-sub">{t(home.sub)}</p>
          <Link to="/portfolio" className="btn-primary" data-testid="hero-cta-portfolio">
            <span>{t(home.cta)}</span>
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>scroll</span>
        </div>
      </section>
      <Footer />
    </div>
  );
}
