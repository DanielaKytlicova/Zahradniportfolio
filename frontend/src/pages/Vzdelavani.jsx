import { Link } from "react-router-dom";
import { Leaf, BookOpen, Home as HomeIcon } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import RichText from "../components/RichText";
import Footer from "../components/Footer";

const icons = {
  leaf:  <Leaf size={28} strokeWidth={1.4} />,
  book:  <BookOpen size={28} strokeWidth={1.4} />,
  house: <HomeIcon size={28} strokeWidth={1.4} />,
};

export default function Vzdelavani() {
  const { t } = useLang();
  const { vzdelavani } = useContent();
  return (
    <div className="page active deti-page" data-testid="page-vzdelavani">
      <div className="deti-hero">
        <div
          className="deti-hero-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80')" }}
        />
        <div className="deti-hero-content">
          <span className="deti-badge">{t(vzdelavani.badge)}</span>
          <RichText as="h1" html={t(vzdelavani.title)} />
          <p>{t(vzdelavani.sub)}</p>
        </div>
      </div>

      <div className="deti-content">
        <div className="section-label">{t({ cz: "Pro školy & rodiny", en: "For schools & families" })}</div>
        <div className="deti-intro">
          <RichText as="h2" className="deti-intro-h2" html={t(vzdelavani.introTitle)} />
          <p>{t(vzdelavani.introText)}</p>
        </div>

        <div className="deti-programs">
          {vzdelavani.programs.map((p, i) => (
            <div className="deti-card" key={i} data-testid={`deti-card-${i}`}>
              <span className="deti-card-icon">{icons[p.icon]}</span>
              <h3>{t(p.title)}</h3>
              <p>{t(p.text)}</p>
              <span className="deti-card-tag">{t(p.tag)}</span>
            </div>
          ))}
        </div>

        <div className="deti-cta">
          <div>
            <h3>{t(vzdelavani.ctaTitle)}</h3>
            <p>{t(vzdelavani.ctaText)}</p>
          </div>
          <Link to="/kontakt" className="btn-cta" data-testid="vzdelavani-cta">
            <span>{t(vzdelavani.ctaBtn)}</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
