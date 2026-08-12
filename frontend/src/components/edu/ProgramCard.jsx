import { Link } from "react-router-dom";
import { useLang } from "../../contexts/LangContext";
import { asset } from "../../utils/asset";

// Reusable program card: photo, title, short perex, "Více info" CTA.
export default function ProgramCard({ program }) {
  const { t } = useLang();
  const img = asset(program.mainImage);
  const perex = t(program.perex);
  return (
    <Link to={`/vzdelavani/${program.slug}`} className="edu-card" data-testid={`edu-card-${program.slug}`}>
      <div className="edu-card-media">
        {img ? (
          <div className="edu-card-img" style={{ backgroundImage: `url('${img}')` }} role="img" aria-label={t(program.title)} />
        ) : (
          <div className="edu-card-img edu-card-img--empty" aria-hidden="true" />
        )}
      </div>
      <div className="edu-card-body">
        <h3 className="edu-card-title">{t(program.title)}</h3>
        {perex && <p className="edu-card-perex">{perex}</p>}
        <span className="edu-card-link">
          {t({ cz: "Více info", en: "More info" })}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
