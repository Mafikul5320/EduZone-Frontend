"use client";

import { useState } from "react";
import { Search, ArrowRight, Users, Star, BookOpen } from "lucide-react";

const SUGGESTED = ["Python", "Mathematics", "IELTS Prep", "JavaScript", "Physics"];

export function HeroSection1() {
  const [query, setQuery] = useState("");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="mesh-gradient" />

      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <div
        className="animate-fade-up delay-100 relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border"
        style={{
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          borderColor: "rgba(139, 92, 246, 0.25)",
          color: "#C4B5FD",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#8B5CF6", boxShadow: "0 0 6px #8B5CF6" }}
        />
        Trusted by 50,000+ students worldwide
      </div>

      <h1
        className="animate-fade-up delay-200 relative text-center font-extrabold tracking-tight leading-tight max-w-4xl"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.1 }}
      >
        <span style={{ color: "#F1F5F9" }}>Find and Connect with</span>{" "}
        <span className="gradient-text">Expert Tutors</span>
        <br />
        <span style={{ color: "#F1F5F9" }}>Anytime, Anywhere.</span>
      </h1>

      <p
        className="animate-fade-up delay-300 relative mt-6 text-center max-w-xl leading-relaxed"
        style={{ color: "#94A3B8", fontSize: "1.0625rem" }}
      >
        Access thousands of verified educators across 50+ subjects. Instantly book sessions
        and learn at your own pace.
      </p>

      <div className="animate-fade-up delay-400 relative w-full max-w-2xl mt-10">
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <Search className="w-5 h-5 flex-shrink-0" style={{ color: "#64748B" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects (e.g., Python, Mathematics)..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#F1F5F9" }}
          />
          <button className="btn-gradient flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex-shrink-0">
            Search
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          <span className="text-xs" style={{ color: "#475569" }}>
            Popular:
          </span>
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="text-xs px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer"
              style={{ color: "#94A3B8", borderColor: "rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                e.currentTarget.style.color = "#C4B5FD";
                e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "#94A3B8";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-up delay-500 relative flex flex-wrap items-center justify-center gap-8 mt-16">
        {[
          { icon: Users, value: "50K+", label: "Active Students" },
          { icon: BookOpen, value: "2,400+", label: "Expert Tutors" },
          { icon: Star, value: "4.9/5", label: "Average Rating" },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              <Icon className="w-5 h-5" style={{ color: "#A78BFA" }} />
            </div>
            <div>
              <div className="text-lg font-bold leading-none" style={{ color: "#F1F5F9" }}>
                {value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
