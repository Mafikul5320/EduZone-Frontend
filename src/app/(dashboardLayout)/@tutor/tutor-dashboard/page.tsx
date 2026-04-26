import GlassCard from "@/components/ui/GlassCard";
import { Users, Star, DollarSign, Clock, BookOpen, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { TutorService } from "@/service/tutor.service";
import Image from "next/image";

async function TutorDashboard() {
  const tutorData = await TutorService.getAllTutors();
  const tutor = tutorData?.data;

  const totalBookings = tutor?.tutorProfile?._count?.bookings || 0;
  const avgRating = tutor?.tutorProfile?.rating || "N/A";
  const earnings = `$${(tutor?.tutorProfile?.pricePerHour * totalBookings).toFixed(2)}`;
  const recentBookings = tutor?.tutorProfile?.bookings || [];
  const availabilities = tutor?.tutorProfile?.availabilities || [];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Tutor Console
        </h1>
        <p className="text-muted-foreground italic">Manage your teaching schedule and track student progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", value: totalBookings, icon: Users, color: "text-blue-400" },
          { title: "Avg Rating", value: avgRating, icon: Star, color: "text-amber-400" },
          { title: "Earnings", value: earnings, icon: DollarSign, color: "text-emerald-400" },
          { title: "Sessions", value: totalBookings, icon: Clock, color: "text-purple-400" },
        ].map((stat, i) => (
          <GlassCard key={i} className="hover:border-primary/30 transition-all cursor-default">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <Link href="/tutor-dashboard/sessions" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <GlassCard key={booking.id} className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={booking.student?.image || "/default-avatar.png"}
                    alt={booking.student?.name || "Student"}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{booking.student?.name || "Student"}</h3>
                  <p className="text-sm text-muted-foreground">{booking.slot}</p>
                  <p className="text-sm text-muted-foreground">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">${booking.totalPrice}</p>
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard className="border-dashed flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="text-muted-foreground mb-4 opacity-10" size={64} />
              <h3 className="text-lg font-semibold">No bookings found</h3>
              <p className="text-sm text-muted-foreground mt-2">When students book your sessions, they'll appear here.</p>
            </GlassCard>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Availability</h2>
          {availabilities.length > 0 ? (
            availabilities.slice(0,3).map((slot) => (
              <GlassCard key={slot.id} className="flex items-center gap-4 p-4">
                <Calendar size={24} className="text-primary" />
                <div>
                  <p className="text-sm font-bold">{slot.day}</p>
                  <p className="text-xs text-muted-foreground">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard className="border-dashed flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="text-muted-foreground mb-4 opacity-10" size={64} />
              <h3 className="text-lg font-semibold">No availability slots found</h3>
              <p className="text-sm text-muted-foreground mt-2">Set your availability to start accepting bookings.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;