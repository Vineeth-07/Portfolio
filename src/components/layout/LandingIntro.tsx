import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { profile } from "../../lib/data";

type LandingIntroProps = {
  active: boolean;
};

export const LandingIntro = ({ active }: LandingIntroProps) => {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="landing-intro-shell"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.55 } }}
        >
          <motion.div
            className="landing-intro-curtain landing-intro-curtain-left"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-112%", transition: { duration: 0.86, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div
            className="landing-intro-curtain landing-intro-curtain-right"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "112%", transition: { duration: 0.86, ease: [0.76, 0, 0.24, 1] } }}
          />

          <div className="landing-intro-grid" />

          <motion.div
            className="landing-intro-content"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98, transition: { duration: 0.28 } }}
            transition={{ duration: 0.62, ease: "easeOut" }}
          >
            <div className="landing-intro-kicker">
              <Sparkles size={14} />
              Portfolio Launch
            </div>
            <h1 className="landing-intro-title">{profile.name}</h1>
            <p className="landing-intro-copy">
              Initializing product systems, interaction layers, and the portfolio interface.
            </p>
            <div className="landing-intro-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
