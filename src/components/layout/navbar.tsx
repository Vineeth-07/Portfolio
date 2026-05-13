import {
  BriefcaseBusiness,
  Layers3,
  Menu,
  Send,
  Sparkles,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { profile } from "../../lib/data";

const links = [
  { href: "#about", label: "About", icon: UserRound },
  { href: "#experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "#projects", label: "Projects", icon: Layers3 },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#contact", label: "Contact", icon: Send },
];

type NavbarProps = {
  introReady: boolean;
};

export const Navbar = ({ introReady }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        className="nav-shell mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[1.7rem] px-4 py-3 sm:px-5"
        initial={false}
        animate={
          introReady
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -24, scale: 0.98 }
        }
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nav-brand font-display text-sm font-semibold tracking-[0.22em] text-white sm:text-base">
          <span className="nav-brand-mark">
            <Sparkles size={14} />
          </span>
          {profile.name}
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              <link.icon size={14} />
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="nav-cta hidden md:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="nav-menu-button md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      {open ? (
        <div className="nav-mobile-panel mx-auto mt-3 max-w-7xl md:hidden">
          <div className="nav-mobile-grid">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav-mobile-link"
              >
                <link.icon size={16} />
                {link.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} className="nav-mobile-cta">
              <Send size={16} />
              Let&apos;s talk
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
