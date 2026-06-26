"use client"

import React, { useEffect, useState } from 'react';
import { Calendar, BookOpen, Star, User, CheckCircle, Clock, ArrowRight, PlayCircle } from 'lucide-react';
import { getStudentDashboardStatsAction } from '@/action/user.action';
import { StudentDashboardData } from '@/types/student.type';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';

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
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20"></div>
          <div className="h-4 w-40 bg-secondary/10 rounded-full"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { title: "Total Bookings", value: studentData._count.bookings, icon: Calendar, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "Reviews Given", value: studentData._count.reviews, icon: Star, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400" },
    { title: "Profile Status", value: "Active", icon: CheckCircle, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" /> Active Student
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Welcome Back, {studentData.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">Track your learning journey and upcoming sessions.</p>
        </div>
        <div className="flex items-center gap-4 glass border border-border/50 p-2 pr-5 rounded-full shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-border shrink-0">
             <Image src={studentData.image || "/default-avatar.png"} alt="Profile" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">{studentData.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{studentData.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Bento Box Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="group relative overflow-hidden p-6">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 -translate-y-4 translate-x-4">
              <stat.icon size={100} />
            </div>
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <p className="text-4xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color} shadow-sm transform group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={26} strokeWidth={2.5} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Content Grid - Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bookings Table/List */}
        <GlassCard className="lg:col-span-2 overflow-hidden flex flex-col p-0 border-0">
          <div className="p-6 md:p-8 border-b border-border/50 flex justify-between items-center bg-secondary/5">
            <h2 className="font-extrabold text-xl text-foreground flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <BookOpen size={20} />
              </div>
              Recent Bookings
            </h2>
            <Link href="/student-dashboard/bookings" className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Tutor</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date & Slot</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {studentData.bookings.length > 0 ? studentData.bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-secondary/5 transition-colors group/row cursor-pointer">
                    <td className="p-4">
                      <p className="font-bold text-foreground group-hover/row:text-primary transition-colors">{booking.tutor.user.name}</p>
                      <div className="flex gap-1.5 mt-2">
                        {booking.tutor.subjects.slice(0, 2).map(s => (
                          <span key={s} className="px-2.5 py-0.5 bg-primary/10 text-[10px] text-primary rounded-full font-bold uppercase tracking-wide">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                        <Clock size={14} className="text-muted-foreground" />
                        <span>{booking.slot}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                        {new Date(booking.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </td>
                    <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                      ${booking.totalPrice}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase border
                        ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
                        booking.status === 'PAID' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                        'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-muted-foreground">
                      No recent bookings found. Time to start learning!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Sidebar Info - Bento Layout */}
        <div className="space-y-6">
          <GlassCard className="p-8 relative overflow-hidden group shadow-md border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-500 to-indigo-600">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
                <PlayCircle size={24} className="text-white" />
              </div>
              <h3 className="font-extrabold text-2xl mb-2 text-white">Ready for a lesson?</h3>
              <p className="text-blue-100 text-sm mb-8 leading-relaxed">Discover expert tutors in Next.js, Prisma, and more.</p>
              <Link href="/tutors" className="w-full py-3.5 bg-white text-blue-700 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow active:scale-95 flex items-center justify-center gap-2">
                Find a Tutor <ArrowRight size={16} />
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="font-extrabold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary">
                <User size={18} /> 
              </div>
              Account Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm p-4 rounded-xl border border-transparent hover:border-border/50 hover:bg-background/50 transition-colors shadow-sm">
                <span className="text-muted-foreground font-bold">Email Verified</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">Yes</span>
              </div>
              <div className="flex items-center justify-between text-sm p-4 rounded-xl border border-transparent hover:border-border/50 hover:bg-background/50 transition-colors shadow-sm">
                <span className="text-muted-foreground font-bold">Joined On</span>
                <span className="text-foreground font-bold bg-secondary/10 px-3 py-1 rounded-full">April 2026</span>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;