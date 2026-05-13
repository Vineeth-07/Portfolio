import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ChessModal } from "./components/game/ChessModal";
import { LandingIntro } from "./components/layout/LandingIntro";
import { MouseGlow } from "./components/layout/MouseGlow";
import { Navbar } from "./components/layout/navbar";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Metrics } from "./sections/Metrics";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";

export default function App() {
  const [isChessOpen, setIsChessOpen] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      setIntroReady(true);
    }, 1080);

    const hideTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1680);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020817]">
      <MouseGlow />
      <div className="site-shell" />
      <LandingIntro active={showIntro} />
      <Navbar introReady={introReady} />

      <main className="relative z-10">
        <Hero introReady={introReady} onOpenGame={() => setIsChessOpen(true)} />
        <Metrics />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>

      <ChessModal open={isChessOpen} onClose={() => setIsChessOpen(false)} />
    </div>
  );
}
