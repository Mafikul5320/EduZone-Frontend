import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Main Container */}
      <div className="bg-[#0B0F1A] border-t border-teal-500/10 p-8 md:p-16 relative overflow-hidden">

        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 max-w-7xl mx-auto">

          {/* 1. Branding Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-400 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-teal-500/20">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-white tracking-tight">
                Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Zone</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Unlock world-class mentorship. Find the perfect guide for your learning journey and achieve your goals faster.
            </p>
          </div>

          {/* 2. Platform Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Platform
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-teal-400 hover:translate-x-1 inline-block transition-all duration-300">Home</a></li>
              <li><a href="#" className="hover:text-teal-400 hover:translate-x-1 inline-block transition-all duration-300">Browse Tutors</a></li>
              <li><a href="#" className="hover:text-teal-400 hover:translate-x-1 inline-block transition-all duration-300">Success Stories</a></li>
              <li><a href="#" className="hover:text-teal-400 hover:translate-x-1 inline-block transition-all duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* 3. Support Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Support
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-300">About</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 4. Newsletter Section */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Newsletter
            </h4>
            <p className="text-sm text-slate-400 mb-4">Stay updated with the latest learning resources.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-24 text-sm text-white focus:outline-none focus:border-teal-400/50 transition-all placeholder:text-slate-500"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-white font-bold py-2 px-5 rounded-lg text-xs transition-all shadow-lg hover:shadow-teal-500/25 active:scale-95">
                Subscribe
              </button>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
              <span>© {new Date().getFullYear()} EduLink</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;