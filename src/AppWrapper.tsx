import { useEffect, useState } from "preact/hooks";
import { TranslationProvider } from "./TranslationContext";
import { Loader } from "./components/Loader";
import FontFaceObserver from "fontfaceobserver";

export default function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Wait dom ready
        if (document.readyState !== "complete") {
          await new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });
        }

        // Wait for all important fonts (with timeout)
        const fonts = [
          "ClashDisplay-Regular",
          "ClashDisplay-Semibold",
          "Poppins-ExtraLight",
          "OverTheRainbow",
        ];
        await Promise.race([
          Promise.all(
            fonts.map((f) => new FontFaceObserver(f).load({ timeout: 10000 }))
          ),
          new Promise((resolve) => setTimeout(resolve, 10000)), // fallback 10s max
        ]);

        // Small delay to show the loader (if everything is super fast)
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (err) {
        console.warn("AppWrapper init warning:", err);
      } finally {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 300); 
      }
    };

    init();
  }, []);

  return (
    <TranslationProvider>
      {loading ? (
        <div
          className={`flex items-center justify-center h-screen w-screen bg-white transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Loader />
        </div>
      ) : (
        children
      )}
    </TranslationProvider>
  );
}
