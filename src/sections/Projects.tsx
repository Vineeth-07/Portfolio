import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../lib/data";

export const Projects = () => {
  return (
    <section id="projects" className="section-shell px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -6 }}
            >
              <div className={`project-card-glow bg-gradient-to-br ${project.accent}`} />
              <div className="relative space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-base text-slate-300">{project.subtitle}</p>
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-[#7dd3fc]/40 hover:text-white"
                      aria-label={`${project.title} link`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  ) : null}
                </div>

                <p className="text-sm leading-7 text-slate-300">{project.summary}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="tech-pill">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  {project.outcomes.map((outcome) => (
                    <div key={outcome} className="project-outcome">
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
