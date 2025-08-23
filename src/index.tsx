import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

// pages
import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import { Project } from "./pages/Project/index.jsx";

// components
import { Header } from "./components/Header.jsx";
import { ParticlesBackground } from "./components/ParticlesBackground"; // extension retirée
// context
import { TranslationProvider } from "./TranslationContext.jsx";

// styles
import "./style.scss";
import "flag-icons/css/flag-icons.min.css";

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
