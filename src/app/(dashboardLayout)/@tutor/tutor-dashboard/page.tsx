export const dynamic = "force-dynamic";
import { Users, Star, DollarSign, Clock, BookOpen, ChevronRight, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { TutorService } from "@/service/tutor.service";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import ProfileSetupPrompt from "@/components/modules/tutor/ProfileSetupPrompt";

async function TutorDashboard() {
  const tutorData = await TutorService.getDashboardData();
  const tutor = tutorData?.data;

  // Check if tutor profile exists
  if (!tutor?.tutorProfile) {
    return <ProfileSetupPrompt />;
  }

  const totalBookings = tutor?.tutorProfile?._count?.bookings || 0;
  const avgRating = tutor?.tutorProfile?.rating || "N/A";
  const earnings = `$${(tutor?.tutorProfile?.pricePerHour * totalBookings).toFixed(2)}`;
  const recentBookings = tutor?.tutorProfile?.bookings || [];
  const availabilities = tutor?.tutorProfile?.availabilities || [];

  const stats = [
    { title: "Total Students", value: totalBookings, icon: Users, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "Avg Rating", value: avgRating, icon: Star, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400" },
    { title: "Earnings", value: earnings, icon: DollarSign, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { title: "Sessions", value: totalBookings, icon: Clock, color: "text-primary bg-primary/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary),0.8)]" /> Tutor Console
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Instructor Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Manage your teaching schedule and track student progress.</p>
        </div>
        <div className="flex items-center gap-4 glass border border-border/50 p-2 pr-6 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-border shrink-0 bg-background flex items-center justify-center">
            <Star className="text-amber-400 fill-amber-400" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">Top Rated</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Instructor Level</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Bento Box Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="group relative overflow-hidden p-6">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 -translate-y-4 translate-x-4">
              <stat.icon size={100} />
            </div>
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <p className="text-4xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color} shadow-sm transform group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={26} strokeWidth={2.5} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Content Grid - Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Bookings */}
        <GlassCard className="lg:col-span-2 p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-foreground flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <BookOpen size={20} />
              </div>
              Recent Bookings
            </h2>
            <Link href="/tutor-dashboard/sessions" className="text-sm text-primary font-bold hover:text-secondary transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {recentBookings.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              recentBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center gap-5 p-4 rounded-2xl border border-transparent hover:bg-background/60 hover:border-border/50 transition-all group/card cursor-pointer shadow-sm hover:shadow-md">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border group-hover/card:border-primary/50 transition-colors shrink-0">
                    <Image
                      src={booking.student?.image || "/default-avatar.png"}
                      alt={booking.student?.name || "Student"}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground group-hover/card:text-primary transition-colors">{booking.student?.name || "Student"}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <Clock size={12} /> {booking.slot}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <Calendar size={12} /> {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">${booking.totalPrice}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">Paid</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-2 border-dashed border-border/60 rounded-3xl flex flex-col items-center justify-center py-16 text-center bg-secondary/5 h-full">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground">No bookings yet</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">When students book your sessions, they will appear here automatically.</p>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Availability */}
          <GlassCard className="p-8">
            <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Calendar size={20} />
              </div>
              Availability
            </h2>
            <div className="space-y-4">
              {availabilities.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                availabilities.slice(0,4).map((slot: any) => (
                  <div key={slot.id} className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:bg-background/60 hover:border-border/50 transition-all shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-foreground">{slot.day}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium bg-secondary/10 inline-block px-2 py-0.5 rounded-md">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Clock size={14} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center py-12 text-center bg-secondary/5">
                  <Calendar className="text-muted-foreground mb-4" size={32} />
                  <h3 className="text-md font-bold text-foreground">No availability set</h3>
                  <p className="text-xs text-muted-foreground mt-2">Update your profile schedule.</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Call to Action */}
          <GlassCard className="p-8 relative overflow-hidden group border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-extrabold text-2xl mb-2 text-foreground">Boost your profile!</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Add more subjects and availability to reach more students.</p>
              <Link href="/tutor-dashboard/profile" className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-bold text-sm hover:shadow-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                Update Profile <TrendingUp size={16} />
              </Link>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

export default TutorDashboard;