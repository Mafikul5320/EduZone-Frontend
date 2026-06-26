export const dynamic = "force-dynamic";
import AvailabilityManager from "@/components/modules/tutor/availability/AvailabilityManager";
import { TutorService } from "@/service/tutor.service";

async function TutorAvailabilityPage() {
  let initialSlots: { day: string; startTime: string; endTime: string }[] = [];

  try {
    const tutorData = await TutorService.getAllTutors();
    initialSlots = tutorData?.data?.tutorProfile?.availabilities || [];
  } catch (e) {
    // Fallback to empty slots on error
    initialSlots = [];
  }

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
