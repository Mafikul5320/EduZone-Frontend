// types/dashboard.ts
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
  bookings: {
    id: string;
    date: string;
    slot: string;
    status: "CONFIRMED" | "PENDING" | "CANCELLED";
    totalPrice: number;
    tutor: {
      user: { name: string };
      subjects: string[];
      rating: number;
    };
  }[];
}