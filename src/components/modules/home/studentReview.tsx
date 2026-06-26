"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Marcus Williams",
    role: "CS Student, MIT",
    avatar: "Marcus",
    text: "EduZone transformed my understanding of machine learning. My tutor's explanations were crystal clear and the progress tracking kept me motivated.",
    stars: 5,
    subject: "Machine Learning",
    delay: 0,
    duration: 6,
    floatDelay: 0,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Pre-Med, Stanford",
    avatar: "Priya",
    text: "After struggling with organic chemistry, I found an incredible tutor here. My grades went from a C to an A in just 8 weeks of sessions!",
    stars: 5,
    subject: "Organic Chemistry",
    delay: 0.12,
    duration: 7.5,
    floatDelay: 1.5,
  },
  {
    id: 3,
    name: "Lucas Fernandez",
    role: "Entrepreneur",
    avatar: "Lucas",
    text: "Learned Spanish conversationally in 3 months. The 1-on-1 format is game changing — I actually progressed 10x faster than in group classes.",
    stars: 5,
    subject: "Spanish",
    delay: 0.24,
    duration: 5.5,
    floatDelay: 0.8,
  },
  {
    id: 4,
    name: "Emma Johnson",
    role: "High School Senior",
    avatar: "Emma",
    text: "My SAT score jumped 240 points after just 6 weeks with my math tutor. The personalized approach made all the difference. Cannot recommend enough.",
    stars: 5,
    subject: "SAT Math",
    delay: 0.36,
    duration: 8,
    floatDelay: 2.2,
  },
  {
    id: 5,
    name: "David Kim",
    role: "Software Engineer",
    avatar: "David",
    text: "The platform made it so easy to find a React expert. Within days I had a mentor who helped me finally understand advanced patterns.",
    stars: 5,
    subject: "React / TypeScript",
    delay: 0.48,
    duration: 6.8,
    floatDelay: 0.4,
  },
]

const stats = [
  { value: "50,000+", label: "Active Students", icon: "🎓" },
  { value: "8,500+", label: "Expert Tutors", icon: "👨‍🏫" },
  { value: "4.9★", label: "Average Rating", icon: "⭐" },
  { value: "98%", label: "Satisfaction Rate", icon: "💯" },
]

export function TestimonialsSection() {
  return (
    <section
      className="relative py-28 overflow-hidden bg-background"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-20 -left-20 h-80 w-80 rounded-full blur-[80px] bg-primary/10"
        />
        <div
          className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full blur-[80px] bg-secondary/10"
        />
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] bg-primary/5"
        />
        {/* Subtle grid pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/20 px-4 py-2 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Student Stories
            </span>
          </div>

          <h2
            className="mb-4 text-5xl font-black tracking-tight text-foreground sm:text-6xl"
          >
            Real Results,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Real Stories
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Thousands of students have transformed their learning journey with EduZone. Read what they have to say.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: t.delay, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative flex cursor-default flex-col rounded-3xl border border-border glass p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-primary/10 hover:shadow-2xl"
              style={{
                animation: `floatY ${t.duration}s ease-in-out ${t.floatDelay}s infinite`,
              }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary to-secondary"
              />

              {/* Quote mark */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/30 text-primary shadow-sm border border-primary/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm14 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>

              {/* Text */}
              <p className="mb-6 flex-1 text-[15px] leading-relaxed text-foreground font-medium">{t.text}</p>

              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border pt-5">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`}
                    alt={t.name}
                    className="h-10 w-10 rounded-full border-2 border-background shadow-sm bg-secondary"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs font-medium text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-secondary/30 px-3 py-1.5 text-[11px] font-bold text-primary border border-primary/20 shadow-sm">
                  {t.subject}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-3xl border border-border glass p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:bg-secondary/10 transition-all duration-300"
            >
              {/* Bottom accent bar */}
              <div
                className="absolute inset-x-0 bottom-0 h-[3px] translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-r from-primary to-secondary"
              />
              <div className="mb-2 text-3xl">{stat.icon}</div>
              <div
                className="mb-1 text-3xl font-black text-foreground tracking-tight"
              >
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}