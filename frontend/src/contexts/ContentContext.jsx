import { createContext, useContext, useEffect, useState } from "react";
import * as defaults from "../data/content";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

// Build a plain default object that mirrors all named exports of content.js
const defaultContent = {
  HERO_BG: defaults.HERO_BG,
  nav: defaults.nav,
  home: defaults.home,
  projects: defaults.projects,
  services: defaults.services,
  processList: defaults.processList,
  about: defaults.about,
  vzdelavani: defaults.vzdelavani,
  edu: defaults.edu,
  kontakt: defaults.kontakt,
};

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// Deep-merge: arrays in `b` fully replace arrays in `a`.
function deepMerge(a, b) {
  if (b === undefined) return a;
  if (Array.isArray(b)) return b;
  if (isPlainObject(a) && isPlainObject(b)) {
    const out = { ...a };
    for (const k of Object.keys(b)) {
      out[k] = deepMerge(a[k], b[k]);
    }
    return out;
  }
  return b;
}

const ContentContext = createContext({ content: defaultContent, defaultContent, loaded: false });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${BACKEND}/api/content`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && Object.keys(data).length > 0) {
          setContent(deepMerge(defaultContent, data));
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, defaultContent, loaded }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext).content;
}

export function useContentMeta() {
  return useContext(ContentContext);
}
