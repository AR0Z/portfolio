import { useTranslation } from "@/TranslationContext.jsx";
import { useLocation } from "preact-iso";

export function Header() {
  const { lang, setLang } = useTranslation();
  const location = useLocation();
  
  return (
    <header>
      <nav className="nav">
        {location.path !== "/" ? (
          <span onClick={() => location.route("/")}>{"<"}</span>
        ) : <span></span>}
        <div className={`lang ${lang}-active`}>
          <span className={lang == "fr" ? "selector active" : "selector"} onClick={() => setLang("fr")}>FR</span>
          <span className="separator">|</span>
          <span className={lang == "en" ? "selector active" : "selector"} onClick={() => setLang("en")}>EN</span>
        </div>
      </nav>
    </header>
  );
}
