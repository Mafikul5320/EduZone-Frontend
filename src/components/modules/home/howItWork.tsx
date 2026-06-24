"use client";
import { motion } from "framer-motion";
import { UserPlus, Search, BookOpen, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your account in seconds and set your learning goals.",
    step: "01",
    glow: "rgba(20,184,166,0.3)", // teal
    accent: "from-teal-500/20 to-emerald-500/10",
  },
  {
    icon: Search,
    title: "Search",
    description: "Browse tutors by subject, rating, availability, and price.",
    step: "02",
    glow: "rgba(99,102,241,0.3)", // indigo
    accent: "from-indigo-500/20 to-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Join live sessions, access resources, and track your progress.",
    step: "03",
    glow: "rgba(236,72,153,0.3)", // pink
    accent: "from-pink-500/20 to-rose-500/10",
  },
  {
    icon: Star,
    title: "Review",
    description: "Rate your experience and help our community grow stronger.",
    step: "04",
    glow: "rgba(245,158,11,0.3)", // amber
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="relative py-28 border-t border-slate-100 overflow-hidden bg-white"
  >
    {/* Subtle background grid */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage:
          "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    {/* Background glow blobs */}
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-100/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2" />


    <div className="container mx-auto px-6 relative z-10">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-24"
      >
        <span className="inline-block px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs uppercase tracking-widest mb-6">
          Simple Process
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-2 leading-tight tracking-tight">
          How It{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 relative inline-block">
            Works
            {/* Decorative underline */}
            <svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6 C50 2, 150 2, 198 6"
                stroke="url(#teal-line)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="teal-line" x1="0" y1="0" x2="200" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
                  <stop offset="40%" stopColor="#14b8a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        <p className="text-slate-500 mt-8 max-w-lg mx-auto text-lg leading-relaxed">
          Four simple steps to transform your learning journey. Get started in minutes.
        </p>
      </motion.div>

      {/* ── Zigzag Timeline ── */}
      <div className="relative max-w-4xl mx-auto">

        {/* Dashed vertical line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-px"
          style={{
            width: 2,
            background:
              "repeating-linear-gradient(to bottom, #e2e8f0 0px, #e2e8f0 8px, transparent 8px, transparent 16px)",
          }}
        />

        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >

              {/* ── Desktop Content Card (alternating side) ── */}
              <div
                className={`flex-1 hidden md:flex ${
                  isLeft ? "justify-end pr-12" : "justify-start pl-12"
                }`}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative w-[280px] rounded-3xl border border-slate-100 bg-white p-6 cursor-default overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                  style={{
                    boxShadow: `0 4px 20px -8px ${step.glow}`,
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <span
                      className="block font-bold text-sm tracking-widest mb-3"
                      style={{ color: step.glow.replace(/,[\d.]+\)/, ', 1)').replace('rgba', 'rgb') }}
                    >
                      STEP {step.step}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-slate-800">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-700">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ── Center Icon Node ── */}
              <div className="relative z-20 shrink-0">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center border-[3px] border-white"
                  style={{
                    boxShadow: `0 0 0 1px #e2e8f0, 0 8px 30px ${step.glow}`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: step.glow.replace(/,[\d.]+\)/, ', 1)').replace('rgba', 'rgb') }} />

                  {/* Gold number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    style={{
                      fontSize: 11,
                      background: step.glow.replace(/,[\d.]+\)/, ', 1)').replace('rgba', 'rgb'),
                    }}
                  >
                    {i + 1}
                  </div>
                </motion.div>
              </div>

              {/* ── Mobile card + Desktop opposite-side label ── */}
              <div className={`flex-1 ${isLeft ? "pl-8 md:pl-12" : "pr-8 md:pr-12"}`}>

                {/* Mobile */}
                <div className="md:hidden">
                  <span
                    className="block font-bold text-[11px] tracking-widest mb-1.5"
                    style={{ color: step.glow.replace(/,[\d.]+\)/, ', 1)').replace('rgba', 'rgb') }}
                  >
                    STEP {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Desktop label on opposite side */}
                <div
                  className={`hidden md:flex items-center gap-4 ${
                    isLeft ? "" : "justify-end"
                  }`}
                >
                  {!isLeft && <div className="h-[2px] w-12 bg-slate-100" />}
                  <span className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">
                    Step {step.step}
                  </span>
                  {isLeft && <div className="h-[2px] w-12 bg-slate-100" />}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;