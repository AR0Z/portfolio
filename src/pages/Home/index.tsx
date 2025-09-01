import { useTranslation } from "@/TranslationContext.jsx";
import { Suspense, lazy } from "preact/compat";

import { Loader } from "@/components/Loader";
import LineSeparator from "@/components/LineSeparator";

import Hero from "@/components/Hero/";
import About from "@/components/About/";
const Projects = lazy(() => import("@/components/Projects/"));
const Contact = lazy(() => import("@/components/Contact/"));

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
      <LineSeparator />
      <About />
      <Suspense fallback={<Loader />}>
        <Projects />
      </Suspense>
      <LineSeparator />
      <Suspense fallback={<Loader />}>
        <Contact />
      </Suspense>
    </>
  );
}
