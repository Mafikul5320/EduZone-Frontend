"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getSingleTutorAction } from "@/action/tutor.action";
import { initiatePaymentAction } from "@/action/payment.action";
import {
  Star, Clock, BookOpen, DollarSign, CheckCircle, Loader2,
  Calendar, Award, MessageSquare, ChevronLeft, ShieldCheck
} from "lucide-react";
import Link from "next/link";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    name: string;
    image: string | null;
  };
}

interface TutorDetails {
  id: string;
  bio: string;
  pricePerHour: number;
  subjects: string[];
  rating: number;
  availabilities: { id: string; day: string; startTime: string; endTime: string }[];
  user: { name: string; image: string; email: string };
  category: { id: string; name: string } | null;
  reviews: Review[];
}

export default function TutorProfilePage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState<TutorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [date, setDate] = useState("");
  const [isPending, startTransition] = useTransition();
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchTutor = async () => {
      try {
        const res = await getSingleTutorAction(id as string);
        if (res?.data) {
          console.log(res.data)
          setTutor(res.data);
        } else {
          setError(res?.message || "Tutor not found");
        }
      } catch (err) {
        setError("Error fetching tutor profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleBook = () => {
    if (!tutor) return;
    if (!selectedSlotId || !date) {
      setBookingError("Please select a slot and date.");
      return;
    }
    setBookingError("");
    startTransition(async () => {
      try {
        const res = await initiatePaymentAction({
          amount: tutor.pricePerHour,
          totalPrice: tutor.pricePerHour,
          tutorId: tutor.id,
          slot: selectedSlotId,
          date
        });
        if (res?.success && res?.data?.gatewayUrl) {
          window.location.replace(res.data.gatewayUrl);
        } else {
          setBookingError(res?.message || "Payment initiation failed. Please try again.");
        }
      } catch (err) {
        setBookingError("An error occurred during payment initiation.");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading tutor profile...</p>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">{error || "Tutor not found"}</h2>
        <Link href="/tutors" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          Back to Tutors
        </Link>
      </div>
    );
  }

  const stars = Math.round(tutor.rating || 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ─── HERO HEADER ─── */}
      <div className="relative bg-gradient-to-br from-primary via-secondary to-background pt-32 pb-40 overflow-hidden">
        {/* Abstract Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/tutors" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground font-semibold mb-8 backdrop-blur-sm bg-background/20 px-4 py-2 rounded-full border border-border/50 transition-all">
            <ChevronLeft size={18} /> Back to Search
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] border-8 border-background/20 shadow-2xl overflow-hidden bg-background">
              <Image
                src={tutor.user.image || "/default-avatar.png"}
                alt={tutor.user.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                {tutor.category && (
                  <span className="px-3 py-1 bg-secondary/30 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                    {tutor.category.name}
                  </span>
                )}
                <div className="flex items-center gap-1 bg-background/20 px-3 py-1 rounded-full backdrop-blur-sm border border-border/50">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-foreground">{(tutor.rating || 0).toFixed(1)}</span>
                  <span className="text-xs text-foreground/70">({tutor.reviews?.length || 0} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2 drop-shadow-sm">{tutor.user.name}</h1>
              <p className="text-lg text-foreground/80 font-medium">Expert Tutor</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="container mx-auto px-4 relative z-20 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (Details & Reviews) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="glass p-8 rounded-3xl border border-border shadow-xl">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
                <Award className="text-primary" /> About Me
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                {tutor.bio}
              </p>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Subjects Taught</h4>
                <div className="flex flex-wrap gap-2">
                  {(tutor.subjects || []).map((sub, i) => (
                    <span key={i} className="px-4 py-2 bg-secondary/10 text-foreground border border-border rounded-xl font-semibold text-sm">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="glass p-8 rounded-3xl border border-border shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="text-primary" /> Student Reviews
                </h3>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-sm">
                  {tutor.reviews?.length || 0} Total
                </span>
              </div>

              {(!tutor.reviews || tutor.reviews.length === 0) ? (
                <div className="text-center py-12 bg-secondary/10 rounded-2xl border border-border border-dashed">
                  <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No reviews yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {tutor.reviews.map((rev) => (
                    <div key={rev.id} className="p-6 bg-background rounded-2xl border border-border shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                            <Image src={rev.student.image || "/default-avatar.png"} alt={rev.student.name} width={48} height={48} className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{rev.student.name}</p>
                            <p className="text-xs text-muted-foreground">{new Date(rev.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} className={i < rev.rating ? "fill-primary text-primary" : "text-muted-foreground/30 fill-muted-foreground/30"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Booking Widget) */}
          <div className="lg:sticky lg:top-24">
            <div className="glass p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <p className="text-muted-foreground font-medium">Session Rate</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary">${tutor.pricePerHour}</span>
                  <span className="text-sm text-muted-foreground font-medium">/ hr</span>
                </div>
              </div>

              {bookingDone ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h4>
                  <p className="text-sm text-muted-foreground">Your session has been booked successfully. You can manage it from your dashboard.</p>
                </div>
              ) : (
                <div className="space-y-6 relative z-10">
                  {/* Select Slot */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-primary" /> Select Availability
                    </label>
                    {(tutor.availabilities ?? []).length === 0 ? (
                      <div className="p-4 bg-secondary/10 border border-border rounded-xl text-center">
                        <p className="text-sm text-muted-foreground font-medium">No slots available right now.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {(tutor.availabilities ?? []).map((slot) => (
                          <label key={slot.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
                            ${selectedSlotId === slot.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 bg-background"}`}>
                            <input
                              type="radio"
                              name="slot"
                              value={slot.id}
                              className="accent-primary w-4 h-4"
                              onChange={() => setSelectedSlotId(slot.id)}
                            />
                            <div className="flex flex-col flex-1">
                              <span className="text-sm font-bold text-foreground">{slot.day}</span>
                              <span className="text-xs text-muted-foreground font-medium">{slot.startTime} – {slot.endTime}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <Calendar size={16} className="text-primary" /> Session Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border-2 border-border focus:border-primary bg-background text-foreground rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors shadow-sm"
                    />
                  </div>

                  {bookingError && <p className="text-destructive text-sm font-semibold text-center bg-destructive/10 p-2 rounded-lg">{bookingError}</p>}

                  <button
                    onClick={handleBook}
                    disabled={isPending || (tutor.availabilities ?? []).length === 0}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground rounded-xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                  >
                    {isPending ? <><Loader2 size={20} className="animate-spin" /> Processing…</> : <>Book Now</>}
                  </button>

                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 mt-4">
                    <ShieldCheck size={12} /> Secure payment via SSLCommerz
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: hsl(var(--border));
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
