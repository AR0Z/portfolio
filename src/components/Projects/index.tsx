import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import projectsDataRaw from "@/locales/projects.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "preact/hooks";

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

  const isMobile = window.innerWidth < 768;
  const startValue = isMobile ? "top 90%" : "top bottom";
  const endValue = isMobile ? "bottom 10%" : "bottom 80%";

  const x = isMobile ? -5 : -25;

  useEffect(() => {
    // Sélectionner tous les odd items
    const oddItems = document.querySelectorAll(
      ".Projects__Item:nth-child(odd)"
    );

    oddItems.forEach((item) => {
      gsap.fromTo(
        item,
        {
          x: `${x}vw`,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: item,
            start: startValue,
            end: endValue,
            scrub: 1,
          },
        }
      );
    });

    // Idem pour les even si besoin
    const evenItems = document.querySelectorAll(
      ".Projects__Item:nth-child(even)"
    );

    evenItems.forEach((item) => {
      gsap.fromTo(
        item, // départ
        {
          x: `${x * -1}vw`,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: item,
            start: startValue,
            end: endValue,
            scrub: 1,
          },
        }
      );
    });

    gsap.from(".Projects__Title", {
      y: 100,
      rotateY: 90,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".Projects__Title",
        start: startValue,
        end: "bottom top",
        toggleActions: "play reverse play reverse", // ↓↓ ↑↑
      },
    });
  }, [window.innerWidth]);

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
              <h3 className={"Projects__Item__Title"}>{project.title[lang]}</h3>

              <a
                href={`project/${project.id}`}
                className={"Projects__Item__Link"}
              >
                <img src={imgSrc} alt="" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
