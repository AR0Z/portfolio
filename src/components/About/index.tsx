import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import arrow from "@/assets/arrow.png";

import { Suspense, useEffect } from "preact/compat";
import { Loader } from "../Loader";

import {
  SiReact,
  SiAdonisjs,
  SiDotnet,
  SiSpring,
  SiExpress,
  SiSass,
} from "react-icons/si";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const { t, lang } = useTranslation();

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const startValue = "top 90%";
    const endValue = isMobile ? "bottom 0%" : "bottom 10%";
    const x = isMobile ? 5 : 100;

    const splits: any[] = [];
    const animations: any[] = [];

    // About Description
    const splitAbout = SplitText.create(".About__Description", {
      type: "words",
    });
    splits.push(splitAbout);
    animations.push(
      gsap.from(splitAbout.words, {
        x,
        opacity: 0,
        stagger: { amount: 2 },
        scrollTrigger: {
          trigger: ".About__Description",
          start: startValue,
          end: endValue,
          toggleActions: "play reverse play reverse",
        },
      })
    );

    // 🔹 Reset les propriétés pour les éléments SVG et Title
    gsap.set(".Skills__Container svg", { clearProps: "all" });
    gsap.set(".Skills__Title", { clearProps: "all" });

    // 🔹 Kill les ScrollTriggers ciblant ces éléments
    ScrollTrigger.getAll()
      .filter((st) =>
        st.trigger?.matches(
          ".Skills__Container, .Skills__Container svg, .Skills__Title"
        )
      )
      .forEach((st) => st.kill());

    // Skills Container SVG
    animations.push(
      gsap.from(".Skills__Container svg", {
        y: 100,
        opacity: 0,
        stagger: { amount: 0.5, from: "random" },
        scrollTrigger: {
          trigger: ".Skills__Container",
          start: startValue,
          end: endValue,
          toggleActions: "play reverse play reverse",
        },
      })
    );

    // Skills Title
    animations.push(
      gsap.from(".Skills__Title", {
        y: 100,
        rotateY: 90,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".Skills__Title",
          start: startValue,
          end: endValue,
          toggleActions: "play reverse play reverse",
        },
      })
    );

    // Skills Container Text
    const splitSkills = SplitText.create(".Skills__Container-text");
    splits.push(splitSkills);
    animations.push(
      gsap.from(splitSkills.words, {
        y: 100,
        opacity: 0,
        stagger: { amount: 0.5 },
        scrollTrigger: {
          trigger: ".Skills__Container-text",
          start: startValue,
          end: endValue,
          toggleActions: "play reverse play reverse",
        },
      })
    );

    // 🔥 Cleanup complet à la sortie du useEffect
    return () => {
      animations.forEach((a) => a.kill());
      splits.forEach((s) => s.revert());
    };
  }, [lang]);

  return (
    <section className="About">
      <p
        className="About__Description"
        dangerouslySetInnerHTML={{ __html: t("about") }}
      />
      <div className="Skills">
        <div className="Skills__Title">
          <h3>
            my skills
            <img src={arrow} alt="" />
          </h3>
        </div>
        <div className="Skills__Container">
          <Suspense fallback={<Loader />}>
            <SiReact />
            <SiAdonisjs />
            <SiDotnet />
            <SiSpring />
            <SiExpress />
            <SiSass />
          </Suspense>
        </div>
        <p
          className="Skills__Container-text"
          dangerouslySetInnerHTML={{ __html: t("skillsMore") }}
        />
      </div>
    </section>
  );
}
