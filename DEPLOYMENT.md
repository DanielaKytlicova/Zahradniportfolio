# Atelier Venku — návod nasazení (Hybrid: Netlify + Railway)

Tento dokument popisuje nasazení **frontendu na Netlify** a **backendu na Railway**.

## Architektura

```
┌─────────────────────────────┐         ┌─────────────────────────────┐
│  Netlify  (frontend)        │  HTTPS  │  Railway  (backend)         │
│  https://zahradni…app       │ ──────▶ │  https://venku-api…app      │
│  React SPA + sitemap.xml    │   API   │  FastAPI + MongoDB + Storage│
└─────────────────────────────┘         └─────────────────────────────┘
```

---

## 1. Backend na Railway

### 1.1 Vytvoření projektu

1. Jděte na [railway.app](https://railway.app/) → *Start a New Project*.
2. Zvolte **Deploy from GitHub repo** → vyberte tento repozitář.
3. Railway automaticky najde `/app/backend/Procfile` a `requirements.txt`.
   - Pokud Railway nezvolí podsložku správně, otevřete *Settings → Service → Root Directory* a nastavte `backend`.

### 1.2 MongoDB

V Railway projektu klikněte **+ New → Database → MongoDB**. Po vytvoření:
1. Otevřete MongoDB službu → *Variables* → najděte `MONGO_URL` (interní) nebo `MONGO_PUBLIC_URL`.
2. Tuto hodnotu si zkopírujte do *Backend service → Variables → MONGO_URL*.

> Alternativa: použít MongoDB Atlas (free M0 cluster). Connection string vložte do `MONGO_URL`.

### 1.3 Environment variables (Backend service → Variables)

Nastavte tyto proměnné na Railway u backend služby:

| Klíč | Hodnota | Poznámka |
|---|---|---|
| `MONGO_URL` | `mongodb://…` | z Railway MongoDB nebo Atlas |
| `DB_NAME` | `venku` | název databáze |
| `ADMIN_PASSWORD` | (vaše heslo) | např. silné heslo místo defaultu |
| `EMERGENT_LLM_KEY` | `sk-emergent-3Cb86A0A851B6477fF` | Emergent storage key (ze stávajícího `.env`) |
| `CORS_ORIGINS` | `https://zahradniportfolio.netlify.app,https://ateliervenku.cz` | čárkou oddělené domény, kde běží frontend |

> **POZOR:** Neaktivujte `*` pro CORS v produkci.

### 1.4 Veřejná URL backendu

Po prvním buildu Railway přiřadí URL — *Settings → Networking → Generate Domain*.
Výsledek bude něco jako `https://venku-api-production.up.railway.app`. Tu si poznamenejte.

### 1.5 Test

Otevřete v prohlížeči:
- `https://<vaše-railway-url>/api/` → musí vrátit `{"message":"Atelier Venku API"}`
- `POST https://<vaše-railway-url>/api/admin/login` s `{"password":"<vaše ADMIN_PASSWORD>"}` → `{"ok":true}`

---

## 2. Frontend na Netlify

### 2.1 Environment variables

Netlify dashboard → *Site configuration → Environment variables → Add variable*:

| Klíč | Hodnota |
|---|---|
| `REACT_APP_BACKEND_URL` | `https://<vaše-railway-url>` (bez koncového `/`) |

### 2.2 Re-deploy

*Deploys → Trigger deploy → Clear cache and deploy site*. Build musí proběhnout znovu, protože `REACT_APP_BACKEND_URL` se zapisuje do JS bundlu při buildu.

### 2.3 Test

- `https://zahradniportfolio.netlify.app/` → veřejný web
- `https://zahradniportfolio.netlify.app/admin` → login formulář (heslo z `ADMIN_PASSWORD`)
- Po přihlášení zkuste nahrát fotku v adminu — měla by se zobrazit na webu po uložení.

---

## 3. Checklist před spuštěním

- [ ] Backend běží na Railway, `/api/` vrací 200
- [ ] MongoDB připojeno (test login fungoval)
- [ ] CORS_ORIGINS obsahuje Netlify URL i případnou vlastní doménu
- [ ] Netlify má `REACT_APP_BACKEND_URL`
- [ ] Re-deploy po nastavení env proběhl
- [ ] /admin v prohlížeči zobrazí login (ne prázdnou stránku)
- [ ] Test admin login → editace → upload obrázku → uložení → změna viditelná na webu

---

## 4. Vlastní doména (později)

Po napojení vlastní domény (např. `ateliervenku.cz`):

1. **Netlify:** *Domain management → Add custom domain*. Nastavte DNS A/CNAME záznamy podle pokynů.
2. **CORS na Railway:** přidejte novou doménu do `CORS_ORIGINS`.
3. **SEO config:** v souboru `frontend/src/components/SEO.jsx` upravte konstantu `SITE_URL` na novou doménu.
4. **Sitemap & robots:** v `frontend/public/sitemap.xml` a `robots.txt` přepište URL.
5. Push do GitHubu → Netlify se redeployuje.

---

## 5. Časté problémy

| Symptom | Příčina | Řešení |
|---|---|---|
| `/admin` je prázdná stránka | Build neobsahuje admin route | Push aktuální kód a re-deploy |
| Admin login: "Chyba spojení" | CORS / špatná `REACT_APP_BACKEND_URL` | Zkontrolovat env var + CORS_ORIGINS |
| Fotky se nahrají, ale nezobrazí | `REACT_APP_BACKEND_URL` chybí v Netlify | Doplnit + re-deploy s clear cache |
| 502 Bad Gateway na backendu | Storage init failed | Zkontrolovat `EMERGENT_LLM_KEY` |
| Backend padá při startu | MongoDB nedostupný | Zkontrolovat `MONGO_URL` v Railway |
