import { useTranslation } from "@/TranslationContext";
import { Suspense, lazy } from "preact/compat";

import { Loader } from "@/components/Loader";
import LineSeparator from "@/components/LineSeparator";

import Hero from "@/components/Hero/";
const About = lazy(() => import("@/components/About/"));
const Projects = lazy(() => import("@/components/Projects/"));
const Contact = lazy(() => import("@/components/Contact/"));

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <LineSeparator />
      <Suspense fallback={<Loader />}>
        <About />
        <Projects />
      </Suspense>
      <LineSeparator />
      <Suspense fallback={<Loader />}>
        <Contact />
      </Suspense>
    </>
  );
}
