import { Link } from "react-router-dom";
import { useLang } from "../../contexts/LangContext";
import { asset } from "../../utils/asset";

/**
 * Universal CTA button supporting four action types:
 *  - internal : react-router link (e.g. /vzdelavani/slug, /kontakt)
 *  - external : opens an external URL in a new tab (e.g. reservation system)
 *  - file     : opens/downloads an uploaded file
 *  - anchor   : smooth-scrolls to a section on the current page (#id)
 * Empty / unconfigured CTAs render nothing (no empty buttons on the frontend).
 */
export default function CtaButton({ cta, className = "edu-btn", testid }) {
  const { t } = useLang();
  if (!cta) return null;
  const label = t(cta.label);
  if (!label) return null;

  const type = cta.type || "internal";
  const value = (cta.value || "").trim();

  if (type === "anchor") {
    const id = value.replace(/^#/, "");
    if (!id) return null;
    return (
      <a
        href={`#${id}`}
        className={className}
        data-testid={testid}
        onClick={(e) => {
          const el = document.getElementById(id);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(null, "", `#${id}`);
          }
        }}
      >
        <span>{label}</span>
        <span aria-hidden="true">↓</span>
      </a>
    );
  }

  if (type === "file") {
    if (!value) return null;
    return (
      <a href={asset(value)} className={className} download data-testid={testid}>
        <span>{label}</span>
        <span aria-hidden="true">↧</span>
      </a>
    );
  }

  if (type === "external") {
    if (!value) return null;
    return (
      <a href={value} className={className} target="_blank" rel="noreferrer" data-testid={testid}>
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  // internal
  if (!value) return null;
  if (value.startsWith("http")) {
    return (
      <a href={value} className={className} data-testid={testid}>
        <span>{label}</span>
        <span aria-hidden="true">→</span>
      </a>
    );
  }
  return (
    <Link to={value} className={className} data-testid={testid}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
