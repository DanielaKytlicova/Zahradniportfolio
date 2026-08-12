# PRD — Atelier Venku: Sekce Vzdělávání (CMS)

## Původní zadání
Kompletně přepracovat `/vzdelavani` na atelier-venku.cz a přidat systém dynamických detailů programů + jejich správu v existujícím `/admin`. Zachovat vizuální identitu, nezasahovat do zbytku webu, nepřepsat úpravy adminu na živém webu.

## Architektura (existující, znovupoužitá)
- Frontend: React (CRA/craco), react-router, react-helmet-async. Obsah přes `ContentContext` (fetch `/api/content`, deep-merge nad defaulty v `data/content.js`).
- Backend: FastAPI. Obsah = JEDEN JSON blob v souboru `DATA_DIR/content.json` (ne MongoDB). Admin = jedno heslo (`ADMIN_PASSWORD`). Média = Emergent object storage (`storage.py`).
- i18n: `{cz,en}` + `t()` z `LangContext`.

## Datový model (nové, klíč `edu` — nekoliduje s uloženými daty adminu)
`edu = { hero, intro, where{atSchool,outdoors}, offer, benefits, collaboration, categories[], programs[] }`
- `categories[]`: id, slug, name, description, image, order, published
- `programs[]`: id, slug, categoryId, status(published|draft|hidden), featured, order, publishFrom, publishTo, title, perex, mainImage, gallery[], mainText, targetGroup, age, location, duration, capacity, price, season, materials, blocks[]{type text|image}, ctas[]{type internal|external|file|anchor}, attachments[], seo

## Hotovo (2026-08-12)
- Veřejná `/vzdelavani`: hero, intro, „Kde programy probíhají“, nabídka programů seskupená dle kategorií, prominentní blok Škola v přírodě, přínosy, zachované CTA „Máte zájem o spolupráci?“.
- Dynamický detail `/vzdelavani/[slug]` (jedna šablona pro edukační programy, workshopy i školu v přírodě). Prázdná pole se nezobrazují.
- Znovupoužitelné komponenty: `ProgramCard`, `CtaButton` (4 typy CTA), utils `edu.js` (publish/featured/sezónní logika).
- Admin: `EduEditor` uvnitř stávajícího `/admin` — správa kategorií i programů (obsahové bloky, galerie, CTA, přílohy, stav, featured, publikace OD–DO, řazení ↑/↓). Upload obrázků i souborů (PDF) přes object storage (`/api/admin/upload`, `/api/admin/upload-doc`).
- Naplněno výchozím obsahem z PDF: 3 edukační programy, 1 škola v přírodě, 2 adventní workshopy; 3 kategorie.

## Testy
Backend 10/10, veřejný frontend 12/12, admin E2E 8/8 (iteration_7, iteration_8). Bez regrese na ostatních stránkách.

## Bezpečnost nasazení (DŮLEŽITÉ)
- Změny jsou pouze v kódu + nový klíč `edu` v defaultech. Živé úpravy adminu žijí v perzistentním `content.json` (Railway volume `/data`) a `deepMerge` je zachovává.
- Ostatní sekce (home/portfolio/nabidka/about/kontakt/nav/footer) kód nebyl měněn → živá data zůstávají.

## Backlog / P1–P2
- P2: rozdělit `Admin.jsx` do per-sekce komponent.
- P2: mazání souborů z object storage (nyní bez delete API).
- P2: ukládat do `content.json` jen rozdíly místo celého blobu.
