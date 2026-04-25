// Tutor related types
export interface Tutor {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  expertise: string[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  totalSessions: number;
  categories: Category[];
  availability?: AvailabilitySlot[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface AvailabilitySlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  studentName: string;
  studentImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorImage?: string;
  studentId: string;
  studentName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}
