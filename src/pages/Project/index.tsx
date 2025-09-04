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
    const titleEl = document.querySelector(".project__title__text");
    const subtitleEl = document.querySelector(".project__title__subtitle");
    const contentEl = document.querySelector(".project__content");

    let splitTitle, splitSubtitle, splitContent;

    // --- TITRE H1 ---
    if (titleEl) {
      if ((titleEl as any)._gsapSplitText)
        (titleEl as any)._gsapSplitText.revert();
      titleEl.textContent = project.title[lang] || project.title["fr"];
      splitTitle = SplitText.create(titleEl, { type: "words" });
      gsap.from(splitTitle.words, {
        x: 100,
        opacity: 0,
        stagger: 0.01,
        duration: 1,
      });
    }

    // --- SOUS-TITRE H2 ---
    if (subtitleEl) {
      if ((subtitleEl as any)._gsapSplitText)
        (subtitleEl as any)._gsapSplitText.revert();
      subtitleEl.textContent = project.type[lang] || project.type["fr"];
      splitSubtitle = SplitText.create(subtitleEl, { type: "chars" });
      gsap.from(splitSubtitle.chars, {
        x: -100,
        opacity: 0,
        stagger: 0.01,
        duration: 1,
      });
    }

    // --- CONTENU ---
    if (contentEl) {
      if ((contentEl as any)._gsapSplitText)
        (contentEl as any)._gsapSplitText.revert();
      contentEl.innerHTML = ""; 
      if (project.collaborator && project.collaborator.length > 0) {
        const collabHTML = `<div class="project__collaborator">${t(
          "collaborateur"
        )} ${project.collaborator
          .map(
            (c, i) =>
              `<a href="${c.link}" target="_blank" rel="noopener noreferrer">@${
                c.name
              }</a>${i !== project.collaborator.length - 1 ? ", " : ""}`
          )
          .join("")}</div>`;
        contentEl.innerHTML = collabHTML;
      }

      if (project.sources && project.sources.length > 0) {
        const sourceHTML = `<div class="project__source">${t(
          "source"
        )} ${project.sources
          .map(
            (s, i) =>
              `<a href="${s.link}" target="_blank" rel="noopener noreferrer">${
                s.name
              }</a>${i !== project.sources.length - 1 ? ", " : ""}`
          )
          .join("")}</div>`;
        contentEl.innerHTML += sourceHTML;
      }

      contentEl.innerHTML +=
        project.description[lang] || project.description["fr"];
      splitContent = SplitText.create(contentEl, { type: "words" });
      gsap.from(splitContent.words, {
        y: 100,
        opacity: 0,
        stagger: 0.01,
        scrollTrigger: {
          trigger: contentEl,
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none none",
        },
      });
    }

    // --- CLEANUP ---
    return () => {
      splitTitle?.revert();
      splitSubtitle?.revert();
      splitContent?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lang, project]);

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
          dangerouslySetInnerHTML={{
            __html: project.description[lang] || project.description["fr"],
          }}
        />
      </div>
    </section>
  );
}
