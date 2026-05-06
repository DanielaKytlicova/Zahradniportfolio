import { createContext, useContext, useState, useCallback } from "react";

const LangContext = createContext({ lang: "cz", setLang: () => {}, t: (o) => "" });

export function LangProvider({ children }) {
  const [lang, setLang] = useState("cz");
  const t = useCallback(
    (obj) => (obj && (obj[lang] || obj.cz)) || "",
    [lang]
  );
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
