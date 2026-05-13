import { experience } from "../lib/data";

export const Experience = () => {
  return (
    <section id="experience" className="section-shell px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="section-title experience-title">Experience</h2>
        </div>

        <div className="experience-grid">
          {experience.map((item) => (
            <article key={`${item.company}-${item.period}`} className="experience-card">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.24em] text-[#f59e0b]">
                  {item.period}
                </p>
                <h3 className="text-3xl font-semibold text-white">{item.role}</h3>
                <p className="text-lg text-slate-200">{item.company}</p>
                <p className="text-sm text-slate-500">{item.location}</p>
              </div>

              <div className="grid gap-3">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="experience-point">
                    {highlight}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
