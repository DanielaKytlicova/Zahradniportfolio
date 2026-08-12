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

  const cats = publishedCategories(edu);
  const hero = edu?.hero || {};
  const intro = edu?.intro || {};
  const where = edu?.where || {};
  const offer = edu?.offer || {};
  const benefits = edu?.benefits || {};
  const collab = edu?.collaboration || {};

  const heroBg = asset(hero.bgImage);

  // Build renderable category groups (only those with visible, featured programs)
  const groups = cats
    .map((c) => ({ cat: c, programs: liveProgramsInCategory(edu, c.id, { featuredOnly: true }) }))
    .filter((g) => g.programs.length > 0);

  const hasWhere = t(where.atSchool?.text) || t(where.outdoors?.text);
  const hasBenefits = (benefits.items || []).some((it) => t(it));

  return (
    <div className="page active edu-page" data-testid="page-vzdelavani">
      <SEO
        title={{ cz: "Vzdělávání venku a hravě", en: "Outdoor education, playfully" }}
        description={hero.sub}
        path="/vzdelavani"
        image={hero.bgImage}
      />

      {/* HERO */}
      <header className="edu-hero" data-testid="edu-hero">
        {heroBg && <div className="edu-hero-bg" style={{ backgroundImage: `url('${heroBg}')` }} />}
        <div className="edu-hero-overlay" />
        <div className="edu-hero-content">
          {t(hero.badge) && <span className="edu-badge">{t(hero.badge)}</span>}
          <RichText as="h1" className="edu-hero-title" html={t(hero.title)} />
          {t(hero.sub) && <p className="edu-hero-sub">{t(hero.sub)}</p>}
          <div className="edu-hero-actions">
            <CtaButton
              cta={{ label: { cz: "Nabídka programů", en: "Our programmes" }, type: "anchor", value: "nabidka-programu" }}
              className="edu-btn edu-btn-light"
              testid="edu-hero-anchor"
            />
          </div>
        </div>
      </header>

      {/* INTRO */}
      {(t(intro.title) || t(intro.text)) && (
        <section className="edu-section edu-intro" data-testid="edu-intro">
          {t(intro.label) && <div className="edu-label">{t(intro.label)}</div>}
          {t(intro.title) && <RichText as="h2" className="edu-h2" html={t(intro.title)} />}
          {t(intro.text) && <p className="edu-lead">{t(intro.text)}</p>}
        </section>
      )}

      {/* WHERE */}
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

      {/* OFFER — programs grouped by category */}
      <section className="edu-section edu-offer" id="nabidka-programu" data-testid="edu-offer">
        {t(offer.label) && <div className="edu-label">{t(offer.label)}</div>}
        {t(offer.title) && <h2 className="edu-h2">{t(offer.title)}</h2>}
        {t(offer.text) && <p className="edu-lead">{t(offer.text)}</p>}

        {groups.map(({ cat, programs }) => {
          const isSchool = cat.slug === "skoly-v-prirode";
          return (
            <div className="edu-cat" key={cat.id} data-testid={`edu-cat-${cat.slug}`}>
              <div className="edu-cat-head">
                <h3 className="edu-cat-title">{t(cat.name)}</h3>
                {t(cat.description) && <p className="edu-cat-desc">{t(cat.description)}</p>}
              </div>

              {isSchool ? (
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
                          <CtaButton
                            cta={{ label: { cz: "Více info", en: "More info" }, type: "internal", value: `/vzdelavani/${p.slug}` }}
                            className="edu-btn"
                            testid={`edu-feature-cta-${p.slug}`}
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="edu-grid">
                  {programs.map((p) => (
                    <ProgramCard key={p.id} program={p} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* BENEFITS */}
      {hasBenefits && (
        <section className="edu-section edu-benefits" data-testid="edu-benefits">
          {t(benefits.title) && <h2 className="edu-h2 edu-benefits-title">{t(benefits.title)}</h2>}
          <ul className="edu-benefits-list">
            {(benefits.items || []).map((it, i) =>
              t(it) ? (
                <li className="edu-benefit" key={i}>
                  <span className="edu-benefit-mark" aria-hidden="true">✦</span>
                  <span>{t(it)}</span>
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}

      {/* COLLABORATION CTA (preserved) */}
      <section className="edu-section" data-testid="edu-collab">
        <div className="edu-collab">
          <div className="edu-collab-text">
            <h2>{t(collab.title)}</h2>
            {t(collab.text) && <p>{t(collab.text)}</p>}
          </div>
          <CtaButton
            cta={{ label: collab.btnLabel, type: collab.btnType || "internal", value: collab.btnValue || "/kontakt" }}
            className="btn-cta"
            testid="edu-collab-cta"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
