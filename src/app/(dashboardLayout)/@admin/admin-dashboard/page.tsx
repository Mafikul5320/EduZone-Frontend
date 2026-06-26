export const dynamic = "force-dynamic";
import { AdminService } from "@/service/admin.service";
import { Users, Bookmark, Grid, TrendingUp, Calendar, Bell } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

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
    { title: "Total Users", value: displayStats.totalUsers, icon: Users, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "Active Tutors", value: displayStats.totalTutors, icon: TrendingUp, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { title: "Total Bookings", value: displayStats.totalBookings, icon: Bookmark, color: "text-primary bg-primary/10" },
    { title: "Categories", value: displayStats.activeCategories, icon: Grid, color: "text-secondary bg-secondary/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.8)]" /> Live System Status
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Admin Portal
          </h1>
          <p className="text-muted-foreground text-lg">Monitor platform activity and key metrics.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3.5 rounded-2xl glass border border-border/50 hover:bg-secondary/5 transition-all hover:scale-105 active:scale-95 shadow-sm text-muted-foreground hover:text-primary">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-3.5 rounded-2xl glass border border-border/50 hover:bg-secondary/5 transition-all hover:scale-105 active:scale-95 shadow-sm relative text-muted-foreground hover:text-primary">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background" />
          </button>
        </div>
      </div>

      {/* Stats Grid - Bento Box Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <GlassCard key={i} className="group relative overflow-hidden p-6">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 -translate-y-4 translate-x-4">
              <card.icon size={100} />
            </div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{card.title}</p>
                <p className="text-4xl font-extrabold text-foreground tracking-tight">{card.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${card.color} shadow-sm transform group-hover:scale-110 transition-transform duration-300`}>
                <card.icon size={26} strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 inline-flex px-3 py-1.5 rounded-full relative z-10">
              <TrendingUp size={14} /> <span>+12% from last month</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Charts & Notifications - Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <GlassCard className="lg:col-span-2 p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-xl font-extrabold text-foreground">Revenue Growth</h2>
             <select className="bg-transparent border border-border rounded-lg text-sm font-medium px-3 py-1.5 outline-none text-muted-foreground focus:border-primary">
                <option>Last 30 Days</option>
                <option>This Year</option>
             </select>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-3xl bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-500">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
               <TrendingUp size={32} />
            </div>
            <p className="text-lg font-bold text-foreground">Activity Visualization</p>
            <p className="text-sm text-muted-foreground mt-1">Interactive charts integrating soon</p>
          </div>
        </GlassCard>

        {/* Notifications Sidebar */}
        <GlassCard className="p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-foreground">Recent Alerts</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">NEW</span>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { title: "New tutor registration", desc: "Sarah Connor applied", time: "2m ago", color: "bg-blue-500", shadow: "shadow-blue-500/50" },
              { title: "High server load", desc: "CPU usage at 85%", time: "1h ago", color: "bg-amber-500", shadow: "shadow-amber-500/50" },
              { title: "Payment completed", desc: "Booking #EDZ-8274", time: "3h ago", color: "bg-emerald-500", shadow: "shadow-emerald-500/50" },
              { title: "New review posted", desc: "5 stars for John Doe", time: "5h ago", color: "bg-primary", shadow: "shadow-primary/50" },
            ].map((n, idx) => (
              <div key={idx} className="group/item flex gap-4 p-4 rounded-2xl border border-transparent hover:bg-background/60 hover:border-border/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <div className={`w-3 h-3 rounded-full ${n.color} mt-1.5 shrink-0 shadow-sm ${n.shadow}`} />
                <div>
                  <p className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}

export default AdminDashboard;