import { useTranslation } from "@/TranslationContext";
import "./style.scss";
import errorbg from "@/assets/error-bg.png";
import underline from "@/assets/underline-error.svg";

export function NotFound() {
  const { t } = useTranslation();
  return (
    <section class="error">
      <div className="error__code">
        <p>404</p>
        <p>ERROR PAGE</p>
      </div>

      <div className="error__title">
        <div className="error__content">
          <p className="error__404">404</p>
          <p className="error__text">{t("error-title")}</p>
          <img src={errorbg} alt="" />
        </div>
        <span className="error__back">
          Go Back
          <img src={underline} alt="" />
        </span>
      </div>

      <div className="error__subtitle">
        <p>{t("error-subtitle")}</p>
      </div>

      <div className="error__background">404</div>
    </section>
  );
}
