import { useTranslation } from "@/TranslationContext";
import "./style.scss";

export default function Contact() {
    const { t } = useTranslation();

    return (
        <section className="Contact">
            <h2>{t("contact-title")}</h2>
            <p>duchene.germain@gmail.com</p>
        </section>
    );
}