"use client"

import React, { useEffect, useState } from 'react';
import { Calendar, BookOpen, Star, User, CheckCircle, Clock } from 'lucide-react';
import { getStudentDashboardStatsAction } from '@/action/user.action';
import { StudentDashboardData } from '@/types/student.type';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  console.log(studentData);
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back, {studentData.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500">Here&apos;s what&apos;s happening with your learning journey.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full shadow-sm border border-slate-200">
          <img src={studentData.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold leading-none">{studentData.name}</p>
            <p className="text-xs text-slate-400">{studentData.email}</p>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Bookings</p>
            <p className="text-2xl font-bold">{studentData._count.bookings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Reviews Given</p>
            <p className="text-2xl font-bold">{studentData._count.reviews}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Profile Status</p>
            <p className="text-lg font-bold text-green-600 uppercase tracking-wide text-sm">Active</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Bookings Table/List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-500" /> Recent Bookings
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Tutor</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Date & Slot</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Price</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentData.bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-slate-700">{booking.tutor.user.name}</p>
                        <div className="flex gap-1 mt-1">
                          {booking.tutor.subjects.slice(0, 2).map(s => (
                            <span key={s} className="px-2 py-0.5 bg-blue-50 text-[10px] text-blue-600 rounded-full font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock size={14} className="text-slate-400" />
                          <span>{booking.slot}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 italic">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">
                        ${booking.totalPrice}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className=" rounded-2xl p-6 text-black shadow-lg shadow-blue-200">
            <h3 className="font-bold text-lg mb-2">Ready for a new lesson?</h3>
            <p className="text-black text-sm mb-4">Discover expert tutors in Next.js, Prisma, and more.</p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-md">
              Find New Tutor
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User size={18} className="text-slate-400" /> Account Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Email Verified</span>
                <span className="text-green-600 font-medium">Yes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Joined On</span>
                <span className="text-slate-700 font-medium">April 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;