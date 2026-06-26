import { Suspense } from "react";
import { Star, MessageSquare, TrendingUp, Award } from "lucide-react";
import { ReviewService } from "@/service/admin.service";
import ReviewCard from "@/components/modules/student/ReviewCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentReview } from "@/types/review.type";

export const dynamic = "force-dynamic";

async function ReviewsContent() {
  const reviewsResponse = await ReviewService.getMyReviews();
  const reviews: StudentReview[] = reviewsResponse?.data || [];

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : "0.0";
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const withComments = reviews.filter((r) => r.comment && r.comment.trim() !== "").length;

  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: MessageSquare,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: Star,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      title: "5-Star Reviews",
      value: fiveStarCount,
      icon: Award,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      title: "With Comments",
      value: withComments,
      icon: TrendingUp,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-2">
          <Star className="w-3 h-3 fill-current" />
          Reviews
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          My Reviews
        </h1>
        <p className="text-muted-foreground text-lg">
          See all the reviews you've given to tutors
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="group relative overflow-hidden">
            <CardContent className="p-6">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 -translate-y-4 translate-x-4">
                <stat.icon size={100} />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-extrabold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-2xl ${stat.color} shadow-sm transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon size={26} strokeWidth={2.5} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Reviews ({totalReviews})</h2>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
                <Star size={32} className="fill-current" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No Reviews Yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                You haven't left any reviews yet. Complete a session and leave a
                review to help other students!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  );
}

export default function MyReviewsPage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <ReviewsContent />
      </Suspense>
    </div>
  );
}
