import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#0b1220] overflow-hidden">

      {/* Animated Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Big Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/40 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Vineeth Dharna
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-400 max-w-xl"
          >
            Full Stack Software Engineer building scalable,
            production-grade systems with React, Node.js, and PostgreSQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex gap-6"
          >
            <button className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow-xl shadow-indigo-500/40">
              View Projects
            </button>

            <button className="px-8 py-3 rounded-xl border border-gray-700 hover:bg-white/5 transition">
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <div className="space-y-4 text-gray-300">
              <p>⚡ React / TypeScript</p>
              <p>🚀 Node.js / Express</p>
              <p>🧠 PostgreSQL Optimization</p>
              <p>🔐 Secure Authentication</p>
              <p>☁️ AWS / Docker</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        ↓
      </div>
    </section>
  );
};