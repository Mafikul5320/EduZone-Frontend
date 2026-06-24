"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import corser from "../../../../public/courser.png";
import corser1 from "../../../../public/Collaborators1.png";
import corser2 from "../../../../public/Collaborators2.png";
import corser3 from "../../../../public/Collaborators3.png";
import corser4 from "../../../../public/Collaborators4.png";
import corser5 from "../../../../public/Collaborators5.png";

const collaborators = [
    { id: 1, name: "Coursera", logo: corser },
    { id: 2, name: "Coursera", logo: corser1 },
    { id: 3, name: "Coursera", logo: corser2 },
    { id: 4, name: "Coursera", logo: corser3 },
    { id: 5, name: "Coursera", logo: corser4 },
    { id: 6, name: "Coursera", logo: corser5 },
    { id: 7, name: "Coursera", logo: corser },
    { id: 8, name: "Coursera", logo: corser3 },
    { id: 9, name: "Coursera", logo: corser4 },

];

export default function CollaboratorsSection() {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            dragFree: true,
        },
        [Autoplay({ delay: 1400, stopOnInteraction: false, playOnInit: true, })]
    );

    const items = [...collaborators];

    return (
        <section className="w-full py-24 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-100/50 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-teal-500/5 blur-[100px] pointer-events-none rounded-full" />
            
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center px-6 mb-16 relative z-10">
                <div className="inline-block px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-700 font-semibold text-xs uppercase tracking-widest mb-6">
                    Trusted Partners
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Collaborators</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
                    At EduZone, we believe in the power of collaboration to drive
                    innovation and excellence in education. Our valued partners play a
                    pivotal role in shaping a brighter future for learners worldwide.
                </p>
            </div>

            {/* Marquee Slider */}
            <div className="relative overflow-hidden pt-4 pb-8">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />

                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-6 items-center">
                        {items.map((collab, index) => (
                            <div
                                key={`${collab.id}-${index}`}
                                className="flex-shrink-0 flex items-center justify-center w-[260px] h-[140px] bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(20,184,166,0.1)] transition-all duration-500 group px-8"
                            >
                                <Image
                                    src={collab.logo}
                                    alt={collab.name}
                                    width={160}
                                    height={60}
                                    className="object-contain max-w-[120px] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}