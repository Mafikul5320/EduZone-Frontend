import { Calendar, Clock, Star, BookOpen, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data
const upcomingBookings = [
  {
    id: "1",
    tutorName: "Dr. Sarah Johnson",
    subject: "Mathematics",
    date: "2024-04-28",
    time: "10:00 AM - 11:00 AM",
    status: "confirmed",
  },
  {
    id: "2",
    tutorName: "Prof. Michael Chen",
    subject: "Computer Science",
    date: "2024-04-29",
    time: "2:00 PM - 3:00 PM",
    status: "confirmed",
  },
];

const recentSessions = [
  {
    id: "1",
    tutorName: "Emily Rodriguez",
    subject: "English Literature",
    date: "2024-04-20",
    duration: "1 hour",
    rating: 5,
  },
  {
    id: "2",
    tutorName: "Dr. Sarah Johnson",
    subject: "Physics",
    date: "2024-04-18",
    duration: "1 hour",
    rating: 5,
  },
];

const stats = [
  {
    title: "Total Sessions",
    value: "24",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Hours Learned",
    value: "36",
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Avg Rating Given",
    value: "4.8",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Achievements",
    value: "8",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export default function StudentDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
        <p className="text-blue-100 mb-6">
          You have {upcomingBookings.length} upcoming sessions this week
        </p>
        <Link href="/tutors">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Browse Tutors
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="text-blue-600" />
                Upcoming Sessions
              </span>
              <Link href="/student-dashboard/bookings">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{booking.tutorName}</h4>
                        <p className="text-sm text-gray-600">{booking.subject}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Join Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No upcoming sessions</p>
                <Link href="/tutors">
                  <Button className="mt-4" variant="outline">Book a Session</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="text-blue-600" />
                Recent Sessions
              </span>
              <Link href="/student-dashboard/history">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{session.tutorName}</h4>
                      <p className="text-sm text-gray-600">{session.subject}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{session.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Book Again
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Mathematics</span>
                <span className="text-sm text-gray-600">12 sessions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Computer Science</span>
                <span className="text-sm text-gray-600">8 sessions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">English Literature</span>
                <span className="text-sm text-gray-600">4 sessions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
