import Image from "next/image";

function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brandNavi leading-tight">
          আপনার সঠিক টিউটর বা অনলাইন কোর্স খুঁজে নিন - এখনই <span className="text-brandTeal">EduLink-এ।</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
          অভিজ্ঞ এবং যাচাইকৃত টিউটরদের সাথে সরাসরি সংযোগ করুন। আপনার শেখার যাত্রা আজই শুরু হোক।
        </p>
        <div className="bg-white p-2 rounded-full shadow-lg flex items-center border border-gray-100 mt-6 max-w-lg">
          <span className="px-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="বিষয়, এলাকা বা কোর্স দিয়ে সার্চ করুন..."
            className="flex-grow p-3 text-lg focus:outline-none"
          />
          <button className="bg-brandTeal text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-brandTeal/90 transition">
            সার্চ
          </button>
        </div>
        <div className="flex items-center gap-4 mt-8">
          <a
            href="#"
            className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-700 transition flex items-center gap-2"
          >
            শুরু করুন - ফ্রি ডেমো বুক করুন
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="md:w-1/2 relative flex justify-center items-center">
        <div className="relative w-[400px] h-[400px]">
          <img
            src="/tutor-image.jpg"
            alt="Experienced Tutor"
            className="w-full h-full object-cover rounded-[30px] image-glow"
            width={400}
            height={400}
          />
          <div
            className="absolute -top-10 -left-10 glass-card p-4 flex items-center gap-4 float-animation"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="text-3xl">👨‍🏫</span>
            <div>
              <p className="font-semibold text-brandNavi">ম্যাথ টিউটর</p>
              <p className="text-yellow-500 text-xl">★★★★★</p>
            </div>
          </div>
          <div
            className="absolute top-1/2 -right-16 transform -translate-y-1/2 glass-card p-4 flex flex-col gap-2 float-animation"
            style={{ animationDelay: "1.5s" }}
          >
            <p className="font-semibold text-brandNavi">সায়েন্স কোর্স</p>
            <p className="text-yellow-500 text-xl">★★★★★</p>
            <div className="flex -space-x-3 mt-1">
              <img
                src="https://i.pravatar.cc/40?u=1"
                className="h-9 w-9 rounded-full border-2 border-white"
                alt="Avatar 1"
                width={40}
                height={40}
              />
              <img
                src="https://i.pravatar.cc/40?u=2"
                className="h-9 w-9 rounded-full border-2 border-white"
                alt="Avatar 2"
                width={40}
                height={40}
              />
              <img
                src="https://i.pravatar.cc/40?u=3"
                className="h-9 w-9 rounded-full border-2 border-white"
                alt="Avatar 3"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div
            className="absolute -bottom-8 left-10 glass-card p-3 flex items-center gap-2 float-animation"
            style={{ animationDelay: "2.5s" }}
          >
            <span className="text-blue-600 bg-blue-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <p className="font-semibold text-brandNavi">যাচাইকৃত</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;