import { AdminService } from "@/service/admin.service";
import GlassCard from "@/components/ui/GlassCard";
import { Users, Bookmark, Grid, TrendingUp, Calendar } from "lucide-react";

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
    { title: "Total Users", value: displayStats.totalUsers, icon: Users, color: "text-blue-400" },
    { title: "Active Tutors", value: displayStats.totalTutors, icon: TrendingUp, color: "text-emerald-400" },
    { title: "Total Bookings", value: displayStats.totalBookings, icon: Bookmark, color: "text-purple-400" },
    { title: "Categories", value: displayStats.activeCategories, icon: Grid, color: "text-amber-400" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground italic">Welcome back, here&#39;s what&#39;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <GlassCard key={i} className="group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard variant="premium" className="h-80 flex flex-col items-center justify-center border-dashed">
          <Calendar className="text-muted-foreground mb-4" size={48} />
          <p className="text-xl font-semibold">Activity Overview</p>
          <p className="text-sm text-muted-foreground">Visualization coming soon...</p>
        </GlassCard>
        
        <GlassCard className="h-80 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4 overflow-y-auto pr-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium">New tutor registration: Sarah Connor</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
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