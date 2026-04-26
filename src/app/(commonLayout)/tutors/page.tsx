"use client"

import { useState, useMemo } from "react"
import tutorsData from "./data.json" // JSON import
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export interface Tutor {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  price: number;
  online: boolean;
  badge: string | null;
  tags: string[];
  avatar: string;
  sessions: number;
  response: string;
  category: string;
}
const tutors = tutorsData as Tutor[];

export function MarketplacePage() {
  const [search, setSearch] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [priceRange] = useState<number[]>([20, 150])

  // Filter Logic: useMemo Performance optimize korbe
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const searchLower = search.toLowerCase();

      const matchesSearch =
        tutor.name.toLowerCase().includes(searchLower) ||
        tutor.subject.toLowerCase().includes(searchLower) ||
        tutor.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesCategory =
        activeCategory === "All" ||
        tutor.category === activeCategory ||
        tutor.tags.includes(activeCategory);

      const matchesPrice =
        tutor.price >= priceRange[0] &&
        tutor.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, activeCategory, priceRange]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, subject or skill..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {["All", "Coding", "Math", "Sciences"].map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tutor) => (
          <div key={tutor.id} className="border p-4 rounded-xl shadow-sm">
            <h3 className="font-bold">{tutor.name}</h3>
            <p className="text-sm text-gray-500">{tutor.subject}</p>
            <div className="mt-2 flex gap-1 flex-wrap">
              {tutor.tags.map(tag => (
                <span key={tag} className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold">${tutor.price}/hr</span>
              <Button size="sm">Book Now</Button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results found */}
      {filteredTutors.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          Apnar search criteria-r sathe milche emon kono tutor paoya jayni.
        </div>
      )}
    </div>
  )
}

export default MarketplacePage;