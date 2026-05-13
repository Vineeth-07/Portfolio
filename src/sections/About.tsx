import { profile } from "../lib/data";

export const About = () => {
  return (
    <section id="about" className="section-shell px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <h2 className="section-title max-w-none">About</h2>
        <p className="max-w-6xl text-[1.08rem] leading-9 text-slate-300 sm:text-[1.15rem] lg:text-[1.3rem] lg:leading-[2.3rem]">
          {profile.statement}
        </p>
      </div>
    </section>
  );
};
