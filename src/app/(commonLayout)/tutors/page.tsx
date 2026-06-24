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
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 pb-14">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition"
          >
            <X size={16} />
          </button>
          <p className="text-emerald-100 text-sm font-medium mb-1">Booking Session with</p>
          <h2 className="text-white text-2xl font-bold">{tutor.user.name}</h2>
        </div>

        {/* Avatar overlap */}
        <div className="flex justify-center -mt-10 mb-2">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
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
            <CheckCircle size={52} className="text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-800">Booking Confirmed!</h3>
            <p className="text-slate-500 text-sm">Your session has been booked successfully. Check your dashboard for details.</p>
            <button
              onClick={onClose}
              className="mt-4 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4">
            {/* Price info */}
            <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3">
              <span className="text-slate-600 text-sm flex items-center gap-1.5"><DollarSign size={14} /> Rate</span>
              <span className="font-bold text-emerald-600 text-lg">${tutor.pricePerHour}/hr</span>
            </div>

            {/* Select Slot */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                <Clock size={13} className="inline mr-1" />Select Availability Slot
              </label>
              {(tutor.availabilities ?? []).length === 0 ? (
                <p className="text-sm text-slate-400 italic">No available slots at this time.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
                  {(tutor.availabilities ?? []).map((slot) => (
                    <label key={slot.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedSlotId === slot.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-300"}`}>
                      <input
                        type="radio"
                        name="slot"
                        value={slot.id}
                        className="accent-emerald-500"
                        onChange={() => setSelectedSlotId(slot.id)}
                      />
                      <span className="text-sm font-semibold text-slate-700 w-24">{slot.day}</span>
                      <span className="text-xs text-slate-500">{slot.startTime} – {slot.endTime}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Session Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border-2 border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handleBook}
              disabled={isPending}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
            >
              {isPending ? <><Loader2 size={18} className="animate-spin" /> Processing Payment…</> : <>Confirm Booking</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tutor Card ────────────────────────────────────────────────────────────────

function TutorCard({ tutor, onBook }: { tutor: TutorProfile; onBook: (t: TutorProfile) => void }) {
  const stars = Math.round(tutor.rating);
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Card Top */}
      <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 px-6 pt-6 pb-4">
        {tutor.category && (
          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-teal-100 text-teal-700 px-2.5 py-0.5 rounded-full tracking-wide">
            {tutor.category.name}
          </span>
        )}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0">
            <Image
              src={tutor.user.image || "/default-avatar.png"}
              alt={tutor.user.name}
              width={64} height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-tight">{tutor.user.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < stars ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}
                />
              ))}
              <span className="text-xs text-slate-400 ml-1">{(tutor.rating ?? 0).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 py-3 flex-1">
        {tutor.bio && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-3">{tutor.bio}</p>
        )}

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(tutor.subjects ?? []).slice(0, 4).map(s => (
            <span key={s} className="bg-blue-50 text-blue-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
              {s}
            </span>
          ))}
          {(tutor.subjects ?? []).length > 4 && (
            <span className="text-[11px] text-slate-400 px-1">+{(tutor.subjects ?? []).length - 4} more</span>
          )}
        </div>

        {/* Availability pills */}
        {(tutor.availabilities ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {(tutor.availabilities ?? []).slice(0, 3).map(a => (
              <span key={a.id} className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock size={9} />{a.day}
              </span>
            ))}
            {(tutor.availabilities ?? []).length > 3 && (
              <span className="text-[10px] text-slate-400">+{(tutor.availabilities ?? []).length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Per hour</p>
          <p className="text-xl font-bold text-emerald-600">${tutor.pricePerHour}</p>
        </div>
        <button
          onClick={() => onBook(tutor)}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow shadow-emerald-200 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <BookOpen size={14} /> Book Now
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TutorPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingTutor, setBookingTutor] = useState<TutorProfile | null>(null);

  const [filters, setFilters] = useState<FilterParams>({
    searchTerm: "",
    categoryId: "",
    minPrice: 0,
    maxPrice: 500,
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#0f4c75] via-[#1b6ca8] to-[#00897b] py-16 px-6 text-center overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/20">
            <Sparkles size={12} className="text-amber-300" /> 500+ Verified Expert Tutors
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Find Your Perfect<br /><span className="text-emerald-300">Tutor</span> Today
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Browse, filter, and book sessions with top-rated tutors in minutes.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search by name or subject…"
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-800 bg-white shadow-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                ${sidebarOpen ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
            <span className="text-slate-400 text-sm">
              {loading ? "Loading…" : `${tutors.length} tutor${tutors.length !== 1 ? "s" : ""} found`}
            </span>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              className="appearance-none pl-8 pr-8 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 cursor-pointer transition"
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
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 flex-shrink-0 space-y-5">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Filter size={15} /> Filters
                  </h3>
                  <button
                    onClick={() => {
                      const reset: FilterParams = { searchTerm: "", categoryId: "", minPrice: 0, maxPrice: 500, sortBy: "rating", sortOrder: "desc" };
                      setFilters(reset);
                      setSearchInput("");
                      fetchTutors(reset);
                    }}
                    className="text-xs text-emerald-600 font-semibold hover:underline"
                  >
                    Reset all
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 mb-3">
                    <DollarSign size={13} /> Price Range
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 mb-1">Min</p>
                      <input
                        type="number"
                        min={0}
                        max={filters.maxPrice}
                        value={filters.minPrice}
                        onChange={e => applyFilters({ minPrice: Number(e.target.value) })}
                        className="w-full border-2 border-slate-200 focus:border-emerald-400 rounded-lg px-2.5 py-1.5 text-sm outline-none transition"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 mb-1">Max</p>
                      <input
                        type="number"
                        min={filters.minPrice}
                        value={filters.maxPrice}
                        onChange={e => applyFilters({ maxPrice: Number(e.target.value) })}
                        className="w-full border-2 border-slate-200 focus:border-emerald-400 rounded-lg px-2.5 py-1.5 text-sm outline-none transition"
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
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>$0</span><span>$500</span>
                    </div>
                  </div>
                </div>

                {/* Active Filters badge */}
                {(filters.categoryId || filters.minPrice > 0 || filters.maxPrice < 500) && (
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Active Filters</p>
                    <div className="flex flex-wrap gap-1.5">
                      {filters.minPrice > 0 && (
                        <span className="bg-emerald-100 text-emerald-700 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          Min ${filters.minPrice}
                          <button onClick={() => applyFilters({ minPrice: 0 })}><X size={10} /></button>
                        </span>
                      )}
                      {filters.maxPrice < 500 && (
                        <span className="bg-emerald-100 text-emerald-700 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
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
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
                    <div className="h-32 bg-slate-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-slate-100 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                      <div className="h-3 bg-slate-100 rounded w-full" />
                      <div className="h-8 bg-slate-100 rounded-xl mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : tutors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                  <GraduationCap size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No tutors found</h3>
                <p className="text-slate-400 max-w-xs">Try adjusting your filters or search with different keywords.</p>
                <button
                  onClick={() => {
                    const reset: FilterParams = { searchTerm: "", categoryId: "", minPrice: 0, maxPrice: 500, sortBy: "rating", sortOrder: "desc" };
                    setFilters(reset);
                    setSearchInput("");
                    fetchTutors(reset);
                  }}
                  className="mt-6 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition"
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