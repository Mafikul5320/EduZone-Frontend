/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback, useTransition } from "react";
import { filterTutorsAction } from "@/action/tutor.action";
import { createBookingAction } from "@/action/booking.action";
import {
  Search, Star, SlidersHorizontal, X, BookOpen, DollarSign,
  Clock, ChevronDown, ArrowUpDown, Loader2, CheckCircle, Filter,
  GraduationCap, MapPin, Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface TutorProfile {
  id: string;
  bio: string;
  pricePerHour: number;
  subjects: string[];
  rating: number;
  availabilities: { id: string; day: string; startTime: string; endTime: string }[];
  user: { name: string; image: string };
  category: Category | null;
  _count?: { bookings: number };
}

interface FilterParams {
  searchTerm: string;
  categoryId: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

import { initiatePaymentAction } from "@/action/payment.action";

function BookModal({ tutor, onClose }: { tutor: TutorProfile; onClose: () => void }) {
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [date, setDate] = useState("");
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleBook = () => {
    if (!selectedSlotId || !date) {
      setError("Please select a slot and date.");
      return;
    }
    setError("");
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
          setError(res?.message || "Payment initiation failed. Please try again.");
        }
      } catch (err: any) {
        setError("An error occurred during payment initiation.");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
      <div className="relative w-full max-w-md bg-background rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-14">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-primary-foreground transition"
          >
            <X size={16} />
          </button>
          <p className="text-primary-foreground/80 text-sm font-medium mb-1">Booking Session with</p>
          <h2 className="text-primary-foreground text-2xl font-bold">{tutor.user.name}</h2>
        </div>

        {/* Avatar overlap */}
        <div className="flex justify-center -mt-10 mb-2">
          <div className="w-20 h-20 rounded-full border-4 border-background shadow-lg overflow-hidden">
            <Image
              src={tutor.user.image || "/default-avatar.png"}
              alt={tutor.user.name}
              width={80} height={80}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 px-8 py-8 text-center">
            <CheckCircle size={52} className="text-primary" />
            <h3 className="text-xl font-bold text-foreground">Booking Confirmed!</h3>
            <p className="text-muted-foreground text-sm">Your session has been booked successfully. Check your dashboard for details.</p>
            <button
              onClick={onClose}
              className="mt-4 w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4">
            {/* Price info */}
            <div className="flex items-center justify-between bg-secondary/10 rounded-xl px-4 py-3">
              <span className="text-muted-foreground text-sm flex items-center gap-1.5"><DollarSign size={14} /> Rate</span>
              <span className="font-bold text-primary text-lg">${tutor.pricePerHour}/hr</span>
            </div>

            {/* Select Slot */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                <Clock size={13} className="inline mr-1" />Select Availability Slot
              </label>
              {(tutor.availabilities ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No available slots at this time.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
                  {(tutor.availabilities ?? []).map((slot) => (
                    <label key={slot.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedSlotId === slot.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                      <input
                        type="radio"
                        name="slot"
                        value={slot.id}
                        className="accent-primary"
                        onChange={() => setSelectedSlotId(slot.id)}
                      />
                      <span className="text-sm font-semibold text-foreground w-24">{slot.day}</span>
                      <span className="text-xs text-muted-foreground">{slot.startTime} – {slot.endTime}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Session Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border-2 border-border focus:border-primary bg-background text-foreground rounded-xl px-4 py-2.5 text-sm outline-none transition"
              />
            </div>

            {error && <p className="text-destructive text-sm text-center">{error}</p>}

            <button
              onClick={handleBook}
              disabled={isPending}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
            >
              {isPending ? <><Loader2 size={18} className="animate-spin" /> Processing Payment…</> : <>Confirm Booking</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



function TutorCard({ tutor, onBook }: { tutor: TutorProfile; onBook: (t: TutorProfile) => void }) {
  const stars = Math.round(tutor.rating);
  return (
    <div className="group bg-background rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col relative z-10 glass">
      {/* Card Top */}
      <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 px-6 pt-6 pb-4">
        {tutor.category && (
          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full tracking-wide">
            {tutor.category.name}
          </span>
        )}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-background shadow-md flex-shrink-0">
            <Image
              src={tutor.user.image || "/default-avatar.png"}
              alt={tutor.user.name}
              width={64} height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <Link href={`/tutors/${tutor.id}`}>
                <h3 className="font-bold text-foreground text-base leading-tight hover:text-primary transition-colors">{tutor.user.name}</h3>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < stars ? "fill-primary text-primary" : "text-muted-foreground fill-muted-foreground"}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{(tutor.rating ?? 0).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 py-3 flex-1">
        {tutor.bio && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{tutor.bio}</p>
        )}

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(tutor.subjects ?? []).slice(0, 4).map(s => (
            <span key={s} className="bg-secondary/20 text-foreground text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-border">
              {s}
            </span>
          ))}
          {(tutor.subjects ?? []).length > 4 && (
            <span className="text-[11px] text-muted-foreground px-1">+{(tutor.subjects ?? []).length - 4} more</span>
          )}
        </div>

        {/* Availability pills */}
        {(tutor.availabilities ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {(tutor.availabilities ?? []).slice(0, 3).map(a => (
              <span key={a.id} className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock size={9} />{a.day}
              </span>
            ))}
            {(tutor.availabilities ?? []).length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{(tutor.availabilities ?? []).length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Per hour</p>
          <p className="text-xl font-bold text-primary">${tutor.pricePerHour}</p>
        </div>
        <div className="flex gap-2">
            <Link href={`/tutors/${tutor.id}`}>
                <button
                className="px-4 py-2.5 bg-secondary/10 hover:bg-secondary/20 text-foreground text-sm font-bold rounded-xl transition-all border border-border flex items-center gap-1.5"
                >
                Profile
                </button>
            </Link>
            <button
            onClick={() => onBook(tutor)}
            className="px-4 py-2.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground text-sm font-bold rounded-xl shadow active:scale-95 transition-all flex items-center gap-1.5"
            >
            <BookOpen size={14} /> Book
            </button>
        </div>
      </div>
    </div>
  );
}



export default function TutorPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingTutor, setBookingTutor] = useState<TutorProfile | null>(null);

  const [filters, setFilters] = useState<FilterParams>({
    searchTerm: "",
    categoryId: "",
    minPrice: 0,
    maxPrice: 50000,
    sortBy: "rating",
    sortOrder: "desc",
  });

  // Debounced search
  const [searchInput, setSearchInput] = useState("");

  const fetchTutors = useCallback(async (params: FilterParams) => {
    setLoading(true);
    try {
      const res = await filterTutorsAction({
        searchTerm: params.searchTerm || undefined,
        categoryId: params.categoryId || undefined,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      });
      setTutors(res?.data || []);
    } catch {
      setTutors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTutors(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = { ...filters, searchTerm: searchInput };
      setFilters(updated);
      fetchTutors(updated);
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const applyFilters = (partial: Partial<FilterParams>) => {
    const updated = { ...filters, ...partial };
    setFilters(updated);
    fetchTutors(updated);
  };

  const sortOptions = [
    { label: "Top Rated", value: "rating", order: "desc" as const },
    { label: "Price: Low to High", value: "pricePerHour", order: "asc" as const },
    { label: "Price: High to Low", value: "pricePerHour", order: "desc" as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-primary via-secondary to-background py-16 px-6 text-center overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-background/20 text-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-border">
            <Sparkles size={12} className="text-primary" /> 500+ Verified Expert Tutors
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Find Your Perfect<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Tutor</span> Today
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Browse, filter, and book sessions with top-rated tutors in minutes.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search by name or subject…"
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-foreground bg-background border border-border shadow-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary transition glass"
            />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                ${sidebarOpen ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-foreground hover:border-primary/50"}`}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
            <span className="text-muted-foreground text-sm">
              {loading ? "Loading…" : `${tutors.length} tutor${tutors.length !== 1 ? "s" : ""} found`}
            </span>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select
              className="appearance-none pl-8 pr-8 py-2.5 rounded-xl border-2 border-border bg-background text-sm font-semibold text-foreground outline-none focus:border-primary cursor-pointer transition"
              value={`${filters.sortBy}:${filters.sortOrder}`}
              onChange={e => {
                const [sortBy, sortOrder] = e.target.value.split(":") as [string, "asc" | "desc"];
                applyFilters({ sortBy, sortOrder });
              }}
            >
              {sortOptions.map(o => (
                <option key={o.label} value={`${o.value}:${o.order}`}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 flex-shrink-0 space-y-5">
              <div className="bg-background rounded-2xl border border-border shadow-sm p-5 glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Filter size={15} /> Filters
                  </h3>
                  <button
                    onClick={() => {
                      const reset: FilterParams = { searchTerm: "", categoryId: "", minPrice: 0, maxPrice: 500, sortBy: "rating", sortOrder: "desc" };
                      setFilters(reset);
                      setSearchInput("");
                      fetchTutors(reset);
                    }}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Reset all
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-3">
                    <DollarSign size={13} /> Price Range
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground mb-1">Min</p>
                      <input
                        type="number"
                        min={0}
                        max={filters.maxPrice}
                        value={filters.minPrice}
                        onChange={e => applyFilters({ minPrice: Number(e.target.value) })}
                        className="w-full border-2 border-border focus:border-primary bg-background text-foreground rounded-lg px-2.5 py-1.5 text-sm outline-none transition"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground mb-1">Max</p>
                      <input
                        type="number"
                        min={filters.minPrice}
                        value={filters.maxPrice}
                        onChange={e => applyFilters({ maxPrice: Number(e.target.value) })}
                        className="w-full border-2 border-border focus:border-primary bg-background text-foreground rounded-lg px-2.5 py-1.5 text-sm outline-none transition"
                      />
                    </div>
                  </div>
                  {/* Price slider */}
                  <div className="mt-3 space-y-1">
                    <input
                      type="range"
                      min={0}
                      max={500}
                      step={5}
                      value={filters.maxPrice}
                      onChange={e => applyFilters({ maxPrice: Number(e.target.value) })}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>$0</span><span>$500</span>
                    </div>
                  </div>
                </div>

                {/* Active Filters badge */}
                {(filters.categoryId || filters.minPrice > 0 || filters.maxPrice < 500) && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Active Filters</p>
                    <div className="flex flex-wrap gap-1.5">
                      {filters.minPrice > 0 && (
                        <span className="bg-primary/10 text-primary text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          Min ${filters.minPrice}
                          <button onClick={() => applyFilters({ minPrice: 0 })}><X size={10} /></button>
                        </span>
                      )}
                      {filters.maxPrice < 500 && (
                        <span className="bg-primary/10 text-primary text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          Max ${filters.maxPrice}
                          <button onClick={() => applyFilters({ maxPrice: 500 })}><X size={10} /></button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Tutor Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-background rounded-2xl border border-border overflow-hidden animate-pulse glass">
                    <div className="h-32 bg-secondary/10" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-secondary/20 rounded w-3/4" />
                      <div className="h-3 bg-secondary/20 rounded w-1/2" />
                      <div className="h-3 bg-secondary/20 rounded w-full" />
                      <div className="h-8 bg-secondary/20 rounded-xl mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : tutors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-5">
                  <GraduationCap size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No tutors found</h3>
                <p className="text-muted-foreground max-w-xs">Try adjusting your filters or search with different keywords.</p>
                <button
                  onClick={() => {
                    const reset: FilterParams = { searchTerm: "", categoryId: "", minPrice: 0, maxPrice: 500, sortBy: "rating", sortOrder: "desc" };
                    setFilters(reset);
                    setSearchInput("");
                    fetchTutors(reset);
                  }}
                  className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-bold transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} onBook={setBookingTutor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingTutor && (
        <BookModal tutor={bookingTutor} onClose={() => setBookingTutor(null)} />
      )}
    </div>
  );
}