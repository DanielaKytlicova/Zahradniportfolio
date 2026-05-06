# Atelier VENKU. — Web

## Original problem statement
Postavit web ze souboru txt (celá prompt) a High-fidelity HTML + přiložený vizuál loga. Implementovat a postavit responzivní web (mobile-first).

## Architecture
- **Stack:** React (CRA) — frontend-only static site, no backend.
- **Routing:** react-router-dom v7 (BrowserRouter).
- **Pages:** `/`, `/portfolio`, `/nabidka`, `/o-atelieru`, `/vzdelavani`, `/kontakt`.
- **Content separation:** `src/data/content.js` exports CZ/EN translation objects, projects[], services list and education programs — admin-ready (movable to JSON / CMS later).
- **Lang context:** `LangProvider` in `src/contexts/LangContext.jsx` with CZ/EN switcher in nav.
- **Styling:** custom CSS in `src/App.css` (mobile-first), tailwind base reset only.
- **Logos:** Provided logos converted to transparent PNG (`public/logos/venku-light.png`, `venku-dark.png`).
- **Form:** mocked submit on Kontakt page; mailto + tel links to email/phone.

## Implemented (2026-02-06)
- Mobile-first responsive layout (≥700, ≥1024 breakpoints).
- Home: fullscreen hero (real garden photo) + "Zobrazit portfolio" + footer only.
- Portfolio: 6 projects, click to expand inline detail with text + 5-photo gallery.
- Nabídka: 4 process steps (01–04) + illustrative photo on right side of each row + CTA band.
- O ateliéru: portrait + 2-col layout with philosophy quote.
- Vzdělávání (renamed from "děti" sub-item, now main menu): playful soft tone, Cormorant Garamond serif, 3 program cards with lucide-react icons.
- Kontakt: mailto/tel links + mocked contact form with success state.
- CZ/EN language switcher (works on all texts).
- Mobile hamburger menu with full-screen overlay.

## Color palette (per brief)
- Green `#607466`
- Mint `#c3dac3`
- Lavender accent `#e2a9f1`
- Cream `#f7f4ef`, Black `#0d0d0d`

## Backlog / Next
- P1: Replace Unsplash photos with real Atelier Venku photography (admin will edit `data/content.js`)
- P1: Move content to small Node-driven CMS or markdown files for non-dev edits
- P2: Real e-mail sending (Resend/SendGrid) for the contact form
- P2: SEO meta tags per page, sitemap, OG image
- P2: Cookie banner (GDPR)
