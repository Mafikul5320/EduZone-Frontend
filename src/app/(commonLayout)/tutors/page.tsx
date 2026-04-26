import { Search, Filter, Star, BookOpen, DollarSign, Tag } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { TutorService } from "@/service/tutor.service";
import { CategoryService } from "@/service/category.service";
import Link from "next/link";
import Image from "next/image";

async function TutorsPage({ searchParams }: { searchParams: { categoryId?: string, maxPrice?: string } }) {
  const tutorsResponse = await TutorService.getAllTutors();
  const categoriesResponse = await CategoryService.getAllCategories();
  
  const tutors = tutorsResponse?.data || [];
  const categories = categoriesResponse?.data || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-background z-0" />
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            Unlock Your Potential
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect mentor from our curated list of expert tutors and start your journey today.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by subject or tutor name..."
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 pl-14 outline-none focus:border-primary/50 transition-all text-lg shadow-2xl"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={24} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 -mt-10 relative z-20">
        {/* Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <GlassCard variant="premium" className="sticky top-24">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Filter size={20} className="text-primary" />
              Advanced Filters
            </h3>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: any) => (
                    <button key={cat.id} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-primary hover:text-primary-foreground transition-all">
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price Range</p>
                <input type="range" className="w-full accent-primary" min="0" max="200" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$200+</span>
                </div>
              </div>

              <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-xl">
                Apply Filters
              </button>
            </div>
          </GlassCard>
        </aside>

        {/* Tutors Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold italic">{tutors.length} Tutors Available</h2>
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground italic">Sort by:</span>
              <select className="bg-transparent font-bold outline-none italic">
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutors.map((tutor: any) => (
              <GlassCard key={tutor.id} className="group hover:scale-[1.02] transition-all">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/20 shrink-0">
                    {tutor.image ? (
                      <Image src={tutor.image} alt={tutor.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <Star size={32} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{tutor.name}</h3>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold">4.9</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tutor.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects?.slice(0, 3).map((sub: string) => (
                        <span key={sub} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tighter">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <span className="text-2xl font-bold">${tutor.pricePerHour}</span>
                    <span className="text-xs text-muted-foreground">/hr</span>
                  </div>
                  <Link href={`/tutors/${tutor.id}`}>
                    <button className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all shadow-lg">
                      View Profile
                    </button>
                  </Link>
                </div>
              </GlassCard>
            ))}
            {tutors.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-muted-foreground">No tutors found matching your criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TutorsPage;
