"use client";

import { useState } from "react";
import { Save, User, Camera, Settings, Loader2 } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { updateStudentProfileAction } from "@/action/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface StudentProfileFormProps {
  initialUser: any;
}

export default function StudentProfileForm({ initialUser }: StudentProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialUser?.name || "",
    image: initialUser?.image || "https://via.placeholder.com/150", // Fallback image
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateStudentProfileAction(formData);
      if (res?.success) {
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard variant="premium" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      
      <div className="relative pt-16 flex flex-col items-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-2xl relative">
             <Image 
              src={formData.image} 
              alt="Profile" 
              fill 
              className="object-cover"
             />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full border-2 border-background shadow-lg hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>
        
        <h2 className="mt-4 text-2xl font-bold italic">{formData.name || "Student Name"}</h2>
        <p className="text-muted-foreground italic">{initialUser?.email || "student@example.com"}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground italic">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-primary/50 transition-all font-medium italic"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground italic">Profile Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Save Changes
          </button>
          <button type="button" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
