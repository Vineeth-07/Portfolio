import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../lib/data";

export const Contact = () => {
  return (
    <section id="contact" className="section-shell px-4 pb-24 pt-20 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(2,8,23,0.96)_42%,rgba(245,158,11,0.14))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-5">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title max-w-3xl">
              Open to Java full-stack, backend platform, and cloud-focused engineering roles.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-200">
              I’m looking for opportunities where secure APIs, enterprise systems, cloud-native delivery, and performance engineering all matter.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="button-primary">
                <Mail size={18} />
                Start a conversation
              </a>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-slate-100">
            <a href={`mailto:${profile.email}`} className="contact-chip">
              <Mail size={16} />
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-chip">
              <Github size={16} />
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-chip">
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
