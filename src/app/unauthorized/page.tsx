"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function UnauthorizedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01アイウエオカキクケコ403UNAUTHORIZED▓▒░█";
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const opacity = Math.random() > 0.92 ? 1 : 0.15;
        ctx.fillStyle =
          Math.random() > 0.97
            ? `rgba(239, 68, 68, ${opacity})`
            : `rgba(220, 38, 38, ${opacity * 0.5})`;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02060F] overflow-hidden flex items-center justify-center font-mono">
      {/* Matrix Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      {/* Radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-900/20 blur-[120px]" />
      </div>

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-2xl mx-auto animate-fadeIn">

        {/* Top label */}
        <div className="inline-flex items-center gap-2 border border-red-800/50 bg-red-950/30 px-4 py-1.5 rounded-sm mb-10 text-xs text-red-400 tracking-[0.3em] uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          System Alert
        </div>

        {/* 403 Big Number */}
        <div className="relative mb-4">
          <span
            className="block text-[10rem] leading-none font-black text-transparent select-none"
            style={{
              WebkitTextStroke: "1px rgba(239,68,68,0.3)",
              textShadow:
                "0 0 40px rgba(239,68,68,0.15), 0 0 80px rgba(239,68,68,0.08)",
            }}
          >
            403
          </span>
          {/* Glitch layer */}
          <span
            className="absolute inset-0 block text-[10rem] leading-none font-black text-red-600/10 select-none animate-glitch"
            aria-hidden="true"
          >
            403
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-widest uppercase">
          Access{" "}
          <span className="text-red-500">Denied</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800/60" />
          <span className="text-red-800 text-xs tracking-[0.5em]">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800/60" />
        </div>

        {/* Terminal box */}
        <div className="border border-red-900/40 bg-black/40 backdrop-blur-sm rounded-sm p-5 mb-8 text-left text-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-900/30">
            <span className="w-3 h-3 rounded-full bg-red-600/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-600/40" />
            <span className="w-3 h-3 rounded-full bg-green-600/20" />
            <span className="ml-2 text-red-900/80 text-xs tracking-widest">
              SYSTEM_RESPONSE.log
            </span>
          </div>
          <p className="text-red-400/70 leading-relaxed">
            <span className="text-red-600">$</span>{" "}
            <span className="text-green-500/60">AUTH_CHECK</span> →{" "}
            <span className="text-red-400">FAILED</span>
            <br />
            <span className="text-red-600">$</span>{" "}
            <span className="text-slate-500">
              আপনার এই পেজে প্রবেশের অনুমতি নেই।
            </span>
            <br />
            <span className="text-red-600">$</span>{" "}
            <span className="text-slate-500">
              You do not have permission to access this resource.
            </span>
            <br />
            <span className="text-red-600 mt-1 block">$</span>{" "}
            <span className="text-yellow-600/60">
              Contact your administrator or return home.
            </span>
            <span className="inline-block w-2 h-4 bg-red-500/70 ml-1 animate-blink align-middle" />
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold tracking-widest uppercase transition-all duration-200 rounded-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-8 py-3 border border-red-900/50 hover:border-red-700/70 text-red-400 hover:text-red-300 text-sm font-bold tracking-widest uppercase transition-all duration-200 rounded-sm bg-transparent"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Footer line */}
        <p className="mt-12 text-[10px] text-red-900/50 tracking-[0.4em] uppercase">
          Error Code 403 · Forbidden · Unauthorized Access
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes glitch {
          0%   { transform: translate(0); }
          20%  { transform: translate(-2px, 1px); }
          40%  { transform: translate(2px, -1px); }
          60%  { transform: translate(-1px, 2px); }
          80%  { transform: translate(1px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-fadeIn  { animation: fadeIn 0.8s ease forwards; }
        .animate-blink   { animation: blink 1s step-end infinite; }
        .animate-glitch  { animation: glitch 3s infinite; }
      `}</style>
    </div>
  );
}