"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllTutorProfilesAction } from "@/action/tutor.action";
import { Search, ArrowRight, CheckCircle, Star, Users } from "lucide-react";

const Hero = () => {
  const [allTutors, setAllTutors] = useState<{ data: unknown } | null>(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await getAllTutorProfilesAction();
        setAllTutors(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#f0fdfa] to-[#eef2ff] text-slate-800 min-h-[90vh] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Text and Search */}
        <div className="lg:w-1/2 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <div className="inline-block px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 font-medium text-sm w-max shadow-sm">
            🚀 The #1 Platform for Online Learning
          </div>
          
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Tutor</span> or Course
          </h1>
          
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Connect directly with experienced and verified tutors. Start your learning journey today with personalized guidance and achieve your goals faster.
          </p>

          {/* Search Bar */}
          <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-indigo-100/50 flex items-center border border-white mt-4 max-w-xl group transition-all duration-300 focus-within:ring-4 focus-within:ring-teal-500/20 focus-within:bg-white focus-within:border-teal-200">
            <span className="pl-4 pr-2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
              <Search className="w-6 h-6" />
            </span>
            <input
              type="text"
              placeholder="Search by subject, area or course..."
              className="flex-grow p-3 text-lg focus:outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
            />
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300">
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 group">
              Book Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-3">
               <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative shadow-sm">
                    <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`Student ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col text-sm">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-medium text-slate-700">4.9/5 from 2k+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image and Floating Cards */}
        <div className="lg:w-1/2 relative flex justify-center items-center animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both mt-12 lg:mt-0">
          <div className="relative w-[340px] h-[400px] md:w-[460px] md:h-[540px]">
            {/* Background Blob/Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-[3rem] rotate-3 opacity-20 blur-lg" />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-[3rem] -rotate-3 transition-transform duration-500 hover:rotate-0" />
            
            {/* Main Tutor Image */}
            <div className="relative w-full h-full overflow-hidden rounded-[3rem] border-8 border-white/50 backdrop-blur-sm shadow-2xl z-10">
              <Image
                src="https://i.ibb.co.com/k6cK4DMT/home-tutor-m-jpg.webp"
                alt="Experienced Tutor"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Floating Glass Card 1 - Top Left */}
            <div className="absolute -top-6 -left-8 md:-left-16 bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-2xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">50k+</p>
                <p className="text-slate-500 text-sm font-medium">Active Students</p>
              </div>
            </div>

            {/* Floating Glass Card 2 - Right Middle */}
            <div className="absolute top-1/2 -right-8 md:-right-16 transform -translate-y-1/2 bg-white/90 backdrop-blur-xl p-5 rounded-2xl border border-white shadow-2xl flex flex-col gap-2 z-20 animate-pulse" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Star className="w-5 h-5 text-teal-600 fill-current" />
                </div>
                <p className="font-bold text-slate-900">Top Rated</p>
              </div>
              <p className="text-slate-500 text-sm font-medium">Expert Tutors Available</p>
            </div>

            {/* Floating Glass Card 3 - Bottom Left */}
            <div className="absolute -bottom-6 left-4 md:-left-8 bg-white/90 backdrop-blur-xl px-5 py-4 rounded-2xl border border-white shadow-2xl flex items-center gap-3 z-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <p className="font-bold text-slate-800">Verified Profiles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;