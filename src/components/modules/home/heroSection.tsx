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
    <section className="relative overflow-hidden bg-background text-foreground min-h-[90vh] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/30 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Text and Search */}
        <div className="lg:w-1/2 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <div className="inline-flex px-4 py-2 bg-secondary/20 border border-primary/30 rounded-full text-primary font-medium text-sm w-max shadow-sm backdrop-blur-md">
            🚀 The #1 Platform for Online Learning
          </div>
          
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.15] tracking-tight text-foreground">
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Tutor</span> or Course
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Connect directly with experienced and verified tutors. Start your learning journey today with personalized guidance and achieve your goals faster.
          </p>

          {/* Search Bar */}
          <div className="glass p-2 rounded-2xl shadow-xl flex items-center border border-border mt-4 max-w-xl group transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
            <span className="pl-4 pr-2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="w-6 h-6" />
            </span>
            <input
              type="text"
              placeholder="Search by subject, area or course..."
              className="flex-grow p-3 text-lg focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
            />
            <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4">
            <button className="bg-foreground text-background px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-xl hover:-translate-y-0.5 group">
              Book Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-3">
               <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary overflow-hidden relative shadow-sm">
                    <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`Student ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col text-sm">
                <div className="flex text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-medium text-foreground">4.9/5 from 2k+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image and Floating Cards */}
        <div className="lg:w-1/2 relative flex justify-center items-center animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both mt-12 lg:mt-0">
          <div className="relative w-[340px] h-[400px] md:w-[460px] md:h-[540px]">
            {/* Background Blob/Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] rotate-3 opacity-30 blur-lg" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] -rotate-3 transition-transform duration-500 hover:rotate-0" />
            
            {/* Main Tutor Image */}
            <div className="relative w-full h-full overflow-hidden rounded-[3rem] border-8 border-background/50 backdrop-blur-sm shadow-2xl z-10">
              <Image
                src="https://i.ibb.co.com/k6cK4DMT/home-tutor-m-jpg.webp"
                alt="Experienced Tutor"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Floating Glass Card 1 - Top Left */}
            <div className="absolute -top-6 -left-8 md:-left-16 glass p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-primary/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">50k+</p>
                <p className="text-muted-foreground text-sm font-medium">Active Students</p>
              </div>
            </div>

            {/* Floating Glass Card 2 - Right Middle */}
            <div className="absolute top-1/2 -right-8 md:-right-16 transform -translate-y-1/2 glass p-5 rounded-2xl shadow-2xl flex flex-col gap-2 z-20 animate-pulse" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Star className="w-5 h-5 text-primary fill-current" />
                </div>
                <p className="font-bold text-foreground">Top Rated</p>
              </div>
              <p className="text-muted-foreground text-sm font-medium">Expert Tutors Available</p>
            </div>

            {/* Floating Glass Card 3 - Bottom Left */}
            <div className="absolute -bottom-6 left-4 md:-left-8 glass px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
              <CheckCircle className="w-6 h-6 text-primary" />
              <p className="font-bold text-foreground">Verified Profiles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;