import { Helmet } from "react-helmet-async";
import { useLang } from "../contexts/LangContext";
import { asset } from "../utils/asset";

const SITE_URL = "https://ateliervenku.cz"; // Canonical site URL (update after deployment)
const DEFAULT_OG = `${SITE_URL}/logos/venku-dark.png`;

/**
 * Reusable per-page SEO component.
 *
 * Props:
 *   title       - localized {cz, en} or string (page title without site name)
 *   description - localized {cz, en} or string
 *   path        - path part for canonical URL (e.g. "/portfolio")
 *   image       - absolute or relative URL for OG image (defaults to /og-default.jpg)
 *   noindex     - boolean
 */
export default function SEO({ title, description, path = "/", image, noindex = false }) {
  const { lang, t } = useLang();

  const titleStr = typeof title === "object" ? t(title) : title || "";
  const descStr = typeof description === "object" ? t(description) : description || "";

  const fullTitle = titleStr
    ? `${titleStr} — Atelier Venku`
    : "Atelier Venku — Zahradní ateliér v Praze";

  const ogImageRaw = image ? asset(image) : DEFAULT_OG;
  const ogImage = ogImageRaw && !ogImageRaw.startsWith("http")
    ? `${SITE_URL}${ogImageRaw}`
    : ogImageRaw;

  const url = `${SITE_URL}${path}`;
  const altLang = lang === "cz" ? "en" : "cz";

  return (
    <Helmet htmlAttributes={{ lang: lang === "cz" ? "cs" : "en" }}>
      <title>{fullTitle}</title>
      <meta name="description" content={descStr} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Atelier Venku" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={descStr} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === "cz" ? "cs_CZ" : "en_US"} />
      <meta property="og:locale:alternate" content={altLang === "cz" ? "cs_CZ" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={descStr} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
