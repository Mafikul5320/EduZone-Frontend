import { BookingService } from "@/service/booking.service";
import GlassCard from "@/components/ui/GlassCard";
import { Calendar, User, Clock, DollarSign, BookOpen } from "lucide-react";

async function TutorSessionsPage() {
  const bookingsResponse = await BookingService.getAllBookings();
  // In a real app, this would be filtered by the tutor's ID on the server
  const sessions = bookingsResponse?.data || [];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Teaching Sessions
        </h1>
        <p className="text-muted-foreground italic">Track your upcoming and past tutoring sessions with students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session: any) => (
          <GlassCard key={session.id} className="flex flex-col gap-4 group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <User size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{session.student?.name || "Student"}</h3>
                  <p className="text-[10px] text-muted-foreground italic uppercase">Booked Session</p>
                </div>
              </div>
              <div className="text-right">
                 <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                   <DollarSign size={14} />
                   {session.totalPrice}
                 </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
               <div className="flex items-center gap-2 text-xs text-white bg-white/5 p-2 rounded-lg border border-white/5">
                 <Calendar size={14} className="text-primary" />
                 <span className="font-medium italic">{new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
               </div>
               
               <div className="flex items-center gap-2 text-xs text-muted-foreground p-2">
                 <Clock size={14} />
                 <span className="italic">{session.slot?.startTime} - {session.slot?.endTime}</span>
               </div>
            </div>

            <button className="w-full mt-2 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
              View Details
            </button>
          </GlassCard>
        ))}
        {sessions.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
             <BookOpen size={64} className="mx-auto mb-4 opacity-10" />
             <p className="text-muted-foreground italic text-lg">No sessions found yet.</p>
             <p className="text-sm text-muted-foreground italic mt-2">When students book your slots, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorSessionsPage;
