/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import GlassCard from "@/components/ui/GlassCard";
import { Star, User, Quote } from "lucide-react";
import { TutorService } from "@/service/tutor.service";
import Image from "next/image";

async function TutorReviewsPage() {
  let reviews: any[] = [];

  try {
    const tutorData = await TutorService.getAllTutors();
    const tutor = tutorData?.data;
   
    if (tutor?.tutorProfile?.id) {
      const singleTutor = await TutorService.getSingleTutor(tutor.tutorProfile.id);
      reviews = singleTutor?.data?.reviews || [];
    }
  } catch (e) {
    reviews = [];
  }

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Student Reviews
        </h1>
        <p className="text-muted-foreground italic">See what your students are saying about your teaching.</p>
      </div>

      {/* Stats Summary */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Star className="fill-amber-400 text-amber-400" size={24} />
            <span className="text-3xl font-black text-white">
              {(reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length).toFixed(1)}
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-sm font-bold text-white">{reviews.length} Reviews</p>
            <p className="text-xs text-muted-foreground italic">from verified students</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review: any) => (
          <GlassCard key={review.id} className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Quote size={80} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start gap-6">
               <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                    {review.student?.image ? (
                      <Image src={review.student.image} alt={review.student.name || "Student"} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <User size={32} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="font-bold text-sm whitespace-nowrap">{review.student?.name || "Student"}</p>
               </div>

               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-white/10"} 
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground italic">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-lg italic text-white/90 leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>
               </div>
            </div>
          </GlassCard>
        ))}
        {reviews.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
             <Star size={48} className="mx-auto mb-4 opacity-10" />
             <p className="text-muted-foreground italic">You haven&apos;t received any reviews yet.</p>
             <p className="text-sm text-muted-foreground italic mt-2">Reviews from your students will appear here after sessions.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorReviewsPage;
