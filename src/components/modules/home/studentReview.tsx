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
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f8fffe 0%, #f0fdf9 50%, #f8fffe 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-20 -left-20 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,95,70,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }}
        />
        {/* Subtle grid pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#065f46" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Student Stories
            </span>
          </div>

          <h2
            className="mb-4 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Real Results,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #065f46)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Real Stories
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-500">
            Thousands of students have transformed their learning journey with EduZone.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: t.delay, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative flex cursor-default flex-col rounded-2xl border border-emerald-100/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-emerald-100 hover:shadow-xl"
              style={{
                animation: `floatY ${t.duration}s ease-in-out ${t.floatDelay}s infinite`,
              }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, transparent, #10b981, transparent)" }}
              />

              {/* Quote mark */}
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm14 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                    fill="#10b981"
                  />
                </svg>
              </div>

              {/* Text */}
              <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{t.text}</p>

              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`}
                    alt={t.name}
                    className="h-9 w-9 rounded-full border-2 border-emerald-100 bg-emerald-50"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
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
              className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm"
            >
              {/* Bottom accent bar */}
              <div
                className="absolute inset-x-0 bottom-0 h-1 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                style={{ background: "linear-gradient(90deg, #10b981, #065f46)" }}
              />
              <div className="mb-1 text-2xl">{stat.icon}</div>
              <div
                className="mb-1 text-3xl font-black"
                style={{
                  background: "linear-gradient(135deg, #10b981, #065f46)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}