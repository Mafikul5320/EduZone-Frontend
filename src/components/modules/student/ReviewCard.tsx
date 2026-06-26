import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, DollarSign, BookOpen } from "lucide-react";
import { StudentReview } from "@/types/review.type";

interface ReviewCardProps {
  review: StudentReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tutor Info */}
          <div className="flex items-start gap-4 flex-1">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border shrink-0">
              <Image
                src={review.tutor.user.image || "/default-avatar.png"}
                alt={review.tutor.user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground mb-1">
                {review.tutor.user.name}
              </h3>
              <Badge variant="secondary" className="mb-2">
                {review.tutor.category.name}
              </Badge>
              <div className="flex flex-wrap gap-1 mt-2">
                {review.tutor.subjects.slice(0, 3).map((subject, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
                {review.tutor.subjects.length > 3 && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    +{review.tutor.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Rating & Review */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="font-bold text-lg">{review.rating}.0</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(review.createdAt)}
              </span>
            </div>

            {review.comment && (
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-foreground leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            )}

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {formatDate(review.booking.date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{review.booking.slot}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ${review.booking.totalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Session Completed</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
