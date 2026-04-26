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
        <section className="w-full py-16 bg-white">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center px-6 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Our Collaborators
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                    At EduZone, we believe in the power of collaboration to drive
                    innovation and excellence in education. Our valued collaborators—educational
                    institutions, dedicated tutors, and forward-thinking organizations—play a
                    pivotal role in shaping a brighter future for learners worldwide.
                </p>
            </div>

            {/* Marquee Slider */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-4">
                        {items.map((collab, index) => (
                            <div
                                key={`${collab.id}-${index}`}
                                className="flex-shrink-0 flex items-center justify-center w-[250px] h-[150px] bg-[#f0f2ee] rounded-2xl px-6 pr-5"
                            >

                                <Image
                                    src={collab.logo}
                                    alt={collab.name}
                                    width={160}
                                    height={60}
                                    className="object-contain mx-w-[80px] "
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}