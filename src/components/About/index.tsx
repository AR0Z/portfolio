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
  const { t } = useTranslation();

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const startValue = isMobile ? "top 90%" : "top 90%";
    const endValue = isMobile ? "bottom 0%" : "bottom 10%"; // au lieu de 10% / 80%
    const x = isMobile ? 5 : 100;
    let split = SplitText.create(".About__Description", {
      type: "words",
    });

    gsap.from(split.words, {
      x: x,
      opacity: 0,
      stagger: {
        amount: 2,
      },
      scrollTrigger: {
        trigger: ".About__Description",
        start: startValue,
        end: endValue,
        toggleActions: "play reverse play reverse", // ↓↓ ↑↑
      },
    });

    gsap.from(".Skills__Container svg", {
      y: 100,
      opacity: 0,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      scrollTrigger: {
        trigger: ".Skills__Container",
        start: startValue,
        end: endValue,
        toggleActions: "play reverse play reverse", // ↓↓ ↑↑
      },
    });

    gsap.from(".Skills__Title", {
      y: 100,
      rotateY: 90,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".Skills__Title",
        start: startValue,
        end: endValue,
        toggleActions: "play reverse play reverse", // ↓↓ ↑↑
      },
    });

    let text = SplitText.create(".Skills__Container-text");

    gsap.from(text.words, {
      y: 100,
      opacity: 0,
      stagger: {
        amount: 0.5,
      },
      scrollTrigger: {
        trigger: ".Skills__Container-text",
        start: startValue,
        end: endValue,
        toggleActions: "play reverse play reverse", // ↓↓ ↑↑
      },
    });
  }, []);
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
