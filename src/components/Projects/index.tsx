import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import projectsDataRaw from "@/locales/projects.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "preact/hooks";

gsap.registerPlugin(ScrollTrigger);

const images = import.meta.glob(
  "@/assets/projects/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  }
);

export default function Projects() {
  const { t, lang } = useTranslation();

  const projectsData: Array<{ id: string; [key: string]: any }> = Array.isArray(
    projectsDataRaw
  )
    ? projectsDataRaw
    : [];

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    const x = isMobile ? 5 : 25; 

    // Batch pour tous les items
    ScrollTrigger.batch(".Projects__Item", {
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          const index = projectsData.findIndex(
            (p) =>
              el.querySelector("h3")?.textContent ===
              (p.title[lang] || p.title["fr"])
          );
          const direction = index % 2 === 0 ? -1 : 1; 

          gsap.fromTo(
            el,
            { x: `${x * direction}vw`, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom bottom",
              },
            }
          );
        });
      },
    });

    ScrollTrigger.refresh();
  }, [lang]);

  return (
    <section className="Projects">
      <div className="Projects__Title">
        <span>{t("projects-first")}</span>
        <span>{t("projects-second")}</span>
        <span>{t("projects-third")}</span>
      </div>

      <div className="Projects__Container">
        {projectsData.map((project) => {
          const imgSrc = images[
            `/src/assets/projects/${project.image}`
          ] as string;

          return (
            <div key={project.id} className="Projects__Item">
              <h3 className="Projects__Item__Title">
                {project.title[lang] || project.title["fr"]}
              </h3>
              <a
                href={`project/${project.id}`}
                className="Projects__Item__Link"
              >
                <img
                  src={imgSrc}
                  alt={project.title[lang] || project.title["fr"]}
                />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
