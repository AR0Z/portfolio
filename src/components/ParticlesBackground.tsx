// Code généré par IA (problème avec tsparticles) donc implétementation avec canvas natif

import { useEffect, useRef } from "preact/hooks";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// Arrière-plan de particules avec liens (implémentation custom, aucune dépendance externe)
export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Variable d'opacité des particules
    const PARTICLE_OPACITY = 0.2; // Modifier cette valeur pour ajuster l'opacité des particules (0 = transparent, 1 = opaque)

    let particles: Particle[] = [];
    let animationId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let resizeRaf: number | null = null;
    let firstFill = true;
    let needAdd = false;

    const CONFIG = {
      // Densité dynamique via paliers d'aire (en px²) -> chaque palier ajuste densité et min
      densityTiers: [
        { area: 0, density: 0.00009, min: 90 },
        { area: 900_000, density: 0.000085, min: 120 },
        { area: 1_600_000, density: 0.00008, min: 150 },
        { area: 2_400_000, density: 0.000075, min: 180 },
        { area: 3_600_000, density: 0.00007, min: 210 },
        { area: 5_000_000, density: 0.000067, min: 240 },
        { area: 7_000_000, density: 0.000064, min: 270 },
        { area: 9_000_000, density: 0.000062, min: 300 },
      ] as const,
      maxParticles: 420,
      adaptHiDPI: true,
      ultraWideBoost: {
        aspectThreshold: 2.0,
        factor: 1.08,
        extraPerAspect: 0.04,
        max: 1.12,
      },
      linkDistance: 100,
      linkWidth: 1,
      maxSpeed: 0.45,
      particleSize: { min: 0.3, max: 2 },
      particleColor: "#E4E2DC",
      smoothAdjustBatch: 60, // nombre max de particules ajoutées / retirées par frame
    } as const;

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function resize() {
      const prevW = width;
      const prevH = height;
      width = window.innerWidth;
      height = window.innerHeight;
      // Effet pixelisé sur mobile : on force dpr à 1 si petit écran
      const isMobile = window.innerWidth < 700;
      dpr = isMobile ? 1 : window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);

      // Étale les particules sur la nouvelle surface pour éviter les zones vides
      if (prevW > 0 && prevH > 0 && particles.length) {
        const scaleX = width / prevW;
        const scaleY = height / prevH;
        if (scaleX !== 1 || scaleY !== 1) {
          for (const p of particles) {
            p.x *= scaleX;
            p.y *= scaleY;
            // Clamp de sécurité (au cas où rounding)
            if (p.x < 0 || p.x > width) p.x = Math.random() * width;
            if (p.y < 0 || p.y > height) p.y = Math.random() * height;
          }
        }
      }

      adjustParticleCount();
    }

    function targetParticleCount() {
      const area = width * height;
      const aspect = width / Math.max(1, height);
      const dprFactor = CONFIG.adaptHiDPI ? Math.min(2.2, Math.sqrt(dpr)) : 1;
      type Tier = (typeof CONFIG.densityTiers)[number];
      let tier: Tier = CONFIG.densityTiers[0];
      for (const t of CONFIG.densityTiers) {
        if (area >= t.area) tier = t;
        else break;
      }
      let baseRaw = area * tier.density * dprFactor;
      if (aspect >= CONFIG.ultraWideBoost.aspectThreshold) {
        const over = aspect - CONFIG.ultraWideBoost.aspectThreshold;
        const dynamicFactor = Math.min(
          CONFIG.ultraWideBoost.factor *
            (1 + over * CONFIG.ultraWideBoost.extraPerAspect),
          CONFIG.ultraWideBoost.max
        );
        baseRaw *= dynamicFactor;
      }
      const minForTier = tier.min;
      return Math.max(
        minForTier,
        Math.min(CONFIG.maxParticles, Math.round(baseRaw))
      );
    }

    function adjustParticleCount() {
      const target = targetParticleCount();
      const diff = target - particles.length;
      if (diff > 0) {
        // ajout progressif pour éviter gros freeze
        const addNow = Math.min(diff, CONFIG.smoothAdjustBatch);
        for (let k = 0; k < addNow; k++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: rand(-CONFIG.maxSpeed, CONFIG.maxSpeed),
            vy: rand(-CONFIG.maxSpeed, CONFIG.maxSpeed),
          });
        }
        if (addNow < diff) needAdd = true;
        else needAdd = false;
      } else if (diff < 0) {
        // trim immédiat (pas besoin de batch en réduction)
        particles.length = target;
        needAdd = false;
      } else {
        needAdd = false;
      }
    }

    function step() {
      if (needAdd) adjustParticleCount();
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;
      }

      // Draw links
      const linkDist2 = CONFIG.linkDistance * CONFIG.linkDistance;
      ctx.lineWidth = CONFIG.linkWidth;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < linkDist2) {
            const dist = Math.sqrt(dist2);
            const opacity = 1 - dist / CONFIG.linkDistance;
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const size = rand(CONFIG.particleSize.min, CONFIG.particleSize.max);
        // Utilise la couleur de particule avec opacité
        let color: string = CONFIG.particleColor;
        if (color.startsWith("#")) {
          // Convertit la couleur hexadécimale en rgba
          const hex = color.replace("#", "");
          const bigint = parseInt(hex, 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;
          color = `rgba(${r},${g},${b},${PARTICLE_OPACITY})`;
        } else if (color.startsWith("rgb(")) {
          color = color
            .replace("rgb(", "rgba(")
            .replace(")", `,${PARTICLE_OPACITY})`);
        } else if (color.startsWith("rgba(")) {
          // Remplace l'opacité existante
          color = color.replace(
            /rgba\((\d+),(\d+),(\d+),[^)]+\)/,
            `rgba($1,$2,$3,${PARTICLE_OPACITY})`
          );
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(step);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(step);
      }
    };

    function onResize() {
      if (resizeRaf != null) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    }

    resize();
    animationId = requestAnimationFrame(step);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (resizeRaf != null) cancelAnimationFrame(resizeRaf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
