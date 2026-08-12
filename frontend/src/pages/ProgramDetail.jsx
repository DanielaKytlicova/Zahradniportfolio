import { useParams, Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { useContent } from "../contexts/ContentContext";
import RichText from "../components/RichText";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import CtaButton from "../components/edu/CtaButton";
import { asset } from "../utils/asset";
import { findProgramBySlug, isProgramLive, categoryById } from "../utils/edu";
import "./Edu.css";

export default function ProgramDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const { edu } = useContent();

  const program = findProgramBySlug(edu, slug);
  const live = isProgramLive(program);

  if (!program || !live) {
    return (
      <div className="page active edu-page" data-testid="page-program-detail">
        <SEO title={{ cz: "Program nenalezen", en: "Programme not found" }} path={`/vzdelavani/${slug}`} noindex />
        <div className="edu-notfound">
          <h1>{t({ cz: "Program nenalezen", en: "Programme not found" })}</h1>
          <p>{t({ cz: "Tento program neexistuje nebo právě není dostupný.", en: "This programme doesn't exist or isn't available right now." })}</p>
          <Link to="/vzdelavani" className="edu-btn" data-testid="edu-back-offer">
            <span>{t({ cz: "Zpět na nabídku", en: "Back to programmes" })}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cat = categoryById(edu, program.categoryId);
  const bg = asset(program.mainImage);

  // Practical info — only render fields that actually have content.
  const infoFields = [
    { key: "targetGroup", label: { cz: "Cílová skupina", en: "Target group" } },
    { key: "age", label: { cz: "Věk / ročník", en: "Age / grade" } },
    { key: "location", label: { cz: "Místo konání", en: "Location" } },
    { key: "duration", label: { cz: "Délka programu", en: "Duration" } },
    { key: "capacity", label: { cz: "Kapacita", en: "Capacity" } },
    { key: "season", label: { cz: "Sezóna / termín", en: "Season" } },
    { key: "price", label: { cz: "Cena", en: "Price" } },
    { key: "materials", label: { cz: "Pomůcky", en: "Materials" } },
  ].filter((f) => t(program[f.key]));

  const blocks = (program.blocks || []).filter((b) => t(b.heading) || t(b.text) || b.image);
  const gallery = (program.gallery || []).filter(Boolean);
  const attachments = (program.attachments || []).filter((a) => t(a.name) && (a.url || "").trim());
  const ctas = (program.ctas || []).filter((c) => t(c.label));

  const seoTitle = t(program.seo?.title) || t(program.title);
  const seoDesc = t(program.seo?.description) || t(program.perex);

  return (
    <div className="page active edu-page edu-detail" data-testid="page-program-detail">
      <SEO
        title={{ cz: seoTitle, en: seoTitle }}
        description={{ cz: seoDesc, en: seoDesc }}
        path={`/vzdelavani/${program.slug}`}
        image={program.mainImage}
      />

      {/* HERO */}
      <header className="edu-detail-hero" data-testid="edu-detail-hero">
        {bg && <div className="edu-detail-hero-bg" style={{ backgroundImage: `url('${bg}')` }} />}
        <div className="edu-detail-hero-overlay" />
        <div className="edu-detail-hero-content">
          <nav className="edu-breadcrumb" aria-label="breadcrumb">
            <Link to="/vzdelavani">{t({ cz: "Vzdělávání", en: "Education" })}</Link>
            {cat && <span aria-hidden="true"> · </span>}
            {cat && <span>{t(cat.name)}</span>}
          </nav>
          <h1 className="edu-detail-title">{t(program.title)}</h1>
          {t(program.perex) && <p className="edu-detail-perex">{t(program.perex)}</p>}
        </div>
      </header>

      <div className="edu-detail-body">
        {/* MAIN TEXT */}
        {t(program.mainText) && (
          <section className="edu-detail-section" data-testid="edu-detail-maintext">
            <RichText as="p" className="edu-prose" html={t(program.mainText)} />
          </section>
        )}

        {/* CONTENT BLOCKS */}
        {blocks.map((b, i) => (
          <section className="edu-detail-section edu-block" key={b.id || i} data-testid={`edu-detail-block-${i}`}>
            {t(b.heading) && <h2 className="edu-block-heading">{t(b.heading)}</h2>}
            {b.type === "image" && b.image ? (
              <figure className="edu-block-figure">
                <div className="edu-block-img" style={{ backgroundImage: `url('${asset(b.image)}')` }} role="img" aria-label={t(b.caption) || t(b.heading) || t(program.title)} />
                {t(b.caption) && <figcaption>{t(b.caption)}</figcaption>}
              </figure>
            ) : (
              t(b.text) && <RichText as="p" className="edu-prose" html={t(b.text)} />
            )}
          </section>
        ))}

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="edu-detail-section" data-testid="edu-detail-gallery">
            <h2 className="edu-block-heading">{t({ cz: "Fotogalerie", en: "Gallery" })}</h2>
            <div className="edu-gallery">
              {gallery.map((g, i) => (
                <div className="edu-gallery-img" key={i} style={{ backgroundImage: `url('${asset(g)}')` }} role="img" aria-label={`${t(program.title)} — ${i + 1}`} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* PRACTICAL INFO PANEL */}
      {infoFields.length > 0 && (
        <aside className="edu-info" data-testid="edu-detail-info">
          <h2 className="edu-info-heading">{t({ cz: "Praktické informace", en: "Practical information" })}</h2>
          <dl className="edu-info-grid">
            {infoFields.map((f) => (
              <div className="edu-info-item" key={f.key} data-testid={`edu-info-${f.key}`}>
                <dt className="edu-info-label">{t(f.label)}</dt>
                <dd className="edu-info-value">{t(program[f.key])}</dd>
              </div>
            ))}
          </dl>
        </aside>
      )}

      {/* ATTACHMENTS */}
      {attachments.length > 0 && (
        <section className="edu-section edu-attachments-wrap" data-testid="edu-detail-attachments">
          <h2 className="edu-block-heading">{t({ cz: "Materiály ke stažení", en: "Downloads" })}</h2>
          <ul className="edu-attachments">
            {attachments.map((a, i) => (
              <li key={a.id || i}>
                <a href={asset(a.url)} target="_blank" rel="noreferrer" className="edu-attachment" data-testid={`edu-attachment-${i}`}>
                  <span className="edu-attachment-name">{t(a.name)}</span>
                  {a.type && <span className="edu-attachment-type">{a.type}</span>}
                  <span aria-hidden="true">↧</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTAs */}
      <section className="edu-section" data-testid="edu-detail-cta">
        <div className="edu-collab">
          <div className="edu-collab-text">
            <h2>{t({ cz: "Máte zájem o tento program?", en: "Interested in this programme?" })}</h2>
            <p>{t({ cz: "Ozvěte se — domluvíme termín, místo i podobu programu na míru.", en: "Get in touch — we'll arrange the date, place and a tailored programme." })}</p>
          </div>
          <div className="edu-cta-group">
            {ctas.map((c, i) => (
              <CtaButton key={c.id || i} cta={c} className={i === 0 ? "btn-cta" : "edu-btn edu-btn-light"} testid={`edu-detail-cta-${i}`} />
            ))}
          </div>
        </div>
      </section>

      <div className="edu-section edu-back-wrap">
        <Link to="/vzdelavani" className="edu-back" data-testid="edu-back-link">
          <span aria-hidden="true">←</span>
          <span>{t({ cz: "Zpět na nabídku", en: "Back to programmes" })}</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
