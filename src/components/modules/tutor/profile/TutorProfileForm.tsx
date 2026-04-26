"use client";

import { useState } from "react";
import { Save, User, DollarSign, BookOpen, FileText, Loader2, Plus, X } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { convertToTutorAction, updateTutorProfileAction } from "@/action/tutor.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface TutorProfileFormProps {
  categories: Category[];
  initialData?: any;
}

export default function TutorProfileForm({ categories, initialData }: TutorProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialData?.user?.name || "",
    image: initialData?.user?.image || "",
    bio: initialData?.bio || "",
    pricePerHour: initialData?.pricePerHour || 0,
    subjects: initialData?.subjects || [],
    categoryId: initialData?.categoryId || "",
  });

  const [subjectInput, setSubjectInput] = useState("");

  const handleAddSubject = () => {
    if (subjectInput.trim() && !formData.subjects.includes(subjectInput.trim())) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subjectInput.trim()],
      });
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s: string) => s !== subject),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If no tutor profile exists, convert to tutor, else update profile
      const res = initialData?.bio // Using bio to check if profile exists
        ? await updateTutorProfileAction(formData)
        : await updateTutorProfileAction(formData);

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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <GlassCard className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
            {formData.image ? (
              <Image src={formData.image} alt="Profile" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <User size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{formData.name || "Tutor Name"}</h3>
            <p className="text-xs text-muted-foreground italic uppercase tracking-widest">Expert Educator</p>
          </div>
          <div className="w-full space-y-2">
            <label className="text-[10px] text-muted-foreground font-bold uppercase">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-primary/50"
            />
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <DollarSign size={18} />
            <h4 className="font-bold">Pricing</h4>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium uppercase italic">Price Per Hour ($)</label>
            <input
              type="number"
              value={formData.pricePerHour}
              onChange={(e) => setFormData({ ...formData, pricePerHour: parseFloat(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary/50 font-bold text-lg"
            />
          </div>
        </GlassCard>
      </div>

      <div className="md:col-span-2 space-y-6">
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <FileText size={18} />
            <h4 className="font-bold">Professional Bio</h4>
          </div>
          <textarea
            rows={6}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell students about your experience, teaching style, and passion..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-primary/50 transition-all resize-none italic text-sm leading-relaxed"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-medium uppercase flex items-center gap-1 italic">
                <BookOpen size={14} /> Subject Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary/50 appearance-none text-sm"
              >
                <option value="" disabled >Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} >{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-medium uppercase italic">Add Subjects</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                  placeholder="e.g. Calculus"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary/50 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium uppercase italic">Your Subjects</label>
            <div className="flex flex-wrap gap-2">
              {formData.subjects.map((subject: string) => (
                <span key={subject} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                  {subject}
                  <button type="button" onClick={() => handleRemoveSubject(subject)} className="hover:text-white transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              {formData.subjects.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No subjects added yet.</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {initialData ? "Update Profile" : "Create Tutor Profile"}
          </button>
        </GlassCard>
      </div>
    </form>
  );
}
