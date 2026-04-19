import React from 'react';
import { GraduationCap, Paintbrush } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full  ">
      {/* Main Glass Container */}
      <div className=" bg-[#0B0F1A]/80 backdrop-blur-2xl border border-white/10  p-8 md:p-12 shadow-2xl relative overflow-hidden">

        {/* Background Glows (Optional for that extra pop) */}
        <div className="absolute top-0 -left-20 w-64 h-64 bg-teal-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

          {/* 1. Branding Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-teal-400 to-purple-500 p-2 rounded-xl">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Edu<span className="text-[#B794F4]">Link</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed leading-7">
              Unlock world-class mentorship. <br />
              Find the perfect guide for your <br />
              learning journey.
            </p>
            {/* <div className="flex gap-4">
              {[Facebook, Github, Instagram, Paintbrush].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* 2. Platform Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Browse Tutors</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* 3. Support Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-[#B794F4] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#B794F4] transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-[#B794F4] transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-[#B794F4] transition-colors">Privacy policy</a></li>
            </ul>
          </div>

          {/* 4. Newsletter Section */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Newsletter</h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm text-white focus:outline-none focus:border-teal-400/50 transition-all placeholder:text-slate-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-900 font-bold py-2 px-6 rounded-full text-xs transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-teal-400/40">
                Send
              </button>
            </div>
            <div className="mt-8 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest">
              <span>Midnight Slate, Lavender, and Teal</span>
              <span>Clean State</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;