import { useTranslation } from "../../TranslationContext.jsx";
import "./style.scss";
import projectsDataRaw from "../../locales/projects.json";
import { useLocation } from "preact-iso";

const projectsData: Array<{ id: string; [key: string]: any }> = Array.isArray(
  projectsDataRaw
)
  ? projectsDataRaw
  : [];

import { NotFound } from "../_404.js";

export function Project({ id }) {
  const { lang } = useTranslation();

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="project">
      <h1>{project.title[lang]}</h1>
      <p>{project.description[lang]}</p>
    </div>
  );
}
