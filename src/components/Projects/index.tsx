import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import projectsDataRaw from "@/locales/projects.json";



export default function Projects() {
  const { t, lang } = useTranslation();

  const projectsData: Array<{ id: string; [key: string]: any }> = Array.isArray(
  projectsDataRaw
)
  ? projectsDataRaw
  : [];

  return (
    <section className="Projects">
      <div className="Projects__Title">
        <span>{t("projects-first")}</span>
        <span>{t("projects-second")}</span>
        <span>{t("projects-third")}</span>
      </div>

      <div className="Projects__Container">
        {projectsData.map((project) => (
          <div key={project.id} className="Projects__Item">
            <h3 className={"Projects__Item__Title"}>{project.title[lang]}</h3>

            <a href={`project/${project.id}`} className={"Projects__Item__Link"}>
              <img src={project.image} alt="" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
