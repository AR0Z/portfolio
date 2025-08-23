import "./style.scss";
import { useTranslation } from "../../TranslationContext.jsx";
import { SocialLinks } from "../../components/SocialLinks";
import arrow from "../../assets/down-arrow.svg";
export function Home() {
  const { t } = useTranslation();

  return (
    <main class="home">
      <div class="title-div">
        <h1 class="title-1">GERMAIN</h1>
        <h2 class="title-2">{t("title")}</h2>

        <SocialLinks />

        <div style={{ whiteSpace: "pre-line" }} class="desc">
          {t("description")}
        </div>
      </div>
      <a href="#project" class="changesection">
        <p>my projects</p>
        <img src={arrow} alt="" />
      </a>
    </main>
  );
}
