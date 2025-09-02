import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

// pages
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/404";
import { Project } from "@/pages/Project";

// components
import { Header } from "@/components/Header.jsx";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Footer } from "@/components/Footer.jsx";
// context
import { TranslationProvider } from "@/TranslationContext.jsx";

// styles
import "@/style.scss";

export function App() {
  return (
    <TranslationProvider>
      <LocationProvider>
        <Header />
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/project/:id" component={Project} />
            <Route default component={NotFound} />
          </Router>
        </main>
        <Footer />
        <ParticlesBackground />
      </LocationProvider>
    </TranslationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
