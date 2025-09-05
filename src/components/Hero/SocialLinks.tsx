import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "@/TranslationContext";

export function SocialLinks() {
  const { t } = useTranslation();
  return (
    <div className="Hero__SocialLinks">
      <a
        href="https://github.com/AR0Z"
        target="_blank"
        rel="noopener noreferrer"
        className="Link"
      >
        <FaGithub size={24} />
        <p>{t("githubHero")}</p>
      </a>
      <a
        href="https://www.linkedin.com/in/germain-duchêne-26215723a/"
        target="_blank"
        rel="noopener noreferrer"
        className="Link"
      >
        <FaLinkedin size={24} />
        <p>{t("linkedinHero")}</p>
      </a>
    </div>
  );
}
