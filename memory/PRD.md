# Atelier VENKU. — Web

## Original problem statement
Postavit responzivní web (mobile-first) z dodaných HTML/textových podkladů + logo. Mockovaný kontaktní formulář + mailto, jazyková mutace CZ/EN, kurátorované zahradní fotografie.
**Doplněno (2026-02-07):** Pořadí komponent v Nabídce — fotka vlevo přes celý blok. Jednoduchý admin na `/admin` chráněný heslem pro úpravu veškerého obsahu.

## Architecture
- **Stack:** React (CRA) frontend + FastAPI backend + MongoDB (od 2026-02-07).
- **Routing:** react-router-dom v7 (BrowserRouter).
- **Public pages:** `/`, `/portfolio`, `/nabidka`, `/o-atelieru`, `/vzdelavani`, `/kontakt`.
- **Admin page:** `/admin` (chráněno heslem, Nav skryt).
- **Content data flow:**
  - `src/data/content.js` = výchozí (default) content (CZ/EN slovník, projekty, fotky URL).
  - `ContentContext` (`src/contexts/ContentContext.jsx`) načítá `GET /api/content` při startu, deep-merguje s defaulty a poskytuje všem stránkám přes `useContent()` hook.
  - Backend ukládá content jako jeden JSON dokument v MongoDB collection `site_content` (_id="main").
- **Lang context:** `LangProvider` v `src/contexts/LangContext.jsx` (CZ/EN switcher v navigaci).
- **Styling:** custom CSS v `src/App.css` + `src/pages/Admin.css` (mobile-first).
- **Logos:** transparent PNG v `public/logos/`.
- **Form:** Kontaktní formulář mockovaný (setTimeout) + mailto/tel odkazy.

## Backend API
- `GET /api/content` → uložený obsah (`{}` pokud admin nic neuložil)
- `POST /api/admin/login` → ověření hesla
- `PUT /api/admin/content` → uložení obsahu (header `X-Admin-Password`)
- `ADMIN_PASSWORD` v `/app/backend/.env` (default `venku-admin-2026`)

## Admin features
- Login se sessionStorage (token = heslo)
- Sekce: Navigace, Úvod, Portfolio (CRUD projektů + galerie), Nabídka (intro + 4 kroky), O ateliéru, Vzdělávání (programy), Kontakt + popisky formuláře
- Pro každý text dvě pole CZ/EN, pro fotky URL + náhled
- Sticky save bar dole, success/error toast
- Logout button
- Vizuálně sladěno s frontendem (kremový podklad, zelené akcenty, Montserrat font)

## Implemented (2026-02-06)
- Mobile-first layout (≥700, ≥1024 breakpoints).
- Všechny stránky portfolia, nabídka, o ateliéru, vzdělávání, kontakt.
- CZ/EN switcher.
- Netlify deployment config (netlify.toml + _redirects).

## Implemented (2026-02-07)
- **Nabídka layout fix:** fotka přesunuta na první pozici vlevo, plní celou výšku bloku (img.height = item.height ±2px). Pořadí: image → number → content → detail.
- **Admin CMS:** kompletní jednoduché CMS rozhraní na `/admin` chráněné heslem `venku-admin-2026`.
- **Backend:** FastAPI endpoints pro content + admin auth.
- **ContentContext:** všechny stránky (Nav, Footer, Home, Portfolio, Nabidka, OAtelieru, Vzdelavani, Kontakt) refaktorovány aby používaly content z backendu.
- **Testy:** `/app/backend/tests/test_admin_content.py` 8/8 pass; frontend layout 100% pass (iter_5).

## Implemented (2026-02-07, druhá várka)
- **Object Storage upload:** Admin může nahrávat fotky přímo přes `Nahrát` tlačítko u každého image fieldu (i v galerii). Soubory ukládány do Emergent Object Storage, servírované přes `/api/files/{path}`. Endpoint `POST /api/admin/upload` (multipart/form-data, X-Admin-Password). Allowed types: jpeg/png/webp/gif, max 10 MB.
- **SEO:** `react-helmet-async` + `<SEO />` komponenta pro per-page title/description/canonical/OG/Twitter cards. Lokalizace lang attr (cs/en) podle aktuálního jazyka.
- **sitemap.xml** + **robots.txt** v `/app/frontend/public/` (Disallow /admin).
- **noindex** na /admin route.
- **Testy:** 9/9 backend upload + SEO. 100% frontend SEO checks (po fixu duplicate description).

## Color palette
- Green `#607466`, Mint `#c3dac3`, Lavender `#e2a9f1`, Cream `#f7f4ef`, Black `#0d0d0d`

## Backlog / Next
- P1: Skutečné odesílání emailů (Resend/SendGrid) pro kontaktní formulář
- P2: Cookie banner (GDPR)
- P2: Audit log změn obsahu v adminu
- P2: Správa uploadovaných souborů v adminu (seznam, soft-delete)
- P2: Nastavit reálnou doménu v `SITE_URL` (`/app/frontend/src/components/SEO.jsx`) po nasazení
- P3: Více admin uživatelů + role
- P3: Streaming upload (snížení paměti při velkých souborech)
