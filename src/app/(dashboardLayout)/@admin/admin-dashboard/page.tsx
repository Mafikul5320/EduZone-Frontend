export const dynamic = "force-dynamic";
import { AdminService } from "@/service/admin.service";
import { Users, Bookmark, Grid, TrendingUp, Calendar, Bell } from "lucide-react";

async function AdminDashboard() {
  const stats = await AdminService.getDashboardStats();

  // Mock data for fallback if API fails or returns empty
  const displayStats = stats?.data || {
    totalUsers: 120,
    totalTutors: 45,
    totalBookings: 350,
    activeCategories: 12
  };

  const cards = [
    { title: "Total Users", value: displayStats.totalUsers, icon: Users, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
    { title: "Active Tutors", value: displayStats.totalTutors, icon: TrendingUp, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/20" },
    { title: "Total Bookings", value: displayStats.totalBookings, icon: Bookmark, color: "from-purple-500 to-pink-400", shadow: "shadow-purple-500/20" },
    { title: "Categories", value: displayStats.activeCategories, icon: Grid, color: "from-amber-500 to-orange-400", shadow: "shadow-amber-500/20" },
  ];

  return (
    <div className="relative min-h-[85vh] bg-[#0B1120] text-slate-100 p-6 md:p-10 overflow-hidden rounded-[2.5rem] shadow-2xl m-4 border border-white/10">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10 z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" /> Live System Status
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-slate-400 text-lg">Monitor platform activity and key metrics.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg">
              <Calendar className="w-5 h-5 text-slate-300" />
            </button>
            <button className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg relative">
              <Bell className="w-5 h-5 text-slate-300" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#0B1120]" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className={`group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${card.shadow}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-400">{card.title}</p>
                  <p className="text-4xl font-extrabold text-white tracking-tight">{card.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                  <card.icon size={26} strokeWidth={2.5} />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 inline-flex px-2.5 py-1 rounded-full">
                <TrendingUp size={14} /> <span>+12% from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />
            <h2 className="text-xl font-bold text-white mb-6">Revenue Growth</h2>
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-500">
              <TrendingUp className="text-slate-500 mb-4" size={48} />
              <p className="text-lg font-semibold text-slate-300">Activity Visualization</p>
              <p className="text-sm text-slate-500">Interactive charts integrating soon</p>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-white/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Alerts</h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">NEW</span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { title: "New tutor registration", desc: "Sarah Connor applied", time: "2m ago", color: "bg-blue-400", shadow: "shadow-blue-400/50" },
                { title: "High server load", desc: "CPU usage at 85%", time: "1h ago", color: "bg-amber-400", shadow: "shadow-amber-400/50" },
                { title: "Payment completed", desc: "Booking #EDZ-8274", time: "3h ago", color: "bg-emerald-400", shadow: "shadow-emerald-400/50" },
                { title: "New review posted", desc: "5 stars for John Doe", time: "5h ago", color: "bg-purple-400", shadow: "shadow-purple-400/50" },
              ].map((n, idx) => (
                <div key={idx} className="group/item flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-pointer">
                  <div className={`w-2.5 h-2.5 rounded-full ${n.color} mt-1.5 shrink-0 shadow-lg ${n.shadow}`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-300 group-hover/item:text-white transition-colors">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{n.desc}</p>
                    <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-wider">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;