import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { nav } = useContent();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Force "scrolled" appearance on non-home pages, since hero is not full-bleed dark
  const navClass = `site-nav ${scrolled || !isHome ? "scrolled" : ""}`;

  return (
    <>
      <nav id="mainNav" className={navClass} data-testid="main-nav">
        <Link to="/" className="nav-logo" data-testid="nav-logo-link">
          <img
            src="/logos/venku-light.png"
            alt="Venku"
            className="nav-logo-img-light"
          />
          <img
            src="/logos/venku-dark.png"
            alt="Venku"
            className="nav-logo-img-dark"
          />
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/portfolio"  data-testid="nav-portfolio">{t(nav.portfolio)}</NavLink></li>
          <li><NavLink to="/nabidka"    data-testid="nav-nabidka">{t(nav.nabidka)}</NavLink></li>
          <li><NavLink to="/o-atelieru" data-testid="nav-about">{t(nav.about)}</NavLink></li>
          <li><NavLink to="/vzdelavani" data-testid="nav-vzdelavani">{t(nav.vzdelavani)}</NavLink></li>
          <li><NavLink to="/kontakt"    data-testid="nav-kontakt">{t(nav.kontakt)}</NavLink></li>
        </ul>
        <div className="nav-right">
          <div className="lang-switcher" data-testid="lang-switcher">
            <button
              type="button"
              className={`lang-btn ${lang === "cz" ? "active" : ""}`}
              onClick={() => setLang("cz")}
              data-testid="lang-cz"
            >CZ</button>
            <span className="lang-divider">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              data-testid="lang-en"
            >EN</button>
          </div>
          <button
            type="button"
            className={`hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            data-testid="hamburger-btn"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`} data-testid="mobile-menu">
        <button type="button" className="close-btn" onClick={() => setOpen(false)} data-testid="mobile-menu-close">×</button>
        <NavLink to="/" onClick={() => setOpen(false)} data-testid="mobile-home">{lang === "cz" ? "Úvod" : "Home"}</NavLink>
        <NavLink to="/portfolio"  onClick={() => setOpen(false)}>{t(nav.portfolio)}</NavLink>
        <NavLink to="/nabidka"    onClick={() => setOpen(false)}>{t(nav.nabidka)}</NavLink>
        <NavLink to="/o-atelieru" onClick={() => setOpen(false)}>{t(nav.about)}</NavLink>
        <NavLink to="/vzdelavani" onClick={() => setOpen(false)}>{t(nav.vzdelavani)}</NavLink>
        <NavLink to="/kontakt"    onClick={() => setOpen(false)}>{t(nav.kontakt)}</NavLink>
      </div>
    </>
  );
}
