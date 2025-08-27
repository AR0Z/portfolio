import { useTranslation } from "@/TranslationContext.jsx";

import { Hero } from "@/components/Hero/";
import { LineSeparator } from "@/components/LineSeparator/";
import { About } from "@/components/About/";
import { Projects } from "@/components/Projects/"; 
import { Contact } from "@/components/Contact/";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <LineSeparator />
      <About />
      <Projects />
      <LineSeparator />
      <Contact />
    </>
  );
}
