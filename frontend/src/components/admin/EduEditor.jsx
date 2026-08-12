import { useState } from "react";

const uid = () => Math.random().toString(36).slice(2, 9);
const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const STATUS_OPTIONS = [
  { value: "published", label: "Publikováno" },
  { value: "draft", label: "Koncept" },
  { value: "hidden", label: "Skryto" },
];
const CTA_TYPES = [
  { value: "internal", label: "Interní stránka" },
  { value: "external", label: "Externí URL (rezervace)" },
  { value: "file", label: "Soubor ke stažení" },
  { value: "anchor", label: "Kotva (sekce na stránce)" },
];

function Check({ label, checked, onChange, testid }) {
  return (
    <label className="adm-check" data-testid={testid} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 18 }}>
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} style={{ width: 18, height: 18 }} />
      <span className="adm-label" style={{ margin: 0 }}>{label}</span>
    </label>
  );
}
function SelectField({ label, value, onChange, options, testid }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      <select className="adm-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} data-testid={testid}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
function DateField({ label, value, onChange, testid }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      <input type="date" className="adm-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} data-testid={testid} />
    </div>
  );
}
function DocField({ label, value, onChange, uploadDoc, testid }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pick = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      const r = await uploadDoc(f);
      onChange(r.url, r.name);
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
        <input className="adm-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="URL souboru nebo nahrajte →" data-testid={testid} />
        <label className="adm-btn adm-btn-ghost adm-btn-sm adm-upload-btn">
          {busy ? "Nahrávám…" : "Nahrát soubor"}
          <input type="file" style={{ display: "none" }} onChange={pick} disabled={busy} data-testid={testid ? `${testid}-file` : undefined} />
        </label>
      </div>
      {err && <div className="adm-error" style={{ marginTop: 6 }}>{err}</div>}
    </div>
  );
}
function MiniBtns({ onUp, onDown, onRemove }) {
  return (
    <span style={{ display: "flex", gap: 6 }}>
      <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={onUp} title="Nahoru">↑</button>
      <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={onDown} title="Dolů">↓</button>
      <button type="button" className="adm-btn adm-btn-danger adm-btn-sm" onClick={onRemove} title="Odstranit">×</button>
    </span>
  );
}

export default function EduEditor({ data, setData, setPath, password, uploadDoc, TextField, PlainField, ImageField, Section }) {
  const edu = data.edu || {};
  const categories = edu.categories || [];
  const programs = edu.programs || [];

  const setE = (path, value) => setPath(["edu", ...path], value);

  // structural mutations (add/remove/reorder) with safe init
  const mutate = (fn) =>
    setData((prev) => {
      const next = structuredClone(prev);
      if (!next.edu) next.edu = {};
      if (!next.edu.categories) next.edu.categories = [];
      if (!next.edu.programs) next.edu.programs = [];
      fn(next.edu);
      return next;
    });
  const move = (arr, i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    arr.forEach((it, idx) => (it.order = idx + 1));
  };

  const catOptions = [
    { value: "", label: "— bez kategorie —" },
    ...categories.map((c) => ({ value: c.id, label: c.name?.cz || c.slug || c.id })),
  ];

  const newCategory = () => ({ id: "cat-" + uid(), slug: "", name: { cz: "Nová kategorie", en: "New category" }, description: { cz: "", en: "" }, image: "", order: categories.length + 1, published: true });
  const newProgram = () => ({
    id: "prog-" + uid(), slug: "", categoryId: categories[0]?.id || "", status: "draft", featured: false, order: programs.length + 1,
    publishFrom: "", publishTo: "", title: { cz: "Nový program", en: "New programme" }, perex: { cz: "", en: "" }, mainImage: "", gallery: [],
    mainText: { cz: "", en: "" }, targetGroup: { cz: "", en: "" }, location: { cz: "", en: "" }, duration: { cz: "", en: "" },
    capacity: { cz: "", en: "" }, age: { cz: "", en: "" }, price: { cz: "", en: "" }, season: { cz: "", en: "" }, materials: { cz: "", en: "" },
    blocks: [], ctas: [], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
  });

  return (
    <>
      {/* ===== HLAVNÍ STRÁNKA ===== */}
      <Section title="Vzdělávání — hlavní stránka" testid="admin-section-edu-page">
        <h3 className="adm-subhead">Úvodní blok (hero)</h3>
        <TextField label="Badge (malý štítek)" value={edu.hero?.badge} onChange={(v) => setE(["hero", "badge"], v)} />
        <TextField label="Titulek (HTML, např. <br>)" value={edu.hero?.title} onChange={(v) => setE(["hero", "title"], v)} multiline />
        <TextField label="Podtitulek" value={edu.hero?.sub} onChange={(v) => setE(["hero", "sub"], v)} multiline />
        <ImageField label="Fotografie na pozadí" value={edu.hero?.bgImage} onChange={(v) => setE(["hero", "bgImage"], v)} password={password} testid="admin-edu-hero-bg" />

        <h3 className="adm-subhead">Úvodní text</h3>
        <TextField label="Nadřazený štítek" value={edu.intro?.label} onChange={(v) => setE(["intro", "label"], v)} />
        <TextField label="Nadpis (HTML)" value={edu.intro?.title} onChange={(v) => setE(["intro", "title"], v)} multiline />
        <TextField label="Text" value={edu.intro?.text} onChange={(v) => setE(["intro", "text"], v)} multiline />

        <h3 className="adm-subhead">Kde programy probíhají</h3>
        <TextField label="Štítek" value={edu.where?.label} onChange={(v) => setE(["where", "label"], v)} />
        <TextField label="Nadpis" value={edu.where?.title} onChange={(v) => setE(["where", "title"], v)} />
        <TextField label="Úvodní text" value={edu.where?.intro} onChange={(v) => setE(["where", "intro"], v)} multiline />
        <div className="adm-card">
          <div className="adm-card-head"><strong>Přijedeme za vámi</strong></div>
          <TextField label="Nadpis" value={edu.where?.atSchool?.title} onChange={(v) => setE(["where", "atSchool", "title"], v)} />
          <TextField label="Text" value={edu.where?.atSchool?.text} onChange={(v) => setE(["where", "atSchool", "text"], v)} multiline />
          <ImageField label="Fotografie" value={edu.where?.atSchool?.image} onChange={(v) => setE(["where", "atSchool", "image"], v)} password={password} />
        </div>
        <div className="adm-card">
          <div className="adm-card-head"><strong>Vyrazíme do přírody</strong></div>
          <TextField label="Nadpis" value={edu.where?.outdoors?.title} onChange={(v) => setE(["where", "outdoors", "title"], v)} />
          <TextField label="Text" value={edu.where?.outdoors?.text} onChange={(v) => setE(["where", "outdoors", "text"], v)} multiline />
          <ImageField label="Fotografie" value={edu.where?.outdoors?.image} onChange={(v) => setE(["where", "outdoors", "image"], v)} password={password} />
        </div>

        <h3 className="adm-subhead">Nadpis nabídky programů</h3>
        <TextField label="Štítek" value={edu.offer?.label} onChange={(v) => setE(["offer", "label"], v)} />
        <TextField label="Nadpis" value={edu.offer?.title} onChange={(v) => setE(["offer", "title"], v)} />
        <TextField label="Text" value={edu.offer?.text} onChange={(v) => setE(["offer", "text"], v)} multiline />

        <h3 className="adm-subhead">Přínosy programů (seznam)</h3>
        <TextField label="Nadpis seznamu" value={edu.benefits?.title} onChange={(v) => setE(["benefits", "title"], v)} />
        {(edu.benefits?.items || []).map((it, i) => (
          <div className="adm-image-row" key={i}>
            <div style={{ flex: 1 }}>
              <TextField label={`Bod #${i + 1}`} value={it} onChange={(v) => setE(["benefits", "items", i], v)} />
            </div>
            <button type="button" className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => mutate((e) => { e.benefits.items = e.benefits.items.filter((_, idx) => idx !== i); })}>×</button>
          </div>
        ))}
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => mutate((e) => { if (!e.benefits) e.benefits = { items: [] }; if (!e.benefits.items) e.benefits.items = []; e.benefits.items.push({ cz: "", en: "" }); })}>+ Přidat bod</button>

        <h3 className="adm-subhead">Závěrečné CTA „Máte zájem o spolupráci?“</h3>
        <TextField label="Nadpis" value={edu.collaboration?.title} onChange={(v) => setE(["collaboration", "title"], v)} />
        <TextField label="Text" value={edu.collaboration?.text} onChange={(v) => setE(["collaboration", "text"], v)} multiline />
        <TextField label="Text tlačítka" value={edu.collaboration?.btnLabel} onChange={(v) => setE(["collaboration", "btnLabel"], v)} />
        <PlainField label="Odkaz tlačítka (např. /kontakt)" value={edu.collaboration?.btnValue} onChange={(v) => setE(["collaboration", "btnValue"], v)} />
      </Section>

      {/* ===== KATEGORIE ===== */}
      <Section title="Vzdělávání — kategorie" testid="admin-section-edu-categories">
        <div className="adm-tip" style={{ marginBottom: 18 }}>Kategorie seskupují programy na stránce Vzdělávání. Pořadí měníte šipkami.</div>
        {categories.map((c, i) => (
          <div className="adm-card" key={c.id || i} data-testid={`admin-edu-category-${i}`}>
            <div className="adm-card-head">
              <strong>Kategorie #{i + 1}</strong>
              <MiniBtns
                onUp={() => mutate((e) => move(e.categories, i, -1))}
                onDown={() => mutate((e) => move(e.categories, i, 1))}
                onRemove={() => mutate((e) => { e.categories = e.categories.filter((_, idx) => idx !== i); })}
              />
            </div>
            <TextField label="Název" value={c.name} onChange={(v) => { setE(["categories", i, "name"], v); if (!c.slug) setE(["categories", i, "slug"], slugify(v?.cz)); }} />
            <PlainField label="Slug (URL)" value={c.slug} onChange={(v) => setE(["categories", i, "slug"], v)} />
            <TextField label="Popis" value={c.description} onChange={(v) => setE(["categories", i, "description"], v)} multiline />
            <ImageField label="Obrázek (volitelný)" value={c.image} onChange={(v) => setE(["categories", i, "image"], v)} password={password} />
            <Check label="Publikováno (zobrazit na webu)" checked={c.published !== false} onChange={(v) => setE(["categories", i, "published"], v)} testid={`admin-edu-category-pub-${i}`} />
          </div>
        ))}
        <button type="button" className="adm-btn adm-btn-ghost" data-testid="admin-add-edu-category" onClick={() => mutate((e) => e.categories.push(newCategory()))}>+ Přidat kategorii</button>
      </Section>

      {/* ===== PROGRAMY ===== */}
      <Section title="Vzdělávání — programy a workshopy" testid="admin-section-edu-programs">
        <div className="adm-tip" style={{ marginBottom: 18 }}>Každý program má vlastní detailní stránku na adrese /vzdelavani/[slug]. „Zobrazit na hlavní stránce“ = featured.</div>
        {programs.map((p, i) => (
          <details className="adm-card" key={p.id || i} data-testid={`admin-edu-program-${i}`}>
            <summary className="adm-card-head" style={{ cursor: "pointer" }}>
              <strong>{p.title?.cz || "Program"} · {STATUS_OPTIONS.find((s) => s.value === p.status)?.label || p.status}{p.featured ? " · hlavní" : ""}</strong>
            </summary>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <MiniBtns
                onUp={() => mutate((e) => move(e.programs, i, -1))}
                onDown={() => mutate((e) => move(e.programs, i, 1))}
                onRemove={() => { if (window.confirm("Opravdu odstranit tento program?")) mutate((e) => { e.programs = e.programs.filter((_, idx) => idx !== i); }); }}
              />
            </div>

            <h3 className="adm-subhead">Základní informace</h3>
            <TextField label="Název" value={p.title} onChange={(v) => { setE(["programs", i, "title"], v); if (!p.slug) setE(["programs", i, "slug"], slugify(v?.cz)); }} testid={`admin-edu-program-title-${i}`} />
            <div className="adm-image-row">
              <div style={{ flex: 1 }}>
                <PlainField label="Slug (URL: /vzdelavani/…)" value={p.slug} onChange={(v) => setE(["programs", i, "slug"], v)} testid={`admin-edu-program-slug-${i}`} />
              </div>
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" style={{ alignSelf: "flex-end", marginBottom: 18 }} onClick={() => setE(["programs", i, "slug"], slugify(p.title?.cz))}>Generovat</button>
            </div>
            <SelectField label="Kategorie" value={p.categoryId} onChange={(v) => setE(["programs", i, "categoryId"], v)} options={catOptions} testid={`admin-edu-program-cat-${i}`} />
            <TextField label="Krátký perex (na kartě)" value={p.perex} onChange={(v) => setE(["programs", i, "perex"], v)} multiline />

            <h3 className="adm-subhead">Obsah</h3>
            <TextField label="Hlavní text" value={p.mainText} onChange={(v) => setE(["programs", i, "mainText"], v)} multiline />
            <label className="adm-label">Obsahové bloky</label>
            {(p.blocks || []).map((b, bi) => (
              <div className="adm-card" key={b.id || bi}>
                <div className="adm-card-head">
                  <strong>Blok #{bi + 1} · {b.type === "image" ? "obrázek" : "text"}</strong>
                  <MiniBtns
                    onUp={() => mutate((e) => move(e.programs[i].blocks, bi, -1))}
                    onDown={() => mutate((e) => move(e.programs[i].blocks, bi, 1))}
                    onRemove={() => mutate((e) => { e.programs[i].blocks = e.programs[i].blocks.filter((_, idx) => idx !== bi); })}
                  />
                </div>
                <TextField label="Nadpis bloku (volitelný)" value={b.heading} onChange={(v) => setE(["programs", i, "blocks", bi, "heading"], v)} />
                {b.type === "image" ? (
                  <>
                    <ImageField label="Obrázek" value={b.image} onChange={(v) => setE(["programs", i, "blocks", bi, "image"], v)} password={password} />
                    <TextField label="Popisek" value={b.caption} onChange={(v) => setE(["programs", i, "blocks", bi, "caption"], v)} />
                  </>
                ) : (
                  <TextField label="Text" value={b.text} onChange={(v) => setE(["programs", i, "blocks", bi, "text"], v)} multiline />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => mutate((e) => e.programs[i].blocks.push({ id: "b-" + uid(), type: "text", heading: { cz: "", en: "" }, text: { cz: "", en: "" }, image: "", caption: { cz: "", en: "" } }))}>+ Text blok</button>
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => mutate((e) => e.programs[i].blocks.push({ id: "b-" + uid(), type: "image", heading: { cz: "", en: "" }, text: { cz: "", en: "" }, image: "", caption: { cz: "", en: "" } }))}>+ Obrázkový blok</button>
            </div>

            <h3 className="adm-subhead">Praktické informace</h3>
            <TextField label="Cílová skupina" value={p.targetGroup} onChange={(v) => setE(["programs", i, "targetGroup"], v)} />
            <TextField label="Věk / ročník" value={p.age} onChange={(v) => setE(["programs", i, "age"], v)} />
            <TextField label="Místo konání" value={p.location} onChange={(v) => setE(["programs", i, "location"], v)} />
            <TextField label="Délka programu" value={p.duration} onChange={(v) => setE(["programs", i, "duration"], v)} />
            <TextField label="Kapacita" value={p.capacity} onChange={(v) => setE(["programs", i, "capacity"], v)} />
            <TextField label="Cena" value={p.price} onChange={(v) => setE(["programs", i, "price"], v)} />
            <TextField label="Sezóna / termín" value={p.season} onChange={(v) => setE(["programs", i, "season"], v)} />
            <TextField label="Pomůcky" value={p.materials} onChange={(v) => setE(["programs", i, "materials"], v)} />

            <h3 className="adm-subhead">Fotografie</h3>
            <ImageField label="Hlavní fotografie" value={p.mainImage} onChange={(v) => setE(["programs", i, "mainImage"], v)} password={password} testid={`admin-edu-program-img-${i}`} />
            <label className="adm-label">Galerie</label>
            {(p.gallery || []).map((g, gi) => (
              <div className="adm-image-row" key={gi}>
                <ImageFieldInline value={g} onChange={(v) => setE(["programs", i, "gallery", gi], v)} password={password} ImageField={ImageField} />
                <button type="button" className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => mutate((e) => { e.programs[i].gallery = e.programs[i].gallery.filter((_, idx) => idx !== gi); })}>×</button>
              </div>
            ))}
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => mutate((e) => { if (!e.programs[i].gallery) e.programs[i].gallery = []; e.programs[i].gallery.push(""); })}>+ Přidat fotografii</button>

            <h3 className="adm-subhead">Tlačítka a odkazy (CTA)</h3>
            {(p.ctas || []).map((c, ci) => (
              <div className="adm-card" key={c.id || ci}>
                <div className="adm-card-head">
                  <strong>CTA #{ci + 1}</strong>
                  <MiniBtns
                    onUp={() => mutate((e) => move(e.programs[i].ctas, ci, -1))}
                    onDown={() => mutate((e) => move(e.programs[i].ctas, ci, 1))}
                    onRemove={() => mutate((e) => { e.programs[i].ctas = e.programs[i].ctas.filter((_, idx) => idx !== ci); })}
                  />
                </div>
                <TextField label="Text tlačítka" value={c.label} onChange={(v) => setE(["programs", i, "ctas", ci, "label"], v)} />
                <SelectField label="Typ akce" value={c.type} onChange={(v) => setE(["programs", i, "ctas", ci, "type"], v)} options={CTA_TYPES} />
                {c.type === "file" ? (
                  <DocField label="Soubor" value={c.value} onChange={(url) => setE(["programs", i, "ctas", ci, "value"], url)} uploadDoc={uploadDoc} testid={`admin-edu-cta-file-${i}-${ci}`} />
                ) : (
                  <PlainField
                    label={c.type === "external" ? "Externí URL (https://…)" : c.type === "anchor" ? "Kotva (např. nabidka-programu)" : "Interní odkaz (např. /vzdelavani/slug nebo /kontakt)"}
                    value={c.value}
                    onChange={(v) => setE(["programs", i, "ctas", ci, "value"], v)}
                  />
                )}
              </div>
            ))}
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => mutate((e) => { if (!e.programs[i].ctas) e.programs[i].ctas = []; e.programs[i].ctas.push({ id: "cta-" + uid(), label: { cz: "Rezervovat", en: "Book" }, type: "external", value: "" }); })}>+ Přidat tlačítko</button>

            <h3 className="adm-subhead">Materiály ke stažení (přílohy)</h3>
            {(p.attachments || []).map((a, ai) => (
              <div className="adm-card" key={a.id || ai}>
                <div className="adm-card-head">
                  <strong>Příloha #{ai + 1}</strong>
                  <MiniBtns
                    onUp={() => mutate((e) => move(e.programs[i].attachments, ai, -1))}
                    onDown={() => mutate((e) => move(e.programs[i].attachments, ai, 1))}
                    onRemove={() => mutate((e) => { e.programs[i].attachments = e.programs[i].attachments.filter((_, idx) => idx !== ai); })}
                  />
                </div>
                <TextField label="Název" value={a.name} onChange={(v) => setE(["programs", i, "attachments", ai, "name"], v)} />
                <PlainField label="Typ (např. PDF, pracovní list)" value={a.type} onChange={(v) => setE(["programs", i, "attachments", ai, "type"], v)} />
                <DocField label="Soubor / URL" value={a.url} onChange={(url) => setE(["programs", i, "attachments", ai, "url"], url)} uploadDoc={uploadDoc} testid={`admin-edu-att-file-${i}-${ai}`} />
              </div>
            ))}
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => mutate((e) => { if (!e.programs[i].attachments) e.programs[i].attachments = []; e.programs[i].attachments.push({ id: "att-" + uid(), name: { cz: "", en: "" }, type: "PDF", url: "" }); })}>+ Přidat přílohu</button>

            <h3 className="adm-subhead">Publikování</h3>
            <SelectField label="Stav" value={p.status} onChange={(v) => setE(["programs", i, "status"], v)} options={STATUS_OPTIONS} testid={`admin-edu-program-status-${i}`} />
            <Check label="Zobrazit na hlavní stránce Vzdělávání (featured)" checked={p.featured} onChange={(v) => setE(["programs", i, "featured"], v)} testid={`admin-edu-program-featured-${i}`} />
            <DateField label="Publikovat od (volitelné)" value={p.publishFrom} onChange={(v) => setE(["programs", i, "publishFrom"], v)} testid={`admin-edu-program-from-${i}`} />
            <DateField label="Publikovat do (volitelné)" value={p.publishTo} onChange={(v) => setE(["programs", i, "publishTo"], v)} testid={`admin-edu-program-to-${i}`} />

            <h3 className="adm-subhead">SEO (volitelné)</h3>
            <TextField label="SEO titulek" value={p.seo?.title} onChange={(v) => setE(["programs", i, "seo", "title"], v)} />
            <TextField label="SEO popis" value={p.seo?.description} onChange={(v) => setE(["programs", i, "seo", "description"], v)} multiline />
          </details>
        ))}
        <button type="button" className="adm-btn adm-btn-ghost" data-testid="admin-add-edu-program" onClick={() => mutate((e) => e.programs.push(newProgram()))}>+ Přidat program</button>
      </Section>
    </>
  );
}

// Inline single-image editor reusing the shared ImageField (URL + upload + thumb).
function ImageFieldInline({ value, onChange, password, ImageField }) {
  return (
    <div style={{ flex: 1 }}>
      <ImageField label="" value={value} onChange={onChange} password={password} />
    </div>
  );
}
