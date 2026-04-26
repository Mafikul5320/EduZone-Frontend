"use client"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    id: 1,
    name: "Marcus Williams",
    role: "CS Student, MIT",
    avatar: "Marcus",
    text: "EduZone transformed my understanding of machine learning. My tutor's explanations were crystal clear and the progress tracking kept me motivated.",
    stars: 5,
    subject: "Machine Learning",
    float: "animate-float",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Pre-Med, Stanford",
    avatar: "Priya",
    text: "After struggling with organic chemistry, I found an incredible tutor here. My grades went from a C to an A in just 8 weeks of sessions!",
    stars: 5,
    subject: "Organic Chemistry",
    float: "animate-float-alt",
  },
  {
    id: 3,
    name: "Lucas Fernandez",
    role: "Entrepreneur",
    avatar: "Lucas",
    text: "Learned Spanish conversationally in 3 months. The 1-on-1 format is game changing — I actually progressed 10x faster than in group classes.",
    stars: 5,
    subject: "Spanish",
    float: "animate-float-slow",
  },
  {
    id: 4,
    name: "Emma Johnson",
    role: "High School Senior",
    avatar: "Emma",
    text: "My SAT score jumped 240 points after just 6 weeks with my math tutor. The personalized approach made all the difference. Cannot recommend enough.",
    stars: 5,
    subject: "SAT Math",
    float: "animate-float-alt",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Software Engineer",
    avatar: "David",
    text: "The platform made it so easy to find a React expert. Within days I had a mentor who helped me finally understand advanced patterns.",
    stars: 5,
    subject: "React / TypeScript",
    float: "animate-float",
  },
]

const stats = [
  { value: "50,000+", label: "Active Students" },
  { value: "8,500+", label: "Expert Tutors" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge className="glass border-primary/30 text-primary bg-primary/10 mb-4 px-3 py-1.5 text-xs font-medium">
            Student Stories
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Real Results,{" "}
            <span className="text-gradient-emerald">Real Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
            Thousands of students have transformed their learning journey with EduZone.
          </p>
        </motion.div>

        <div className="relative h-[480px] hidden lg:block mb-16">
          {testimonials.map((t, i) => {
            const positions = [
              { left: "2%", top: "5%" },
              { left: "28%", top: "55%" },
              { left: "55%", top: "8%" },
              { left: "68%", top: "55%" },
              { left: "38%", top: "20%" },
            ]
            const pos = positions[i]

            return (
              <motion.div
                key={t.id}
                className={`absolute w-64 glass-card rounded-2xl p-4 ${t.float} cursor-default`}
                style={{ left: pos.left, top: pos.top, animationDelay: `${i * 1.2}s` }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ scale: 1.04, zIndex: 10, transition: { duration: 0.2 } }}
              >
                <Quote className="w-5 h-5 text-primary/50 mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">{t.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`}
                      alt={t.name}
                      className="w-7 h-7 rounded-full border border-primary/30"
                    />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-transparent px-1.5">
                    {t.subject}
                  </Badge>
                </div>
                <div className="flex mt-2">
                  {[...Array(t.stars)].map((_, s) => (
                    <Star key={s} className="w-3 h-3 text-primary fill-primary" />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 lg:hidden gap-4 mb-16">
          {testimonials.slice(0, 4).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-4"
            >
              <Quote className="w-4 h-4 text-primary/50 mb-2" />
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-4">{t.text}</p>
              <div className="flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`}
                  alt={t.name}
                  className="w-7 h-7 rounded-full border border-primary/30"
                />
                <div>
                  <p className="text-xs font-semibold text-foreground">{t.name}</p>
                  <div className="flex">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} className="w-2.5 h-2.5 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center glow-emerald-sm"
            >
              <div className="text-3xl font-extrabold text-gradient-emerald mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
