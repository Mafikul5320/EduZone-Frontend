// Review related types
export interface StudentReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  tutor: {
    id: string;
    bio: string;
    pricePerHour: number;
    subjects: string[];
    rating: number;
    userId: string;
    categoryId: string;
    user: {
      name: string;
      image: string | null;
    };
    category: {
      id: string;
      name: string;
    };
  };
  booking: {
    date: string;
    slot: string;
    totalPrice: number;
  };
}

export interface ReviewFormData {
  tutorId: string;
  bookingId: string;
  rating: number;
  comment: string;
}
