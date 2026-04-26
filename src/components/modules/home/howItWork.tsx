"use client";
import { motion } from "framer-motion";
import { UserPlus, Search, BookOpen, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your account in seconds and set your learning goals.",
    step: "01",
    glow: "rgba(245,158,11,0.25)",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Search,
    title: "Search",
    description: "Browse tutors by subject, rating, availability, and price.",
    step: "02",
    glow: "rgba(16,185,129,0.25)",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Join live sessions, access resources, and track your progress.",
    step: "03",
    glow: "rgba(14,165,233,0.25)",
    accent: "from-sky-500/20 to-blue-500/10",
  },
  {
    icon: Star,
    title: "Review",
    description: "Rate your experience and help our community grow stronger.",
    step: "04",
    glow: "rgba(139,92,246,0.25)",
    accent: "from-violet-500/20 to-purple-500/10",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="relative py-28 border-t border-border/50 overflow-hidden"
  >
    {/* Subtle background grid */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    <div className="container mx-auto px-6 relative z-10">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-4 px-4 py-1.5 rounded-full border border-border/60 bg-muted/40">
          Simple Process
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
          How It{" "}
          <span className="text-gradient-gold relative inline-block">
            Works
            {/* Decorative underline */}
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6 C50 2, 150 2, 198 6"
                stroke="url(#gold-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gold-line" x1="0" y1="0" x2="200" y2="0">
                  <stop offset="0%" stopColor="#C9943A" stopOpacity="0" />
                  <stop offset="40%" stopColor="#C9943A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C9943A" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        <p className="text-muted-foreground mt-6 max-w-md mx-auto text-base leading-relaxed">
          Four simple steps to transform your learning journey.
        </p>
      </motion.div>

      {/* ── Zigzag Timeline ── */}
      <div className="relative max-w-3xl mx-auto">

        {/* Dashed vertical line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-px"
          style={{
            width: 1,
            background:
              "repeating-linear-gradient(to bottom, hsl(var(--border)) 0px, hsl(var(--border)) 6px, transparent 6px, transparent 14px)",
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
              className={`relative flex items-center mb-14 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >

              {/* ── Desktop Content Card (alternating side) ── */}
              <div
                className={`flex-1 hidden md:flex ${
                  isLeft ? "justify-end pr-10" : "justify-start pl-10"
                }`}
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative max-w-[230px] rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm p-5 cursor-default overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 1px hsl(var(--border)/0.4), 0 8px 32px -8px ${step.glow}`,
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <span
                      className="block font-mono text-[11px] font-bold tracking-[0.2em] mb-2"
                      style={{ color: "#C9943A" }}
                    >
                      {step.step}
                    </span>
                    <h3 className="text-[15px] font-bold text-foreground mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ── Center Icon Node ── */}
              <div className="relative z-10 shrink-0">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="relative w-14 h-14 rounded-full bg-background flex items-center justify-center"
                  style={{
                    border: "1.5px solid hsl(var(--border))",
                    boxShadow: `0 0 0 5px hsl(var(--background)), 0 0 28px ${step.glow}`,
                  }}
                >
                  <Icon className="h-5 w-5 text-primary" />

                  {/* Gold number badge */}
                  <div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      fontSize: 9,
                      background: "linear-gradient(135deg,#C9943A,#E8B86D)",
                      boxShadow: "0 2px 8px rgba(201,148,58,0.5)",
                    }}
                  >
                    {i + 1}
                  </div>
                </motion.div>
              </div>

              {/* ── Mobile card + Desktop opposite-side label ── */}
              <div className={`flex-1 ${isLeft ? "pl-6 md:pl-10" : "pr-6 md:pr-10"}`}>

                {/* Mobile */}
                <div className="md:hidden">
                  <span
                    className="block font-mono text-[10px] font-bold tracking-[0.2em] mb-1.5"
                    style={{ color: "#C9943A" }}
                  >
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Desktop label on opposite side */}
                <div
                  className={`hidden md:flex items-center gap-2 ${
                    isLeft ? "" : "justify-end"
                  }`}
                >
                  {!isLeft && <div className="h-px w-8 bg-border/40" />}
                  <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-muted-foreground/40 uppercase">
                    Step {step.step}
                  </span>
                  {isLeft && <div className="h-px w-8 bg-border/40" />}
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