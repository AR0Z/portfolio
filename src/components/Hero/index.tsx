import { useTranslation } from "@/TranslationContext";
import "./style.scss";

import { SocialLinks } from "./SocialLinks";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="Hero">
      <div className="Hero__Title">
        <h1>Germain</h1>
        <h2>Duchêne</h2>
        <div
          className="Hero__Subtitle"
          dangerouslySetInnerHTML={{ __html: t("title") }}
        />
      </div>
      <SocialLinks />
    </section>
  );
}
