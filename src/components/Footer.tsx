import { useTranslation } from "@/TranslationContext";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>© Germain Duchêne - {new Date().getFullYear()}</p>
      <p dangerouslySetInnerHTML={{ __html: t("footer") }} />
      <p dangerouslySetInnerHTML={{ __html: t("github") }} />
    </footer>
  );
}
