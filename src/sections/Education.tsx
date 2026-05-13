import { education } from "../lib/data";

export const Education = () => {
  return (
    <section id="education" className="section-shell px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <p className="section-kicker">Education</p>
        </div>

        <div className="education-panel grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <p className="text-3xl font-semibold text-white">{education.degree}</p>
            <p className="text-lg text-slate-200">{education.school}</p>
            <p className="text-sm uppercase tracking-[0.24em] text-[#f59e0b]">
              {education.period}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7dd3fc]">
              Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((item) => (
                <span key={item} className="tech-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
