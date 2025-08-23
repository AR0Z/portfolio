import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const messages = { en, fr };

const TranslationContext = createContext({
  t: (key) => key,
  lang: "fr",
  setLang: (_lang) => {},
});

export const TranslationProvider = ({ children }) => {
  const defaultLang =
    localStorage.getItem("lang") || localStorage.setItem("lang", "en") || "fr";

  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key) => messages[lang][key] || key;

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
