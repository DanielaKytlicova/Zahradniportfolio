import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useContentMeta } from "../contexts/ContentContext";
import "./Admin.css";

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const PW_KEY = "venku_admin_pw";

/* ---------- Small reusable inputs ---------- */

function TextField({ label, value, onChange, multiline = false, testid }) {
  const cz = value?.cz ?? "";
  const en = value?.en ?? "";
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      <div className="adm-bilingual">
        <div className="adm-bi-col">
          <span className="adm-flag">CZ</span>
          <Tag
            className="adm-input"
            value={cz}
            onChange={(e) => onChange({ ...value, cz: e.target.value })}
            data-testid={testid ? `${testid}-cz` : undefined}
            rows={multiline ? 3 : undefined}
          />
        </div>
        <div className="adm-bi-col">
          <span className="adm-flag">EN</span>
          <Tag
            className="adm-input"
            value={en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            data-testid={testid ? `${testid}-en` : undefined}
            rows={multiline ? 3 : undefined}
          />
        </div>
      </div>
    </div>
  );
}

function PlainField({ label, value, onChange, testid }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      <input
        className="adm-input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
      />
    </div>
  );
}

function ImageField({ label, value, onChange, password, testid }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const previewUrl = (value || "").startsWith("/api/") ? `${BACKEND}${value}` : value;

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-pick same file
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${BACKEND}/api/admin/upload`, {
        method: "POST",
        headers: { "X-Admin-Password": password },
        body: fd,
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `Status ${res.status}`);
      }
      const data = await res.json();
      onChange(data.url);
    } catch (e2) {
      setErr(String(e2.message || e2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      <div className="adm-image-row">
        <input
          className="adm-input"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… nebo nahrajte fotografii →"
          data-testid={testid}
        />
        {value ? (
          <div
            className="adm-thumb"
            style={{ backgroundImage: `url('${previewUrl}')` }}
          />
        ) : null}
        <label className="adm-btn adm-btn-ghost adm-btn-sm adm-upload-btn">
          {busy ? "Nahrávám…" : "Nahrát"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onPick}
            disabled={busy}
            style={{ display: "none" }}
            data-testid={testid ? `${testid}-file` : undefined}
          />
        </label>
      </div>
      {err && <div className="adm-error" style={{ marginTop: 6 }}>{err}</div>}
    </div>
  );
}

function Section({ title, children, defaultOpen = false, testid }) {
  return (
    <details className="adm-section" open={defaultOpen} data-testid={testid}>
      <summary className="adm-section-title">{title}</summary>
      <div className="adm-section-body">{children}</div>
    </details>
  );
}

/* ---------- Login screen ---------- */

function Login({ onSuccess }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        setError("Nesprávné heslo");
        return;
      }
      sessionStorage.setItem(PW_KEY, pw);
      onSuccess(pw);
    } catch (err) {
      setError("Chyba spojení");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-login-wrap" data-testid="admin-login">
      <Helmet>
        <title>Admin — Atelier Venku</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <form className="adm-login" onSubmit={submit}>
        <h1 className="adm-login-title">Atelier Venku — Admin</h1>
        <p className="adm-login-sub">Zadejte heslo pro úpravu obsahu.</p>
        <input
          type="password"
          className="adm-input"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Heslo"
          autoFocus
          data-testid="admin-password-input"
        />
        {error && <div className="adm-error" data-testid="admin-login-error">{error}</div>}
        <button type="submit" className="adm-btn adm-btn-primary" disabled={busy} data-testid="admin-login-submit">
          {busy ? "Přihlašuji…" : "Přihlásit"}
        </button>
      </form>
    </div>
  );
}

/* ---------- Main editor ---------- */

function Editor({ initial, password, onLogout }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [errMsg, setErrMsg] = useState("");

  // helpers for nested updates
  const setPath = (path, value) =>
    setData((prev) => {
      const next = structuredClone(prev);
      let cur = next;
      for (let i = 0; i < path.length - 1; i++) {
        if (cur[path[i]] === undefined || cur[path[i]] === null) cur[path[i]] = {};
        cur = cur[path[i]];
      }
      cur[path[path.length - 1]] = value;
      return next;
    });

  // Upload helper used by inline gallery rows
  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${BACKEND}/api/admin/upload`, {
      method: "POST",
      headers: { "X-Admin-Password": password },
      body: fd,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const data = await res.json();
    return data.url;
  };

  const save = async () => {
    setStatus("saving");
    setErrMsg("");
    try {
      const res = await fetch(`${BACKEND}/api/admin/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `Status ${res.status}`);
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2200);
    } catch (e) {
      setStatus("error");
      setErrMsg(String(e.message || e));
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className="adm-wrap" data-testid="admin-editor">
      <Helmet>
        <title>Admin — Atelier Venku</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <header className="adm-header">
        <div className="adm-header-left">
          <span className="adm-eyebrow">Atelier Venku</span>
          <h1 className="adm-title">Editor obsahu</h1>
        </div>
        <div className="adm-header-right">
          <a href="/" target="_blank" rel="noreferrer" className="adm-btn adm-btn-ghost" data-testid="admin-view-site">
            Otevřít web ↗
          </a>
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onLogout} data-testid="admin-logout">
            Odhlásit
          </button>
        </div>
      </header>

      <div className="adm-tip">
        Zde můžete upravovat veškeré texty, odkazy, fotografie a kontaktní údaje. Změny se po uložení projeví okamžitě na webu.
      </div>

      {/* NAV */}
      <Section title="Navigace & menu" defaultOpen testid="admin-section-nav">
        <TextField label="Portfolio" value={data.nav?.portfolio} onChange={(v) => setPath(["nav", "portfolio"], v)} />
        <TextField label="Nabídka" value={data.nav?.nabidka} onChange={(v) => setPath(["nav", "nabidka"], v)} />
        <TextField label="O ateliéru" value={data.nav?.about} onChange={(v) => setPath(["nav", "about"], v)} />
        <TextField label="Vzdělávání" value={data.nav?.vzdelavani} onChange={(v) => setPath(["nav", "vzdelavani"], v)} />
        <TextField label="Kontakt" value={data.nav?.kontakt} onChange={(v) => setPath(["nav", "kontakt"], v)} />
      </Section>

      {/* HOME */}
      <Section title="Úvodní stránka" testid="admin-section-home">
        <ImageField label="Pozadí hero" value={data.HERO_BG} onChange={(v) => setPath(["HERO_BG"], v)} password={password} testid="admin-hero-bg" />
        <TextField label="Eyebrow (malý nadpis)" value={data.home?.eyebrow} onChange={(v) => setPath(["home", "eyebrow"], v)} />
        <TextField label="Headline (HTML, např. <em>kurzíva</em>, <br>)" value={data.home?.headline} onChange={(v) => setPath(["home", "headline"], v)} multiline />
        <TextField label="Podtitulek" value={data.home?.sub} onChange={(v) => setPath(["home", "sub"], v)} multiline />
        <TextField label="Tlačítko CTA" value={data.home?.cta} onChange={(v) => setPath(["home", "cta"], v)} />
      </Section>

      {/* PORTFOLIO */}
      <Section title="Portfolio (projekty)" testid="admin-section-projects">
        {(data.projects || []).map((p, i) => (
          <div className="adm-card" key={p.id ?? i} data-testid={`admin-project-${i}`}>
            <div className="adm-card-head">
              <strong>Projekt #{i + 1}</strong>
              <button
                type="button"
                className="adm-btn adm-btn-danger adm-btn-sm"
                onClick={() =>
                  setData((prev) => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }))
                }
              >
                Odstranit
              </button>
            </div>
            <TextField label="Název" value={p.title} onChange={(v) => setPath(["projects", i, "title"], v)} />
            <TextField label="Lokace / rok" value={p.location} onChange={(v) => setPath(["projects", i, "location"], v)} />
            <ImageField label="Hlavní fotografie" value={p.cover} onChange={(v) => setPath(["projects", i, "cover"], v)} password={password} />
            <TextField label="Popis" value={p.text} onChange={(v) => setPath(["projects", i, "text"], v)} multiline />
            <div className="adm-field">
              <label className="adm-label">Galerie (fotografie)</label>
              {(p.gallery || []).map((g, gi) => (
                <div className="adm-image-row" key={gi}>
                  <input
                    className="adm-input"
                    value={g}
                    onChange={(e) => setPath(["projects", i, "gallery", gi], e.target.value)}
                  />
                  {g && <div className="adm-thumb" style={{ backgroundImage: `url('${g.startsWith("/api/") ? `${BACKEND}${g}` : g}')` }} />}
                  <label className="adm-btn adm-btn-ghost adm-btn-sm adm-upload-btn">
                    ⤴
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (!f) return;
                        try {
                          const url = await uploadFile(f);
                          setPath(["projects", i, "gallery", gi], url);
                        } catch (err) {
                          alert(`Upload selhal: ${err.message}`);
                        }
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="adm-btn adm-btn-ghost adm-btn-sm"
                    onClick={() =>
                      setData((prev) => {
                        const next = structuredClone(prev);
                        next.projects[i].gallery = next.projects[i].gallery.filter((_, idx) => idx !== gi);
                        return next;
                      })
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="adm-btn adm-btn-ghost adm-btn-sm"
                onClick={() =>
                  setData((prev) => {
                    const next = structuredClone(prev);
                    next.projects[i].gallery = [...(next.projects[i].gallery || []), ""];
                    return next;
                  })
                }
              >
                + Přidat fotografii
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="adm-btn adm-btn-ghost"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              projects: [
                ...(prev.projects || []),
                {
                  id: Date.now(),
                  title: { cz: "Nový projekt", en: "New project" },
                  location: { cz: "", en: "" },
                  cover: "",
                  text: { cz: "", en: "" },
                  gallery: [],
                },
              ],
            }))
          }
          data-testid="admin-add-project"
        >
          + Přidat projekt
        </button>
      </Section>

      {/* SERVICES */}
      <Section title="Nabídka (Služby)" testid="admin-section-services">
        <TextField label="Eyebrow" value={data.services?.pageEyebrow} onChange={(v) => setPath(["services", "pageEyebrow"], v)} />
        <TextField label="Titulek stránky" value={data.services?.pageTitle} onChange={(v) => setPath(["services", "pageTitle"], v)} />
        <TextField label="Úvodní nadpis (HTML)" value={data.services?.introTitle} onChange={(v) => setPath(["services", "introTitle"], v)} multiline />
        <TextField label="Úvodní text" value={data.services?.introText} onChange={(v) => setPath(["services", "introText"], v)} multiline />
        <TextField label="CTA nadpis (HTML)" value={data.services?.ctaTitle} onChange={(v) => setPath(["services", "ctaTitle"], v)} multiline />
        <TextField label="CTA tlačítko" value={data.services?.ctaBtn} onChange={(v) => setPath(["services", "ctaBtn"], v)} />

        <h3 className="adm-subhead">Kroky procesu</h3>
        {(data.processList || []).map((s, i) => (
          <div className="adm-card" key={i}>
            <div className="adm-card-head">
              <strong>Krok {s.num}</strong>
            </div>
            <PlainField label="Číslo" value={s.num} onChange={(v) => setPath(["processList", i, "num"], v)} />
            <TextField label="Podnázev" value={s.sub} onChange={(v) => setPath(["processList", i, "sub"], v)} />
            <TextField label="Název" value={s.title} onChange={(v) => setPath(["processList", i, "title"], v)} />
            <TextField label="Popis" value={s.desc} onChange={(v) => setPath(["processList", i, "desc"], v)} multiline />
            <TextField label="Detail / poznámka" value={s.detail} onChange={(v) => setPath(["processList", i, "detail"], v)} multiline />
            <ImageField label="Fotografie" value={s.img} onChange={(v) => setPath(["processList", i, "img"], v)} password={password} />
          </div>
        ))}
      </Section>

      {/* ABOUT */}
      <Section title="O ateliéru" testid="admin-section-about">
        <TextField label="Eyebrow" value={data.about?.eyebrow} onChange={(v) => setPath(["about", "eyebrow"], v)} />
        <TextField label="Titulek stránky" value={data.about?.title} onChange={(v) => setPath(["about", "title"], v)} />
        <ImageField label="Hero pozadí" value={data.about?.hero} onChange={(v) => setPath(["about", "hero"], v)} password={password} />
        <ImageField label="Portrétní fotografie" value={data.about?.portrait} onChange={(v) => setPath(["about", "portrait"], v)} password={password} />
        <TextField label="Popisek pod portrétem" value={data.about?.caption} onChange={(v) => setPath(["about", "caption"], v)} />
        <TextField label="H2 nadpis (HTML)" value={data.about?.h2} onChange={(v) => setPath(["about", "h2"], v)} multiline />
        <TextField label="Citace / highlight" value={data.about?.highlight} onChange={(v) => setPath(["about", "highlight"], v)} multiline />
        <TextField label="Odstavec 1" value={data.about?.body1} onChange={(v) => setPath(["about", "body1"], v)} multiline />
        <TextField label="Odstavec 2" value={data.about?.body2} onChange={(v) => setPath(["about", "body2"], v)} multiline />
        <TextField label="Filozofie — label" value={data.about?.philosophyLabel} onChange={(v) => setPath(["about", "philosophyLabel"], v)} />
        <TextField label="Filozofie — titulek (HTML)" value={data.about?.philosophyTitle} onChange={(v) => setPath(["about", "philosophyTitle"], v)} multiline />
        <TextField label="Filozofie — text" value={data.about?.philosophyText} onChange={(v) => setPath(["about", "philosophyText"], v)} multiline />
      </Section>

      {/* VZDELAVANI */}
      <Section title="Vzdělávání" testid="admin-section-vzdelavani">
        <TextField label="Badge" value={data.vzdelavani?.badge} onChange={(v) => setPath(["vzdelavani", "badge"], v)} />
        <TextField label="Titulek (HTML)" value={data.vzdelavani?.title} onChange={(v) => setPath(["vzdelavani", "title"], v)} multiline />
        <TextField label="Podtitulek" value={data.vzdelavani?.sub} onChange={(v) => setPath(["vzdelavani", "sub"], v)} multiline />
        <TextField label="Úvodní nadpis (HTML)" value={data.vzdelavani?.introTitle} onChange={(v) => setPath(["vzdelavani", "introTitle"], v)} multiline />
        <TextField label="Úvodní text" value={data.vzdelavani?.introText} onChange={(v) => setPath(["vzdelavani", "introText"], v)} multiline />

        <h3 className="adm-subhead">Programy</h3>
        {(data.vzdelavani?.programs || []).map((p, i) => (
          <div className="adm-card" key={i}>
            <div className="adm-card-head">
              <strong>Program #{i + 1}</strong>
            </div>
            <PlainField label="Ikona (leaf, book, house)" value={p.icon} onChange={(v) => setPath(["vzdelavani", "programs", i, "icon"], v)} />
            <TextField label="Název" value={p.title} onChange={(v) => setPath(["vzdelavani", "programs", i, "title"], v)} />
            <TextField label="Popis" value={p.text} onChange={(v) => setPath(["vzdelavani", "programs", i, "text"], v)} multiline />
            <TextField label="Tag" value={p.tag} onChange={(v) => setPath(["vzdelavani", "programs", i, "tag"], v)} />
          </div>
        ))}

        <TextField label="CTA titulek" value={data.vzdelavani?.ctaTitle} onChange={(v) => setPath(["vzdelavani", "ctaTitle"], v)} />
        <TextField label="CTA text" value={data.vzdelavani?.ctaText} onChange={(v) => setPath(["vzdelavani", "ctaText"], v)} multiline />
        <TextField label="CTA tlačítko" value={data.vzdelavani?.ctaBtn} onChange={(v) => setPath(["vzdelavani", "ctaBtn"], v)} />
      </Section>

      {/* CONTACT */}
      <Section title="Kontakt" testid="admin-section-kontakt">
        <TextField label="Eyebrow" value={data.kontakt?.eyebrow} onChange={(v) => setPath(["kontakt", "eyebrow"], v)} />
        <TextField label="Titulek" value={data.kontakt?.title} onChange={(v) => setPath(["kontakt", "title"], v)} />
        <TextField label="H2 (HTML)" value={data.kontakt?.h2} onChange={(v) => setPath(["kontakt", "h2"], v)} multiline />
        <TextField label="Úvodní text" value={data.kontakt?.intro} onChange={(v) => setPath(["kontakt", "intro"], v)} multiline />
        <PlainField label="E-mail" value={data.kontakt?.email} onChange={(v) => setPath(["kontakt", "email"], v)} testid="admin-kontakt-email" />
        <PlainField label="Telefon" value={data.kontakt?.phone} onChange={(v) => setPath(["kontakt", "phone"], v)} />
        <TextField label="Atelier (lokace)" value={data.kontakt?.studio} onChange={(v) => setPath(["kontakt", "studio"], v)} />
        <PlainField label="Instagram (handle)" value={data.kontakt?.instagram} onChange={(v) => setPath(["kontakt", "instagram"], v)} />

        <h3 className="adm-subhead">Popisky formuláře</h3>
        <TextField label="Jméno" value={data.kontakt?.formLabels?.name} onChange={(v) => setPath(["kontakt", "formLabels", "name"], v)} />
        <TextField label="E-mail" value={data.kontakt?.formLabels?.email} onChange={(v) => setPath(["kontakt", "formLabels", "email"], v)} />
        <TextField label="Téma" value={data.kontakt?.formLabels?.topic} onChange={(v) => setPath(["kontakt", "formLabels", "topic"], v)} />
        <TextField label="Zpráva" value={data.kontakt?.formLabels?.message} onChange={(v) => setPath(["kontakt", "formLabels", "message"], v)} />
        <TextField label="Odeslat" value={data.kontakt?.formLabels?.send} onChange={(v) => setPath(["kontakt", "formLabels", "send"], v)} />
        <TextField label="Odesílám" value={data.kontakt?.formLabels?.sending} onChange={(v) => setPath(["kontakt", "formLabels", "sending"], v)} />
        <TextField label="Po odeslání" value={data.kontakt?.formLabels?.sent} onChange={(v) => setPath(["kontakt", "formLabels", "sent"], v)} />
      </Section>

      {/* SAVE BAR */}
      <div className="adm-savebar" data-testid="admin-savebar">
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={save}
          disabled={status === "saving"}
          data-testid="admin-save"
        >
          {status === "saving" ? "Ukládám…" : "Uložit změny"}
        </button>
        {status === "saved" && (
          <span className="adm-toast adm-toast-ok" data-testid="admin-save-ok">
            ✓ Obsah uložen
          </span>
        )}
        {status === "error" && (
          <span className="adm-toast adm-toast-err" data-testid="admin-save-err">
            ✕ Chyba: {errMsg}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- Page wrapper with auth gate ---------- */

export default function Admin() {
  const { content, loaded } = useContentMeta();
  const [pw, setPw] = useState(() => sessionStorage.getItem(PW_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [verifying, setVerifying] = useState(!!pw);

  // Verify saved password is still valid on mount
  useEffect(() => {
    if (!pw) return;
    let cancelled = false;
    fetch(`${BACKEND}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    })
      .then((r) => {
        if (cancelled) return;
        if (r.ok) setAuthed(true);
        else {
          sessionStorage.removeItem(PW_KEY);
          setPw("");
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setVerifying(false));
    return () => {
      cancelled = true;
    };
  }, [pw]);

  const initialData = useMemo(() => structuredClone(content), [content]);

  if (!authed) {
    if (verifying) return <div className="adm-loading">…</div>;
    return (
      <Login
        onSuccess={(p) => {
          setPw(p);
          setAuthed(true);
        }}
      />
    );
  }
  if (!loaded) return <div className="adm-loading">Načítám obsah…</div>;
  return (
    <Editor
      initial={initialData}
      password={pw}
      onLogout={() => {
        sessionStorage.removeItem(PW_KEY);
        setAuthed(false);
        setPw("");
      }}
    />
  );
}
