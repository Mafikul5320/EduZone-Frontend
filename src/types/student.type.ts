export interface StudentBooking {
  id: string;
  tutorId: string;
  date: string;
  slot: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "PAID";
  totalPrice: number;
  tutor: {
    user: { name: string };
    subjects: string[];
    rating: number;
  };
}

export interface StudentDashboardData {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  status: string;
  _count: {
    bookings: number;
    reviews: number;
  };
  bookings: StudentBooking[];
}