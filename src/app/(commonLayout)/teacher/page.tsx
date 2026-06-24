import React from "react";
import Image from "next/image";
import { BookOpen, Briefcase, CalendarClock, CheckCircle, ChevronRight, GraduationCap, LineChart, Wallet } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Teach with Us | EduZone",
  description: "Become a tutor on EduZone and share your knowledge globally.",
};

export default function TeacherPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-indigo-50/80 rounded-bl-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
                For Educators
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
                Teach online, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
                  Inspire globally.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                Join EduZone's community of expert tutors. Set your own rates, teach on your own schedule, and make a real impact on students worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup" className="inline-flex justify-center items-center gap-2 bg-slate-900 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-slate-900/20 hover:scale-105 transition-all duration-300">
                  Apply Now <ChevronRight size={20} />
                </Link>
                <Link href="#how-it-works" className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold text-lg px-8 py-4 rounded-full hover:bg-slate-50 transition-all duration-300">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              {/* Image composite */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-teal-400 rounded-full blur-2xl opacity-20" />
                <div className="absolute inset-4 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-white">
                  <Image 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Teacher" 
                    fill 
                    className="object-cover"
                  />
                </div>
                {/* Floating stats card */}
                <div className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="flex items-center gap-4">
                    <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
                      <Wallet size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Earn up to</p>
                      <p className="text-2xl font-black text-slate-900">$5k/mo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Why Teach With Us?</h2>
            <p className="text-slate-500 text-lg">Enjoy the freedom of being an independent educator with the support of a world-class platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: CalendarClock,
                title: "Total Flexibility",
                desc: "You are the boss. Teach as much or as little as you want, and set your own working hours.",
                color: "indigo"
              },
              {
                icon: LineChart,
                title: "Set Your Rates",
                desc: "Choose your own hourly rate. We handle the billing and ensure you get paid securely and on time.",
                color: "teal"
              },
              {
                icon: Briefcase,
                title: "No Marketing Needed",
                desc: "We bring the students to you. Focus on teaching while we handle the platform and student acquisition.",
                color: "rose"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-2 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                  ${feature.color === 'teal' ? 'bg-teal-50 text-teal-600' : 
                    feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                  <feature.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Steps */}
      <section id="how-it-works" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">How to Get Started</h2>
              <p className="text-slate-500 text-lg mb-10">The process is simple and transparent. Start your teaching journey today.</p>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Create Your Profile", desc: "Sign up and build a compelling profile showcasing your expertise, qualifications, and teaching style." },
                  { step: "02", title: "Get Verified", desc: "Our team will review your application quickly. We verify qualifications to maintain high platform standards." },
                  { step: "03", title: "Start Teaching", desc: "Once approved, your profile goes live. Accept booking requests and start teaching students globally." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className="bg-indigo-50 rounded-[3rem] p-8 lg:p-12 border border-indigo-100 relative">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Tutor Requirements</h3>
                  <ul className="space-y-4">
                    {[
                      "Strong internet connection & webcam",
                      "Demonstrated expertise in your subject area",
                      "Excellent communication skills",
                      "Passion for teaching and helping others",
                      "Commitment to student success"
                    ].map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                        <CheckCircle className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-slate-900 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
          Ready to Share Your Knowledge?
        </h2>
        <Link href="/signup" className="inline-block bg-gradient-to-r from-teal-400 to-indigo-400 text-slate-900 font-black text-xl px-12 py-5 rounded-full shadow-lg shadow-teal-500/20 hover:scale-105 transition-all duration-300">
          Apply as a Tutor Now
        </Link>
      </section>
    </div>
  );
}
