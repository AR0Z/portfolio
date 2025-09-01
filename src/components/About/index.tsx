import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import arrow from "@/assets/arrow.png";

import { lazy, Suspense } from "preact/compat";
import { Loader } from "../Loader";

import { SiReact, SiAdonisjs, SiDotnet, SiSpring, SiExpress, SiSass } from "react-icons/si";

export default function About() {
  const { t } = useTranslation();

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
