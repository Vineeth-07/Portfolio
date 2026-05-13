import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { SpotifyNowPlaying } from "../components/layout/SpotifyNowPlaying";
import { profile } from "../lib/data";

type HeroProps = {
  introReady: boolean;
  onOpenGame: () => void;
};

export const Hero = ({ introReady, onOpenGame }: HeroProps) => {
  return (
    <section id="top" className="relative px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.22fr_0.78fr] lg:items-center xl:grid-cols-[1.28fr_0.72fr]">
        <motion.div
          initial={false}
          animate={
            introReady
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 28 }
          }
          transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Sparkles size={14} className="text-[#f59e0b]" />
            {profile.status}
          </div>

          <div className="space-y-5">
            <p className="section-kicker">{profile.title}</p>
            <h1 className="hero-heading">
              <span className="hero-heading-line">
                Building <span className="hero-heading-muted">secure enterprise</span>
              </span>
              <span className="hero-heading-line hero-heading-line-secondary">
                platforms with Java, cloud systems, and product depth.
              </span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              {profile.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="button-primary">
              Explore projects
              <ArrowRight size={18} />
            </a>
            <a href={`mailto:${profile.email}`} className="button-secondary">
              <Mail size={18} />
              Contact me
            </a>
            <button type="button" className="button-secondary" onClick={onOpenGame}>
              <Gamepad2 size={18} />
              Play a game?
            </button>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-300">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
              <Github size={16} />
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail size={16} />
              Email
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={
            introReady
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.95, y: 24 }
          }
          transition={{ duration: 0.78, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="hero-visual-card lg:ml-auto lg:max-w-[30rem]"
        >
          <div className="hero-visual-rings" />
          <div className="hero-visual-grid" />
          <div className="hero-visual-scanline" />
          <div className="hero-photo-orbit">
            <div className="hero-photo-ring hero-photo-ring-one" />
            <div className="hero-photo-ring hero-photo-ring-two" />
            <div className="hero-photo-wrap">
              <img src={profile.image} alt={profile.name} className="hero-photo" />
            </div>
            <div className="hero-photo-caption">
              <p className="hero-photo-name">{profile.name}</p>
              <p className="hero-photo-role">{profile.title}</p>
            </div>
          </div>

          <div className="hero-visual-meta">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#7dd3fc]">Recent focus</p>
              <p className="mt-2 text-lg font-semibold text-white">{profile.heroPanelTitle}</p>
            </div>
            <div className="hero-meta-grid">
              <div className="hero-meta-cell">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{profile.heroFocusLabel}</p>
                <p className="mt-2 text-sm font-medium text-white">{profile.heroFocusValue}</p>
              </div>
              <div className="hero-meta-cell">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{profile.heroSpecialtyLabel}</p>
                <p className="mt-2 text-sm font-medium text-white">{profile.heroSpecialtyValue}</p>
              </div>
            </div>
            <SpotifyNowPlaying />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
