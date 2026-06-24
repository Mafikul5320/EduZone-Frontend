"use client"

import React, { useEffect, useState } from 'react';
import { Calendar, BookOpen, Star, User, CheckCircle, Clock, ArrowRight, PlayCircle } from 'lucide-react';
import { getStudentDashboardStatsAction } from '@/action/user.action';
import { StudentDashboardData } from '@/types/student.type';
import Image from 'next/image';
import Link from 'next/link';

const StudentDashboard = () => {
  const [alldata, setAlldata] = useState<{ success: boolean; data: StudentDashboardData } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getStudentDashboardStatsAction();
      setAlldata(res);
    };
    fetchStats();
  }, []);

  const studentData = alldata?.data;

  if (!studentData) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center m-4 rounded-[2.5rem] bg-[#0B1120] border border-white/10">
        <div className="animate-pulse flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700"></div>
          <div className="h-4 w-40 bg-slate-800/50 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[85vh] bg-[#0B1120] text-slate-100 p-6 md:p-10 overflow-hidden rounded-[2.5rem] shadow-2xl m-4 border border-white/10">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10 z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" /> Active Student
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Welcome Back, {studentData.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-slate-400 text-lg">Track your learning journey and upcoming sessions.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-2 pr-5 rounded-full backdrop-blur-md shadow-xl hover:bg-white/[0.05] transition-colors">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
               <Image src={studentData.image || "/default-avatar.png"} alt="Profile" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{studentData.name}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{studentData.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Bookings", value: studentData._count.bookings, icon: Calendar, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
            { title: "Reviews Given", value: studentData._count.reviews, icon: Star, color: "from-amber-500 to-orange-400", shadow: "shadow-amber-500/20" },
            { title: "Profile Status", value: "Active", icon: CheckCircle, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/20" },
          ].map((stat, i) => (
            <div key={i} className={`group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${stat.shadow}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-400">{stat.title}</p>
                  <p className="text-4xl font-extrabold text-white tracking-tight">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                  <stat.icon size={26} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Bookings Table/List */}
          <div className="lg:col-span-2 relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col">
            <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h2 className="font-bold text-xl text-white flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/20">
                  <BookOpen size={20} />
                </div>
                Recent Bookings
              </h2>
              <button className="text-sm text-blue-400 font-bold hover:text-blue-300 transition-colors flex items-center gap-1">
                View all <ArrowRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto flex-1 p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tutor</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Slot</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {studentData.bookings.length > 0 ? studentData.bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white/[0.03] transition-colors group/row cursor-pointer">
                      <td className="p-4">
                        <p className="font-bold text-slate-200 group-hover/row:text-white transition-colors">{booking.tutor.user.name}</p>
                        <div className="flex gap-1.5 mt-2">
                          {booking.tutor.subjects.slice(0, 2).map(s => (
                            <span key={s} className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 rounded-full font-bold uppercase tracking-wide">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                          <Clock size={14} className="text-slate-500" />
                          <span>{booking.slot}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5 font-medium">
                          {new Date(booking.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                      </td>
                      <td className="p-4 font-bold text-emerald-400">
                        ${booking.totalPrice}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase border
                          ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          booking.status === 'PAID' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-500">
                        No recent bookings found. Time to start learning!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="relative rounded-[2rem] p-8 overflow-hidden group shadow-[0_0_40px_rgba(59,130,246,0.15)] border border-blue-500/20 bg-gradient-to-br from-blue-600 to-indigo-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <PlayCircle size={24} className="text-white" />
                </div>
                <h3 className="font-extrabold text-2xl mb-2 text-white">Ready for a lesson?</h3>
                <p className="text-blue-100 text-sm mb-8 leading-relaxed">Discover expert tutors in Next.js, Prisma, and more.</p>
                <Link href="/tutors" className="w-full py-3.5 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-xl active:scale-95 flex items-center justify-center gap-2">
                  Find a Tutor <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-white/20 transition-all duration-500">
              <h3 className="font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl text-slate-400 border border-white/5">
                  <User size={18} /> 
                </div>
                Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 font-medium">Email Verified</span>
                  <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20">Yes</span>
                </div>
                <div className="flex items-center justify-between text-sm p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 font-medium">Joined On</span>
                  <span className="text-slate-200 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">April 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;