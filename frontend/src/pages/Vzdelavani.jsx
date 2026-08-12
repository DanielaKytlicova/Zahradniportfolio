import { useState } from "react";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import RichText from "../components/RichText";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import ProgramCard from "../components/edu/ProgramCard";
import CtaButton from "../components/edu/CtaButton";
import { asset } from "../utils/asset";
import { publishedCategories, liveProgramsInCategory } from "../utils/edu";
import "./Edu.css";

export default function Vzdelavani() {
  const { t } = useLang();
  const { edu } = useContent();
  const [tab, setTab] = useState("edu"); // edu | materials | workshops

  const cats = publishedCategories(edu);
  const hero = edu?.hero || {};
  const intro = edu?.intro || {};
  const where = edu?.where || {};
  const offer = edu?.offer || {};
  const collab = edu?.collaboration || {};

  const heroBg = asset(hero.bgImage);
  const hasWhere = t(where.atSchool?.text) || t(where.outdoors?.text);

  const catBySlug = (slug) => cats.find((c) => c.slug === slug);
  const progsIn = (slug) => {
    const c = catBySlug(slug);
    return c ? { cat: c, programs: liveProgramsInCategory(edu, c.id, { featuredOnly: true }) } : null;
  };

  const eduCats = cats.filter((c) => c.slug === "edukacni-programy");
  const school = progsIn("skoly-v-prirode");
  const workshops = progsIn("workshopy");
  const materials = (edu?.materials || []).filter((m) => m.published !== false);

  const renderGrid = (cat, programs) => (
    <div className="edu-cat" key={cat.id} data-testid={`edu-cat-${cat.slug}`}>
      <div className="edu-cat-head">
        <h3 className="edu-cat-title">{t(cat.name)}</h3>
        {t(cat.description) && <p className="edu-cat-desc">{t(cat.description)}</p>}
      </div>
      <div className="edu-grid">
        {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
      </div>
    </div>
  );

  const renderSchool = (cat, programs) => (
    <div className="edu-cat" key={cat.id} data-testid={`edu-cat-${cat.slug}`}>
      <div className="edu-cat-head">
        <h3 className="edu-cat-title">{t(cat.name)}</h3>
        {t(cat.description) && <p className="edu-cat-desc">{t(cat.description)}</p>}
      </div>
      <div className="edu-features">
        {programs.map((p) => {
          const img = asset(p.mainImage);
          return (
            <article className="edu-feature" key={p.id} data-testid={`edu-feature-${p.slug}`}>
              {img && <div className="edu-feature-media" style={{ backgroundImage: `url('${img}')` }} role="img" aria-label={t(p.title)} />}
              <div className="edu-feature-body">
                <h4 className="edu-feature-title">{t(p.title)}</h4>
                {t(p.perex) && <p className="edu-feature-text">{t(p.perex)}</p>}
                <div className="edu-feature-meta">
                  {t(p.location) && <span>{t(p.location)}</span>}
                  {t(p.duration) && <span>{t(p.duration)}</span>}
                </div>
                <CtaButton cta={{ label: { cz: "Více info", en: "More info" }, type: "internal", value: `/vzdelavani/${p.slug}` }} className="edu-btn" testid={`edu-feature-cta-${p.slug}`} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );

  const TABS = [
    { key: "edu", label: { cz: "Edukační programy", en: "Educational programmes" } },
    { key: "materials", label: { cz: "Materiály ke stažení", en: "Downloads" } },
    { key: "workshops", label: { cz: "Workshopy", en: "Workshops" } },
  ];

  return (
    <div className="page active edu-page" data-testid="page-vzdelavani">
      <SEO title={{ cz: "Vzdělávání venku a hravě", en: "Outdoor education, playfully" }} description={hero.sub} path="/vzdelavani" image={hero.bgImage} />

      {/* HERO */}
      <header className="edu-hero" data-testid="edu-hero">
        {heroBg && <div className="edu-hero-bg" style={{ backgroundImage: `url('${heroBg}')` }} />}
        <div className="edu-hero-overlay" />
        <div className="edu-hero-content">
          {t(hero.badge) && <span className="edu-badge">{t(hero.badge)}</span>}
          <RichText as="h1" className="edu-hero-title" html={t(hero.title)} />
          {t(hero.sub) && <p className="edu-hero-sub">{t(hero.sub)}</p>}
        </div>
      </header>

      {/* TAB SWITCHER */}
      <div className="edu-section edu-tabs-wrap" id="nabidka-programu">
        <div className="edu-tabs" role="tablist" aria-label="Nabídka vzdělávání" data-testid="edu-tabs">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              type="button"
              role="tab"
              aria-selected={tab === tb.key}
              className={`edu-tab ${tab === tb.key ? "active" : ""}`}
              onClick={() => setTab(tb.key)}
              data-testid={`edu-tab-${tb.key}`}
            >
              {t(tb.label)}
            </button>
          ))}
        </div>
      </div>

      {/* TAB: EDUKAČNÍ PROGRAMY */}
      {tab === "edu" && (
        <div data-testid="edu-tabpanel-edu">
          {(t(intro.title) || t(intro.text)) && (
            <section className="edu-section edu-intro" data-testid="edu-intro">
              {t(intro.label) && <div className="edu-label">{t(intro.label)}</div>}
              {t(intro.title) && <RichText as="h2" className="edu-h2" html={t(intro.title)} />}
              {t(intro.text) && <p className="edu-lead">{t(intro.text)}</p>}
            </section>
          )}

          {hasWhere && (
            <section className="edu-section edu-where" data-testid="edu-where">
              {t(where.label) && <div className="edu-label">{t(where.label)}</div>}
              {t(where.title) && <h2 className="edu-h2">{t(where.title)}</h2>}
              {t(where.intro) && <p className="edu-lead">{t(where.intro)}</p>}
              <div className="edu-where-grid">
                {[where.atSchool, where.outdoors].filter(Boolean).map((w, i) => {
                  if (!t(w.title) && !t(w.text)) return null;
                  const img = asset(w.image);
                  return (
                    <article className="edu-where-card" key={i} data-testid={`edu-where-card-${i}`}>
                      {img && <div className="edu-where-img" style={{ backgroundImage: `url('${img}')` }} role="img" aria-label={t(w.title)} />}
                      <div className="edu-where-body">
                        {t(w.title) && <h3>{t(w.title)}</h3>}
                        {t(w.text) && <p>{t(w.text)}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <section className="edu-section edu-offer" data-testid="edu-offer">
            {t(offer.label) && <div className="edu-label">{t(offer.label)}</div>}
            {t(offer.title) && <h2 className="edu-h2">{t(offer.title)}</h2>}
            {t(offer.text) && <p className="edu-lead">{t(offer.text)}</p>}
            {eduCats.map((c) => {
              const programs = liveProgramsInCategory(edu, c.id, { featuredOnly: true });
              return programs.length ? renderGrid(c, programs) : null;
            })}
            {school && school.programs.length > 0 && renderSchool(school.cat, school.programs)}
          </section>
        </div>
      )}

      {/* TAB: MATERIÁLY KE STAŽENÍ */}
      {tab === "materials" && (
        <section className="edu-section edu-materials" data-testid="edu-tabpanel-materials">
          <div className="edu-label">{t({ cz: "Ke stažení", en: "Downloads" })}</div>
          <h2 className="edu-h2">{t({ cz: "Materiály ke stažení", en: "Downloads" })}</h2>
          {materials.length === 0 ? (
            <p className="edu-lead" data-testid="edu-materials-empty">
              {t({ cz: "Materiály se připravují. Brzy zde najdete PDF a pracovní listy ke stažení.", en: "Materials are on the way. PDFs and worksheets will appear here soon." })}
            </p>
          ) : (
            <ul className="edu-mat-list">
              {materials.map((m, i) => (
                <li className="edu-mat" key={m.id || i} data-testid={`edu-material-${i}`}>
                  <div className="edu-mat-body">
                    <h3 className="edu-mat-name">{t(m.name)}</h3>
                    {t(m.description) && <p className="edu-mat-desc">{t(m.description)}</p>}
                    {m.type && <span className="edu-mat-type">{m.type}</span>}
                  </div>
                  {(m.file || "").trim() ? (
                    <CtaButton cta={{ label: { cz: "Stáhnout", en: "Download" }, type: "file", value: m.file }} className="edu-btn" testid={`edu-material-dl-${i}`} />
                  ) : (
                    <span className="edu-mat-soon">{t({ cz: "Brzy k dispozici", en: "Coming soon" })}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* TAB: WORKSHOPY */}
      {tab === "workshops" && (
        <section className="edu-section edu-offer" data-testid="edu-tabpanel-workshops">
          <div className="edu-label">{t({ cz: "Workshopy", en: "Workshops" })}</div>
          <h2 className="edu-h2">{t({ cz: "Pro všechny tvořivé duše", en: "For all creative souls" })}</h2>
          {workshops && workshops.programs.length > 0 ? (
            <div className="edu-grid" data-testid="edu-workshops-grid">
              {workshops.programs.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          ) : (
            <p className="edu-lead">{t({ cz: "Aktuálně nejsou vypsané žádné workshopy.", en: "No workshops are currently scheduled." })}</p>
          )}
        </section>
      )}

      {/* COLLABORATION CTA (společné pro všechny záložky) */}
      <section className="edu-section" data-testid="edu-collab">
        <div className="edu-collab">
          <div className="edu-collab-text">
            <h2>{t(collab.title)}</h2>
            {t(collab.text) && <p>{t(collab.text)}</p>}
          </div>
          <CtaButton cta={{ label: collab.btnLabel, type: collab.btnType || "internal", value: collab.btnValue || "/kontakt" }} className="btn-cta" testid="edu-collab-cta" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
