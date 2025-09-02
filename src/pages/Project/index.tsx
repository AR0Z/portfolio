import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import projectsDataRaw from "@/locales/projects.json";
const images = import.meta.glob("@/assets/projects/*.png", {
  eager: true,
  import: "default",
});

const projectsData: Array<{ id: string; [key: string]: any }> = Array.isArray(
  projectsDataRaw
)
  ? projectsDataRaw
  : [];

import { NotFound } from "../404/index.js";

export function Project({ id }) {
  const { lang, t } = useTranslation();

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return <NotFound />;
  }

  const imgSrc = images[`/src/assets/projects/${project.image}`] as string;
  const langSSR = typeof window === "undefined" ? "fr" : lang;

  const description =
    project.description?.[langSSR] ||
    project.description?.["fr"] ||
    project.description?.["en"] ||
    "Description manquante";

  return (
    <section className="project">
      <div className="project__title">
        <h1 className="project__title__text">
          {project.title[lang] || project.title["en"]}
        </h1>
        <img className="project__title__image" src={imgSrc} alt="" />
        <h2 className="project__title__subtitle">
          {project.type[lang] || project.type["en"]}
        </h2>
      </div>
      <div className="project__content">
        {project.collaborator && project.collaborator.length > 0 && (
          <div className="project__collaborator">
            {t("collaborateur")}
            {project.collaborator.map((c) => (
              <>
                <a
                  key={c.name}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{c.name}
                </a>
                {project.collaborator.indexOf(c) !==
                  project.collaborator.length - 1 && ", "}
              </>
            ))}
          </div>
        )}
        {project.sources && project.sources.length > 0 && (
          <div className="project__source">
            {t("source")}
            {project.sources.map((source) => (
              <>
                <a
                  key={source.name}
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.name}
                </a>
                {project.sources.indexOf(source) !==
                  project.sources.length - 1 && ", "}
              </>
            ))}
          </div>
        )}

        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </section>
  );
}
