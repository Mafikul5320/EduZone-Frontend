"use client";
import { motion } from "framer-motion";
import { UserPlus, Search, BookOpen, Star } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Register", description: "Create your account in seconds and set your learning goals." },
  { icon: Search, title: "Search", description: "Browse tutors by subject, rating, availability, and price." },
  { icon: BookOpen, title: "Learn", description: "Join live sessions, access resources, and track your progress." },
  { icon: Star, title: "Review", description: "Rate your experience and help our community grow stronger." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 border-t border-border/50">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          How It <span className="text-gradient-gold">Works</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Four simple steps to transform your learning journey.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } md:text-${isLeft ? "right" : "left"}`}
            >
              {/* Content */}
              <div className={`flex-1 hidden md:block ${isLeft ? "pr-12" : "pl-12"}`}>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              </div>

              {/* Node */}
              <div className="relative z-10 shrink-0">
                <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_20px_hsl(160_84%_39%/0.3)]">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Content mobile + opposite side desktop */}
              <div className={`flex-1 ${isLeft ? "md:pl-12" : "md:pr-12"}`}>
                <div className="md:hidden">
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
                <div className="hidden md:block">
                  <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
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
