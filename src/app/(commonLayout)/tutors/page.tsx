import { Search, Filter, Star, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// Mock data - Replace with API call
const tutors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    image: "/placeholder-tutor.jpg",
    expertise: ["Mathematics", "Physics"],
    hourlyRate: 50,
    rating: 4.9,
    totalReviews: 127,
    totalSessions: 450,
    bio: "PhD in Mathematics with 10+ years of teaching experience"
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    image: "/placeholder-tutor.jpg",
    expertise: ["Computer Science", "Programming"],
    hourlyRate: 60,
    rating: 4.8,
    totalReviews: 98,
    totalSessions: 320,
    bio: "Senior Software Engineer and CS Professor"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    image: "/placeholder-tutor.jpg",
    expertise: ["English", "Literature"],
    hourlyRate: 40,
    rating: 5.0,
    totalReviews: 156,
    totalSessions: 580,
    bio: "Master's in English Literature, passionate educator"
  },
];

const categories = [
  "All Subjects",
  "Mathematics",
  "Science",
  "English",
  "Computer Science",
  "Languages",
  "Arts",
];

export default function TutorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Tutor
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with expert tutors and start learning today
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-xl p-2 flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="text-gray-400" size={20} />
                <Input
                  placeholder="Search by subject, tutor name..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h3>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Under $30/hr</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">$30 - $50/hr</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">$50 - $100/hr</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">$100+/hr</span>
                    </label>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rating}+ Stars</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Tutors Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Tutors <span className="text-gray-500 text-lg">({tutors.length})</span>
              </h2>
              <select className="border rounded-lg px-4 py-2 text-sm">
                <option>Sort by: Recommended</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Tutor Image */}
                      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                          {tutor.name.charAt(0)}
                        </div>
                      </div>

                      {/* Tutor Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{tutor.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tutor.bio}</p>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tutor.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{tutor.rating}</span>
                            <span>({tutor.totalReviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={16} />
                            <span>{tutor.totalSessions} sessions</span>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">
                              ${tutor.hourlyRate}
                            </span>
                            <span className="text-gray-600 text-sm">/hour</span>
                          </div>
                          <Link href={`/tutors/${tutor.id}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
