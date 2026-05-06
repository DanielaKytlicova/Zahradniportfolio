import { useState } from "react";
import { useLang } from "../contexts/LangContext";
import { kontakt } from "../data/content";
import RichText from "../components/RichText";
import Footer from "../components/Footer";

export default function Kontakt() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("sending");
    // Mocked submit — in production this would POST to a backend / email API.
    setTimeout(() => setStatus("sent"), 700);
  };

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div className="page active contact-page" data-testid="page-kontakt">
      <div className="page-hero" style={{ height: "35vh", minHeight: 300 }}>
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572036767093-33e2e8a0c234?w=1600&q=80')", opacity: 0.25 }}
        />
        <div className="page-hero-content">
          <span className="page-hero-label">{t(kontakt.eyebrow)}</span>
          <h1 className="page-hero-title">{t(kontakt.title)}</h1>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-left">
          <RichText as="h2" html={t(kontakt.h2)} />
          <p>{t(kontakt.intro)}</p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-detail-label">{lang === "cz" ? "E-mail" : "Email"}</span>
              <a href={`mailto:${kontakt.email}`} className="contact-detail-value" data-testid="contact-email">
                {kontakt.email}
              </a>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-label">{lang === "cz" ? "Telefon" : "Phone"}</span>
              <a href={`tel:${kontakt.phone.replace(/\s/g, "")}`} className="contact-detail-value" data-testid="contact-phone">
                {kontakt.phone}
              </a>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-label">{lang === "cz" ? "Atelier" : "Studio"}</span>
              <span className="contact-detail-value">{t(kontakt.studio)}</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-label">Instagram</span>
              <a href={`https://instagram.com/${kontakt.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="contact-detail-value">
                {kontakt.instagram}
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} data-testid="contact-form">
          <div className="form-group">
            <label className="form-label">{t(kontakt.formLabels.name)}</label>
            <input
              type="text" className="form-input" required
              placeholder={lang === "cz" ? "Jana Nováková" : "Jane Doe"}
              value={form.name} onChange={update("name")}
              data-testid="form-name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t(kontakt.formLabels.email)}</label>
            <input
              type="email" className="form-input" required
              placeholder={lang === "cz" ? "jana@example.cz" : "jane@example.com"}
              value={form.email} onChange={update("email")}
              data-testid="form-email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t(kontakt.formLabels.topic)}</label>
            <select className="form-select" value={form.topic} onChange={update("topic")} data-testid="form-topic">
              {kontakt.topicOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t(kontakt.formLabels.message)}</label>
            <textarea
              className="form-textarea"
              placeholder={lang === "cz" ? "Pár slov o vašem prostoru…" : "A few words about your space…"}
              value={form.message} onChange={update("message")}
              data-testid="form-message"
            />
          </div>
          <button type="submit" className="form-submit" disabled={status === "sending"} data-testid="form-submit">
            <span>
              {status === "sending"
                ? t(kontakt.formLabels.sending)
                : status === "sent"
                ? t(kontakt.formLabels.sent)
                : t(kontakt.formLabels.send)}
            </span>
            <span>→</span>
          </button>
          {status === "sent" && (
            <p className="form-success" data-testid="form-success">
              {t(kontakt.formLabels.sent)}
            </p>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}
