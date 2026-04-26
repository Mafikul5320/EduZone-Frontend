import { BookingService } from "@/service/booking.service";
import BookingList from "@/components/modules/student/booking/BookingList";

async function StudentBookingsPage() {
  const bookingsResponse = await BookingService.getMyBookings();
  const bookings = bookingsResponse?.data || [];
console.log(bookings)
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          My Bookings
        </h1>
        <p className="text-muted-foreground italic">Review your scheduled tutoring sessions and share your feedback.</p>
      </div>

      <BookingList bookings={bookings} />
    </div>
  );
}

export default StudentBookingsPage;
