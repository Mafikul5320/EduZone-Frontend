import React from "react";
import Image from "next/image";
import { BookOpen, Users, Trophy, Target, Sparkles, GraduationCap } from "lucide-react";

export const metadata = {
  title: "About Us | EduZone",
  description: "Learn more about EduZone's mission to transform online learning.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8">
            Empowering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
              Next Generation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            EduZone is on a mission to make high-quality, personalized education accessible to everyone, everywhere. We connect passionate learners with world-class educators.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-10 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-500" />
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 text-teal-600 group-hover:scale-110 transition-transform duration-500">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                To democratize education by building a platform where knowledge flows freely without borders. We strive to provide personalized learning experiences that adapt to every student's unique needs and pace.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-10 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-500" />
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                A world where anyone can learn anything from the best mentors globally. We envision a future where geographical location and socioeconomic status are no longer barriers to world-class education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">The EduZone Difference</h2>
            <p className="text-slate-500 text-lg">What makes our platform the perfect choice for your learning journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Expert Mentors",
                desc: "Learn from vetted professionals and highly rated educators from around the globe.",
                color: "teal"
              },
              {
                icon: BookOpen,
                title: "Flexible Learning",
                desc: "Study at your own pace, on your own schedule. Education that fits your lifestyle.",
                color: "indigo"
              },
              {
                icon: Trophy,
                title: "Proven Results",
                desc: "Our interactive approach and personalized feedback ensure you achieve your goals faster.",
                color: "rose"
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 text-center group">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-2
                  ${feature.color === 'teal' ? 'bg-teal-100 text-teal-600' : 
                    feature.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
                  <feature.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative background for CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
            
            <GraduationCap size={48} className="text-teal-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10">
              Ready to Start Learning?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of students who are already advancing their skills with EduZone.
            </p>
            <a href="/signup" className="inline-block bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300 relative z-10">
              Create Free Account
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
