"use client";

import { useState } from "react";
import { Plus, Tag, Trash2, Loader2, Grid } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { createCategoryAction } from "@/action/category.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface CategoryManagementProps {
  initialCategories: Category[];
}

export default function CategoryManagement({ initialCategories }: CategoryManagementProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await createCategoryAction(name);
      if (res?.success) {
        toast.success("Category created successfully");
        setName("");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to create category");
      }
    } catch (error) {
      toast.error("An error occurred while creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <GlassCard variant="premium" className="space-y-6 sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="text-primary" size={20} />
            <h2 className="text-xl font-semibold">New Category</h2>
          </div>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mathematics"
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-white/10 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Create Category
            </button>
          </form>
        </GlassCard>
      </div>

      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {initialCategories.map((category) => (
            <GlassCard key={category.id} className="flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-primary group-hover:scale-110 transition-transform">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-xs text-muted-foreground italic">Subject Category</p>
                </div>
              </div>
              <button 
                className="p-2 text-muted-foreground hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => toast.info("Delete functionality coming soon")}
              >
                <Trash2 size={18} />
              </button>
            </GlassCard>
          ))}
          {initialCategories.length === 0 && (
            <div className="col-span-full p-12 text-center text-muted-foreground bg-white/5 border border-dashed border-white/10 rounded-2xl">
              <Grid className="mx-auto mb-4 opacity-20" size={48} />
              <p>No categories found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
