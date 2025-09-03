import renderToString from "preact-render-to-string";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "preact/compat";

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

gsap.registerPlugin(ScrollTrigger, SplitText);

export function Project({ id }) {
  const { lang, t } = useTranslation();

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return <NotFound />;
  }

  const imgSrc = images[`/src/assets/projects/${project.image}`] as string;

  useEffect(() => {
    let text = SplitText.create(".project__content", {
      type: "words",
    });

    let textTitle = SplitText.create(".project__title", {
      type: "chars",
    });

    gsap.from(text.words, {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.01,
      },
      scrollTrigger: {
        trigger: ".project__content",
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });

    gsap.from(textTitle.chars, {
      x: 100,
      opacity: 0,
      stagger: {
        amount: 1,
      },
    });
  }, []);

  // côté prerender
  const langSSR = typeof window === "undefined" ? "fr" : lang;

  const descriptionContent =
    project.description?.[langSSR] ||
    project.description?.["fr"] ||
    project.description?.["en"] ||
    "<em>Description manquante</em>";

  // Transformer le HTML en JSX "safe" pour prerender
  const descriptionJSX = renderToString(
    <p dangerouslySetInnerHTML={{ __html: descriptionContent }} />
  );

  return (
    <section className="project">
      <div className="project__title">
        <h1 className="project__title__text">
          {project.title[lang] || project.title["fr"]}
        </h1>
        <img className="project__title__image" src={imgSrc} alt="" />
        <h2 className="project__title__subtitle">
          {project.type[lang] || project.type["fr"]}
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

        <div
          className="project__description"
          dangerouslySetInnerHTML={{ __html: descriptionJSX }}
        />
      </div>
    </section>
  );
}
