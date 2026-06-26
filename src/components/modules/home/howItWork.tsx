"use client";
import { motion } from "framer-motion";
import { UserPlus, Search, BookOpen, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your account in seconds and set your learning goals.",
    step: "01",
    glow: "hsl(var(--primary))",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Search,
    title: "Search",
    description: "Browse tutors by subject, rating, availability, and price.",
    step: "02",
    glow: "hsl(var(--secondary))",
    accent: "from-secondary/20 to-secondary/5",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Join live sessions, access resources, and track your progress.",
    step: "03",
    glow: "hsl(var(--primary))",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Star,
    title: "Review",
    description: "Rate your experience and help our community grow stronger.",
    step: "04",
    glow: "hsl(var(--secondary))",
    accent: "from-secondary/20 to-secondary/5",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="relative py-28 border-t border-border overflow-hidden bg-background"
  >
    {/* Subtle background grid */}
    <div
      className="pointer-events-none absolute inset-0 opacity-5"
      style={{
        backgroundImage:
          "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    {/* Background glow blobs */}
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2" />


    <div className="container mx-auto px-6 relative z-10">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-24"
      >
        <span className="inline-block px-4 py-1.5 bg-secondary/20 border border-primary/20 rounded-full text-primary font-semibold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
          Simple Process
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mt-2 leading-tight tracking-tight">
          How It{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 relative inline-block">
            Works
          </span>
        </h2>

        <p className="text-muted-foreground mt-8 max-w-lg mx-auto text-lg leading-relaxed">
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
              "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 8px, transparent 8px, transparent 16px)",
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
                  className="group relative w-[280px] rounded-3xl border border-border glass p-6 cursor-default overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <span
                      className="block font-bold text-sm tracking-widest mb-3 text-primary"
                    >
                      STEP {step.step}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
                  className="relative w-16 h-16 rounded-full bg-background flex items-center justify-center border-[3px] border-border"
                >
                  <Icon className="h-6 w-6 text-primary" />

                  {/* Gold number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-md bg-primary"
                    style={{
                      fontSize: 11,
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
                    className="block font-bold text-[11px] tracking-widest mb-1.5 text-primary"
                  >
                    STEP {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Desktop label on opposite side */}
                <div
                  className={`hidden md:flex items-center gap-4 ${
                    isLeft ? "" : "justify-end"
                  }`}
                >
                  {!isLeft && <div className="h-[2px] w-12 bg-border" />}
                  <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    Step {step.step}
                  </span>
                  {isLeft && <div className="h-[2px] w-12 bg-border" />}
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