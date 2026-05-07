# Atelier Venku — návod nasazení (Hybrid: Netlify + Railway, BEZ MongoDB)

Frontend na **Netlify**, backend na **Railway** s perzistentním diskem (žádná externí databáze potřeba). Veškerý obsah webu se ukládá do souboru `content.json` na Railway disku.

```
┌─────────────────────────────┐         ┌─────────────────────────────┐
│  Netlify  (frontend)        │  HTTPS  │  Railway  (backend)         │
│  https://zahradni…app       │ ──────▶ │  FastAPI + JSON file        │
│                             │         │  + Volume /data             │
└─────────────────────────────┘         └─────────────────────────────┘
```

---

## 1. Push kódu na GitHub

V Emergent chatu klikněte **"Save to Github"**. Aktuální kód (s admin rozhraním + file storage backendem) se nahraje do vašeho GitHub repozitáře.

---

## 2. Backend na Railway

### 2.1 Vytvoření služby

1. [railway.app](https://railway.app/) → **Start a New Project** → **Deploy from GitHub repo** → vyberte tento repozitář.
2. *Settings → Service → Root Directory* → nastavte `backend`.
3. Railway najde `Procfile`, `requirements.txt`, `railway.json` a začne build.

### 2.2 Persistent Volume (DŮLEŽITÉ — bez něj data nepřežijí redeploy)

V backend service:
1. Záložka **Settings → Volumes**.
2. **+ New Volume**.
3. **Mount path:** `/data`
4. Velikost: **1 GB** (víc než dost — content.json má pár KB).
5. **Add volume**.

### 2.3 Environment variables

Backend service → záložka **Variables** → **+ New Variable** (zadejte všechny):

| Key | Value |
|---|---|
| `ADMIN_PASSWORD` | `venku-admin-2026` |
| `EMERGENT_LLM_KEY` | `sk-emergent-3Cb86A0A851B6477fF` |
| `CORS_ORIGINS` | `https://zahradniportfolio.netlify.app` |
| `DATA_DIR` | `/data` |

> Po nastavení klikněte **Deploy** (vpravo nahoře) — Railway redeployuje s novými proměnnými.

### 2.4 Veřejná URL

*Settings → Networking → Generate Domain*. Dostanete URL např.:
```
https://venku-api-production.up.railway.app
```

### 2.5 Test backendu

Otevřete v prohlížeči nebo `curl`:
```
GET https://venku-api-production.up.railway.app/api/    →  {"message":"Atelier Venku API"}
```

```
POST https://venku-api-production.up.railway.app/api/admin/login
Body (JSON): {"password":"venku-admin-2026"}
→  {"ok":true}
```

---

## 3. Frontend na Netlify

### 3.1 Environment variable

Netlify dashboard → *Site configuration → Environment variables → Add variable*:

| Key | Value |
|---|---|
| `REACT_APP_BACKEND_URL` | `https://venku-api-production.up.railway.app` |

> Bez koncového lomítka. Použijte přesnou URL z kroku 2.4.

### 3.2 Re-deploy

*Deploys → Trigger deploy → Clear cache and deploy site*.

(Clear cache je nutný — `REACT_APP_BACKEND_URL` se zapéká do JS bundlu při buildu.)

### 3.3 Test

1. `https://zahradniportfolio.netlify.app/` → veřejný web (texty z výchozího kódu, dokud admin nic neuloží).
2. `https://zahradniportfolio.netlify.app/admin` → login formulář.
3. Heslo: `venku-admin-2026` → editor.
4. Změňte cokoliv → **Uložit změny** → ✓ Obsah uložen.
5. Otevřete znovu veřejný web → změna je tam.
6. Vyzkoušejte **Nahrát** u libovolné fotky → soubor se uploadne, URL se vyplní, po Save je fotka na webu.

---

## 4. Checklist

- [ ] Push to GitHub proběhl
- [ ] Railway: backend service deploy proběhl (zelená tečka)
- [ ] Railway: Volume namontovaný na `/data`
- [ ] Railway: 4 env variables nastavené
- [ ] Railway: Generate Domain — máte URL
- [ ] Backend `/api/` vrací 200 a JSON
- [ ] Login curlem funguje
- [ ] Netlify: `REACT_APP_BACKEND_URL` doplněno
- [ ] Netlify: Trigger deploy with clear cache
- [ ] /admin v prohlížeči zobrazí login (ne prázdnou stránku)
- [ ] Login → editace → save → změna viditelná na webu
- [ ] Upload fotky funguje

---

## 5. Vlastní doména `ateliervenku.cz` (později)

Po napojení vlastní domény:

1. **Netlify:** *Domain management → Add custom domain*. Nastavte DNS A/CNAME záznamy podle pokynů.
2. **CORS na Railway:** přidejte novou doménu do `CORS_ORIGINS`:
   ```
   https://zahradniportfolio.netlify.app,https://ateliervenku.cz,https://www.ateliervenku.cz
   ```
3. **SEO:** v `frontend/src/components/SEO.jsx` upravte `SITE_URL = "https://ateliervenku.cz"`.
4. **Sitemap & robots:** v `frontend/public/sitemap.xml` a `robots.txt` přepište URL.
5. Push do GitHubu → Netlify auto-redeploy.

---

## 6. Časté problémy

| Symptom | Příčina | Řešení |
|---|---|---|
| `/admin` je prázdná stránka | Build neobsahuje admin route | Push aktuální kód, redeploy s clear cache |
| Admin login: "Chyba spojení" | CORS nebo špatné `REACT_APP_BACKEND_URL` | Zkontrolovat Netlify env + `CORS_ORIGINS` na Railway |
| Po uložení v adminu data zmizí po redeployi | Volume nenamontovaný | Settings → Volumes → mount na `/data` + `DATA_DIR=/data` |
| Fotka uploadne, ale nezobrazí se | `REACT_APP_BACKEND_URL` chybí v Netlify | Doplnit + clear cache deploy |
| 502 Bad Gateway na uploadu | Storage init failed | Zkontrolovat `EMERGENT_LLM_KEY` v Railway env |
| Backend padá při startu | Chybějící env nebo závislost | Railway → Deployments → View logs |

---

## 7. Zálohování (volitelné)

`content.json` je obyčejný soubor, takže:
- **Stáhnutí zálohy:** `curl https://venku-api…/api/content > content-zaloha.json`
- **Obnova:** PUT request s tímto JSONem na `/api/admin/content`

Doporučuju jednou za čas stáhnout, uložit do Drive/iCloud — máte tak vlastní záložku obsahu.
