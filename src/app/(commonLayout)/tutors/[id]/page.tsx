import { Star, MapPin, Clock, BookOpen, Award, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data - Replace with API call
const tutorDetails = {
  id: "1",
  name: "Dr. Sarah Johnson",
  image: "/placeholder-tutor.jpg",
  expertise: ["Mathematics", "Physics", "Calculus"],
  hourlyRate: 50,
  rating: 4.9,
  totalReviews: 127,
  totalSessions: 450,
  bio: "PhD in Mathematics with 10+ years of teaching experience. Specialized in helping students excel in advanced mathematics and physics.",
  education: [
    "PhD in Mathematics - MIT (2010)",
    "MSc in Applied Physics - Stanford (2006)",
  ],
  experience: "10+ years",
  languages: ["English", "Spanish"],
  availability: [
    { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Wednesday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Friday", slots: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"] },
  ],
  reviews: [
    {
      id: "1",
      studentName: "John Doe",
      rating: 5,
      comment: "Excellent tutor! Very patient and explains concepts clearly.",
      date: "2024-03-15",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      rating: 5,
      comment: "Helped me improve my calculus grade significantly. Highly recommend!",
      date: "2024-03-10",
    },
    {
      id: "3",
      studentName: "Mike Wilson",
      rating: 4,
      comment: "Great teaching style and very knowledgeable.",
      date: "2024-03-05",
    },
  ],
};

export default function TutorDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">
                      {tutorDetails.name.charAt(0)}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{tutorDetails.name}</h1>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star size={20} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-lg">{tutorDetails.rating}</span>
                            <span className="text-gray-600">({tutorDetails.totalReviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle size={14} className="mr-1" />
                        Verified
                      </Badge>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutorDetails.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <BookOpen size={18} className="text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Sessions</div>
                          <div className="font-semibold">{tutorDetails.totalSessions}+</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Award size={18} className="text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Experience</div>
                          <div className="font-semibold">{tutorDetails.experience}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Response</div>
                          <div className="font-semibold">Within 1hr</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{tutorDetails.bio}</p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorDetails.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={20} />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorDetails.availability.map((schedule) => (
                    <div key={schedule.day}>
                      <h4 className="font-semibold mb-2">{schedule.day}</h4>
                      <div className="flex flex-wrap gap-2">
                        {schedule.slots.map((slot, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews ({tutorDetails.totalReviews})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tutorDetails.reviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {review.studentName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{review.studentName}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                      {review.id !== tutorDetails.reviews[tutorDetails.reviews.length - 1].id && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-1">
                    ${tutorDetails.hourlyRate}
                  </div>
                  <div className="text-gray-600">per hour</div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3" size="lg">
                  Book a Session
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Send Message
                </Button>

                <Separator className="my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response time</span>
                    <span className="font-medium">Within 1 hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Languages</span>
                    <span className="font-medium">{tutorDetails.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-medium">200+</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-blue-900">Why choose this tutor?</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Verified credentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>High success rate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Flexible scheduling</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
