export const dynamic = "force-dynamic";
import { Users, Star, DollarSign, Clock, BookOpen, ChevronRight, Calendar, TrendingUp } from "lucide-react";
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
    <div className="relative min-h-[85vh] bg-[#0B1120] text-slate-100 p-6 md:p-10 overflow-hidden rounded-[2.5rem] shadow-2xl m-4 border border-white/10">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10 z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" /> Tutor Console
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Instructor Dashboard
            </h1>
            <p className="text-slate-400 text-lg">Manage your teaching schedule and track student progress.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-2 pr-6 rounded-full backdrop-blur-md shadow-xl hover:bg-white/[0.05] transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0 bg-slate-800 flex items-center justify-center">
              <Star className="text-amber-400 fill-amber-400" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Top Rated</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Instructor Level</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Students", value: totalBookings, icon: Users, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
            { title: "Avg Rating", value: avgRating, icon: Star, color: "from-amber-500 to-orange-400", shadow: "shadow-amber-500/20" },
            { title: "Earnings", value: earnings, icon: DollarSign, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/20" },
            { title: "Sessions", value: totalBookings, icon: Clock, color: "from-purple-500 to-pink-400", shadow: "shadow-purple-500/20" },
          ].map((stat, i) => (
            <div key={i} className={`group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${stat.shadow}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-400">{stat.title}</p>
                  <p className="text-4xl font-extrabold text-white tracking-tight">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                  <stat.icon size={26} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/20">
                  <BookOpen size={20} />
                </div>
                Recent Bookings
              </h2>
              <Link href="/tutor-dashboard/sessions" className="text-sm text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-4 relative z-10 flex-1">
              {recentBookings.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recentBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all group/card cursor-pointer">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover/card:border-purple-400/50 transition-colors shrink-0">
                      <Image
                        src={booking.student?.image || "/default-avatar.png"}
                        alt={booking.student?.name || "Student"}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-200 group-hover/card:text-white transition-colors">{booking.student?.name || "Student"}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Clock size={12} className="text-slate-500" /> {booking.slot}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Calendar size={12} className="text-slate-500" /> {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-400">${booking.totalPrice}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Paid</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center py-16 text-center bg-white/[0.01]">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <BookOpen className="text-slate-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-300">No bookings yet</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">When students book your sessions, they will appear here automatically.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all duration-500">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/20">
                  <Calendar size={20} />
                </div>
                Availability
              </h2>
              <div className="space-y-4">
                {availabilities.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  availabilities.slice(0,4).map((slot: any) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all">
                      <div>
                        <p className="text-sm font-bold text-slate-200">{slot.day}</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium bg-white/5 inline-block px-2 py-0.5 rounded-md">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Clock size={14} className="text-slate-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center py-12 text-center bg-white/[0.01]">
                    <Calendar className="text-slate-600 mb-4" size={32} />
                    <h3 className="text-md font-bold text-slate-300">No availability set</h3>
                    <p className="text-xs text-slate-500 mt-2">Update your profile schedule.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="relative rounded-[2rem] p-8 overflow-hidden group shadow-[0_0_40px_rgba(16,185,129,0.15)] border border-emerald-500/20 bg-gradient-to-br from-emerald-600 to-teal-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative z-10">
                <h3 className="font-extrabold text-2xl mb-2 text-white">Boost your profile!</h3>
                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">Add more subjects and availability to reach more students.</p>
                <Link href="/tutor-dashboard/profile" className="w-full py-3.5 bg-white text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors shadow-xl active:scale-95 flex items-center justify-center gap-2">
                  Update Profile <TrendingUp size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;