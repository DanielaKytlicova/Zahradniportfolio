import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";

export default function Footer() {
  const { t, lang } = useLang();
  const { nav } = useContent();
  return (
    <footer data-testid="site-footer">
      <div className="footer-brand">
        <img
          src="/logos/venku-light.png"
          alt="Venku"
          className="footer-logo-img"
        />
      </div>
      <nav className="footer-nav">
        <Link to="/">{lang === "cz" ? "Úvod" : "Home"}</Link>
        <Link to="/portfolio">{t(nav.portfolio)}</Link>
        <Link to="/nabidka">{t(nav.nabidka)}</Link>
        <Link to="/o-atelieru">{t(nav.about)}</Link>
        <Link to="/vzdelavani">{t(nav.vzdelavani)}</Link>
        <Link to="/kontakt">{t(nav.kontakt)}</Link>
      </nav>
      <div className="footer-copy">
        © {new Date().getFullYear()} Atelier Venku<br />
        Praha, Česká republika
      </div>
    </footer>
  );
}
