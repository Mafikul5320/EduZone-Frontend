"use client";

import { useState } from "react";
import { Clock, Plus, Trash2, Save, Loader2, Calendar } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { setAvailabilityAction } from "@/action/tutor.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AvailabilityManager({ initialSlots = [] }: { initialSlots?: AvailabilitySlot[] }) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(initialSlots);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [newSlot, setNewSlot] = useState<AvailabilitySlot>({
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
  });

  const handleAddSlot = () => {
    setSlots([...slots, newSlot]);
    console.log(slots)
    toast.success("Slot added to list");
  };

  const handleRemoveSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (slots.length === 0) {
      toast.error("Please add at least one slot");
      return;
    }

    setLoading(true);
    try {
      const res = await setAvailabilityAction(slots);
      console.log(res)
      if (res?.success) {
        toast.success("Availability updated successfully");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update availability");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <GlassCard variant="premium" className="space-y-6 sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="text-primary" size={20} />
            <h2 className="text-xl font-semibold italic">Add New Slot</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-bold uppercase italic">Day of Week</label>
              <select
                value={newSlot.day}
                onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                className="w-full bg-white/5  border border-black rounded-xl p-3 outline-none focus:border-primary/50 appearance-none text-sm"
              >
                {DAYS.map((day) => (
                  <option key={day} value={day} >{day}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-bold uppercase italic">Start Time</label>
                <input
                  type="text"
                  placeholder="10:00 AM"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary/50 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-bold uppercase italic">End Time</label>
                <input
                  type="text"
                  placeholder="11:00 AM"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary/50 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleAddSlot}
              className="w-full bg-white/5 border border-black  font-bold py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <Plus size={18} />
              Add to List
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <GlassCard className="flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold italic flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                Current Availability Slots
              </h3>
              <button
                onClick={handleSave}
                disabled={loading || slots.length === 0}
                className="bg-white border-2 border-black text-black font-bold px-6 py-2 rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save Changes
              </button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slots.map((slot, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group"
                >
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{slot.day}</p>
                        <p className="text-xs text-muted-foreground italic">{slot.startTime} - {slot.endTime}</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => handleRemoveSlot(index)}
                    className="p-2 text-muted-foreground hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
              ))}
              {slots.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                   <Clock size={48} className="mx-auto mb-4 opacity-10" />
                   <p className="text-muted-foreground italic">No availability slots added yet.</p>
                </div>
              )}
           </div>
        </GlassCard>
      </div>
    </div>
  );
}
