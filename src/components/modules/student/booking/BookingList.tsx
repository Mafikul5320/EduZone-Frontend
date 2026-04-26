"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  Clock,
  DollarSign,
  Star,
  Loader2,
  MessageSquare,
  Quote,
  Save,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { submitReviewAction } from "@/action/admin.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingListProps {
  bookings: any[];
}

export default function BookingList({ bookings }: BookingListProps) {
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReviewSubmit = async (booking: any) => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    console.log(booking.tutorId)

    setLoading(true);
    try {
      const res = await submitReviewAction({
        tutorId: booking.tutorId,
        bookingId: booking.id,
        rating,
        comment,
      });

      if (res?.success) {
        toast.success("Review submitted successfully");
        setReviewingId(null);
        setComment("");
        setRating(5);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map((booking) => (
        <GlassCard
          key={booking.id}
          className="flex flex-col gap-4 group hover:shadow-lg hover:border-primary/40 transition-all duration-300 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-primary">
                  {booking.tutor?.user?.name || "Tutor"}
                </h3>
                <p className="text-[10px] text-muted-foreground italic uppercase">
                  Tutoring Session
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                <DollarSign size={16} />
                {booking.totalPrice}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs bg-white/5 p-3 rounded-lg border border-white/10">
              <Calendar size={16} className="text-primary" />
              <span className="font-medium italic">
                {new Date(booking.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground p-3">
              <Clock size={16} />
              <span className="italic">
                {booking.slot}
              </span>
            </div>
          </div>

          {reviewingId === booking.id ? (
            <div className="mt-4 space-y-4 p-4 rounded-xl bg-white/10 border border-white/20 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} className="text-amber-400" />
                <span className="text-xs font-bold uppercase italic">
                  Leave a Review
                </span>
              </div>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Star
                      size={22}
                      className={
                        star <= rating ? "text-amber-400 fill-amber-400" : "text-white/20"
                      }
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your learning experience..."
                className="w-full bg-black/20 border border-white/20 rounded-lg p-3 text-xs italic outline-none focus:border-primary/50 resize-none"
                rows={3}
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleReviewSubmit(booking)}
                  disabled={loading}
                  className="flex-1 bg-primary text-white font-bold py-2 rounded-lg text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Submit Review
                </button>
                <button
                  onClick={() => setReviewingId(null)}
                  className="px-4 bg-white/10 text-white font-bold py-2 rounded-lg text-xs hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setReviewingId(booking.id)}
              className="w-full mt-2 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              Leave Review
            </button>
          )}
        </GlassCard>
      ))}
      {bookings.length === 0 && (
        <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
          <Quote size={64} className="mx-auto mb-4 opacity-10" />
          <p className="text-muted-foreground italic text-lg">No sessions booked yet.</p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Start your learning journey by booking a tutor!
          </p>
        </div>
      )}
    </div>
  );
}
