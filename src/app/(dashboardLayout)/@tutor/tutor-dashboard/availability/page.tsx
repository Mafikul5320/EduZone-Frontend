import AvailabilityManager from "@/components/modules/tutor/availability/AvailabilityManager";
import { TutorService } from "@/service/tutor.service";

async function TutorAvailabilityPage() {
  // In a real app, we would fetch existing slots from the backend
  const TutorData = await TutorService.getAllTutors();
  const initialSlots = TutorData.data.tutorProfile.availabilities|| [];
  console.log(initialSlots,"hjrfkwsjrfgh")
  // const initialSlots = [
  //   { day: "Monday", startTime: "10:00 AM", endTime: "12:00 PM" },
  //   { day: "Wednesday", startTime: "04:00 PM", endTime: "06:00 PM" }
  // ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Availability Settings
        </h1>
        <p className="text-muted-foreground italic">Manage your weekly teaching schedule and time slots.</p>
      </div>

      <AvailabilityManager initialSlots={initialSlots} />
    </div>
  );
}

export default TutorAvailabilityPage;
