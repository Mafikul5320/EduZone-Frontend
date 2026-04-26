import { BookingService } from "@/service/booking.service";
import GlassCard from "@/components/ui/GlassCard";
import { Calendar, User, Clock, DollarSign, Bookmark } from "lucide-react";
import Image from "next/image";

async function AdminBookingsPage() {
  const bookingsResponse = await BookingService.getAllBookings();
  const bookings = bookingsResponse?.data || [];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Platform Bookings
        </h1>
        <p className="text-muted-foreground italic">Overview of all tutoring sessions scheduled on the platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4 font-semibold italic text-sm text-muted-foreground">Booking ID</th>
                  <th className="p-4 font-semibold italic text-sm text-muted-foreground">Student</th>
                  <th className="p-4 font-semibold italic text-sm text-muted-foreground">Tutor</th>
                  <th className="p-4 font-semibold italic text-sm text-muted-foreground">Date & Slot</th>
                  <th className="p-4 font-semibold italic text-sm text-muted-foreground">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-mono text-[10px] text-muted-foreground">
                      {booking.id.slice(0, 8)}...
                    </td>
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                           <User size={14} />
                         </div>
                         <span className="text-sm font-medium">{booking.student?.name || "Student"}</span>
                       </div>
                    </td>
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                           <User size={14} className="text-primary" />
                         </div>
                         <span className="text-sm font-medium">{booking.tutor?.user?.name || "Tutor"}</span>
                       </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-col">
                         <div className="flex items-center gap-1.5 text-xs text-white">
                           <Calendar size={12} className="text-muted-foreground" />
                           {new Date(booking.date).toLocaleDateString()}
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                           <Clock size={10} />
                           {booking.slot?.startTime} - {booking.slot?.endTime}
                         </div>
                       </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                        <DollarSign size={14} />
                        {booking.totalPrice}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-4">
                <Bookmark size={48} className="opacity-10" />
                <p className="italic">No bookings found on the platform.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default AdminBookingsPage;
