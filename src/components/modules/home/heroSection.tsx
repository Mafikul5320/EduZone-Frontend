"use client";

import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="bg-[#F4F7FC] text-gray-800">

      {/* Hero Section Content */}
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text and Search */}
        <div className="md:w-1/2 flex flex-col gap-6 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A237E] leading-tight">
            Find Your Perfect Tutor or Online Course - Now on <span className="text-[#009688]">EduLink.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Connect directly with experienced and verified tutors. Start your learning journey today with personalized guidance.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-lg flex items-center border border-gray-100 mt-6 max-w-lg group transition-all focus-within:ring-2 focus-within:ring-[#009688]/20">
            <span className="px-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by subject, area or course..." 
              className="flex-grow p-3 text-lg focus:outline-none bg-transparent"
            />
            <button className="bg-[#009688] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#009688]/90 transition-all">
              Search
            </button>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button className="bg-[#00897b] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00796b] transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95">
              Get Started - Book Free Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side: Image and Floating Cards */}
        <div className="md:w-1/2 relative flex justify-center items-center animate-in fade-in zoom-in duration-1000">
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
            {/* Main Tutor Image */}
            <div className="relative w-full h-full overflow-hidden rounded-[30px] border-4 border-white shadow-[0_0_50px_rgba(0,150,136,0.3)]">
              <Image 
                src="/tutor-image.jpg" // Put your image in public/tutor-image.jpg
                alt="Experienced Tutor"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Glass Card 1 */}
            <div className="absolute -top-10 -left-10 bg-white/70 backdrop-blur-md p-4 rounded-[20px] border border-white/30 shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
              <span className="text-3xl">👨‍🏫</span>
              <div>
                <p className="font-semibold text-[#1A237E]">Math Tutor</p>
                <p className="text-yellow-500 text-xl">★★★★★</p>
              </div>
            </div>

            {/* Floating Glass Card 2 */}
            <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 bg-white/70 backdrop-blur-md p-4 rounded-[20px] border border-white/30 shadow-xl flex flex-col gap-2 animate-pulse">
              <p className="font-semibold text-[#1A237E]">Science Course</p>
              <p className="text-yellow-500 text-xl">★★★★★</p>
              <div className="flex -space-x-3 mt-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-white overflow-hidden relative">
                    {/* <Image src={`https://i.pravatar.cc/40?u=${i}`} alt="user" fill /> */}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Glass Card 3 */}
            <div className="absolute -bottom-8 left-10 bg-white/70 backdrop-blur-md p-3 rounded-[20px] border border-white/30 shadow-xl flex items-center gap-2 animate-bounce">
              <span className="text-blue-600 bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <p className="font-semibold text-[#1A237E]">Verified</p>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;