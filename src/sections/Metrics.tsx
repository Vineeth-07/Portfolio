import { metrics } from "../lib/data";

export const Metrics = () => {
  return (
    <section id="metrics" className="section-shell px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <p className="font-display text-5xl text-white">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
