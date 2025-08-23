import { useTranslation } from "../TranslationContext.jsx";
import { useLocation } from "preact-iso";

export function Header() {
  const { lang, setLang } = useTranslation();
  const location = useLocation();
  // Détermine le drapeau à afficher
  const currentFlagClass = lang === "fr" ? "fi fi-fr" : "fi fi-gb";

  // Fonction pour switcher la langue
  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <header>
      <nav className="nav">
        {location.path !== "/" ? (
          <span onClick={() => location.route("/")}>{"<"}</span>
        ) : <span></span>}
        <span
          className={currentFlagClass}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={toggleLang}
        />
      </nav>
    </header>
  );
}
