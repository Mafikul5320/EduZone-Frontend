import GlassCard from "@/components/ui/GlassCard";
import { Star, User, Quote } from "lucide-react";

async function TutorReviewsPage() {
  // Mock reviews for UI demonstration
  const reviews = [
    {
      id: "1",
      student: "Alice Johnson",
      rating: 5,
      comment: "Exceptional teaching! Explained complex calculus concepts with such ease. Highly recommended.",
      date: "2026-04-20"
    },
    {
      id: "2",
      student: "Bob Smith",
      rating: 4,
      comment: "Great session on Data Structures. Very patient and knowledgeable.",
      date: "2026-04-18"
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Student Reviews
        </h1>
        <p className="text-muted-foreground italic">See what your students are saying about your teaching.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <GlassCard key={review.id} className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Quote size={80} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start gap-6">
               <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <User size={32} className="text-muted-foreground" />
                  </div>
                  <p className="font-bold text-sm whitespace-nowrap">{review.student}</p>
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
                    <span className="ml-2 text-xs text-muted-foreground italic">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-lg italic text-white/90 leading-relaxed">
                    "{review.comment}"
                  </p>
               </div>
            </div>
          </GlassCard>
        ))}
        {reviews.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
             <Star size={48} className="mx-auto mb-4 opacity-10" />
             <p className="text-muted-foreground italic">You haven't received any reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorReviewsPage;
