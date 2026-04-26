import { TutorService } from "@/service/tutor.service";
import GlassCard from "@/components/ui/GlassCard";
import { Star, Clock, BookOpen, Calendar, ShieldCheck, DollarSign, MessageCircle } from "lucide-react";
import Image from "next/image";

async function TutorPublicProfilePage({ params }: { params: { id: string } }) {
  const tutorResponse = await TutorService.getSingleTutor(params.id);
  const tutor = tutorResponse?.data;

  if (!tutor) {
    return <div className="h-screen flex items-center justify-center">Tutor not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="h-[300px] bg-gradient-to-r from-primary/20 to-purple-600/20 relative">
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            <GlassCard variant="premium" className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-4 border-background shadow-2xl shrink-0">
                {tutor.image ? (
                  <Image src={tutor.image} alt={tutor.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center text-4xl font-bold">
                    {tutor.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">{tutor.name}</h1>
                    <div className="flex items-center gap-2 mt-1 text-primary">
                      <ShieldCheck size={18} />
                      <span className="text-sm font-bold uppercase tracking-wider">Verified Educator</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-xl border border-amber-400/20 font-bold">
                    <Star size={20} fill="currentColor" />
                    <span>4.9 (120+ Reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {tutor.subjects?.map((sub: string) => (
                    <span key={sub} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium uppercase">
                      {sub}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Students</p>
                    <p className="text-xl font-bold italic">200+</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Experience</p>
                    <p className="text-xl font-bold italic">8 Years</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Sessions</p>
                    <p className="text-xl font-bold italic">500+</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 italic">
                <BookOpen className="text-primary" size={24} />
                About the Tutor
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg italic">
                {tutor.bio}
              </p>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 italic">
                  <Calendar className="text-primary" size={20} />
                  Availability
                </h3>
                <div className="space-y-3">
                  {tutor.availability?.map((slot: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-medium italic">{slot.day}</span>
                      <span className="text-sm text-muted-foreground italic">{slot.startTime} - {slot.endTime}</span>
                    </div>
                  ))}
                  {!tutor.availability?.length && <p className="text-sm text-muted-foreground italic">No availability slots set.</p>}
                </div>
              </GlassCard>

              <GlassCard className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 italic">
                  <Clock className="text-primary" size={20} />
                  Teaching Approach
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm italic">
                  <li className="flex gap-2"><span>•</span> Interactive problem solving</li>
                  <li className="flex gap-2"><span>•</span> Focus on fundamental concepts</li>
                  <li className="flex gap-2"><span>•</span> Personalized learning plans</li>
                  <li className="flex gap-2"><span>•</span> Regular progress assessments</li>
                </ul>
              </GlassCard>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <GlassCard variant="premium" className="sticky top-24 space-y-8">
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest italic">Hourly Rate</p>
                <div className="flex items-center justify-center gap-1">
                  <DollarSign size={24} className="text-primary" />
                  <span className="text-5xl font-bold italic">{tutor.pricePerHour}</span>
                  <span className="text-xl text-muted-foreground italic">/hr</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:scale-[1.02] transition-transform shadow-2xl flex items-center justify-center gap-2 italic">
                  Book a Session
                </button>
                <button className="w-full bg-white/5 border border-white/10 font-bold py-5 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 italic">
                  <MessageCircle size={20} />
                  Send Message
                </button>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4 italic">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-bold text-emerald-400 italic">~ 30 mins</span>
                </div>
                <div className="flex items-center justify-between text-sm italic">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-bold">English, Bengali</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorPublicProfilePage;
