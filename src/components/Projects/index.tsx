import { useTranslation } from "@/TranslationContext";
import "./style.scss";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section className="Projects">
      <div className="Projects__Title">
        <span>{t("projects-first")}</span>
        <span>{t("projects-second")}</span>
        <span>{t("projects-third")}</span>
      </div>

      <div className="Projects__Container">
        <span>{t("projects-soon")}</span>
      </div>
    </section>
  );
}
