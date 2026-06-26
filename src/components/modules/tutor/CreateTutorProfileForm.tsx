"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createTutorProfileAction } from "@/action/tutor.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface CreateTutorProfileFormProps {
  categories: Category[];
}

export default function CreateTutorProfileForm({ categories }: CreateTutorProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    bio: "",
    pricePerHour: "",
    categoryId: "",
  });
  
  const [subjects, setSubjects] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState("");

  const handleAddSubject = () => {
    if (currentSubject.trim() && !subjects.includes(currentSubject.trim())) {
      setSubjects([...subjects, currentSubject.trim()]);
      setCurrentSubject("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.bio.trim()) {
      toast.error("Please enter your bio");
      return;
    }

    if (!formData.pricePerHour || parseFloat(formData.pricePerHour) <= 0) {
      toast.error("Please enter a valid price per hour");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (subjects.length === 0) {
      toast.error("Please add at least one subject");
      return;
    }

    startTransition(async () => {
      try {
        const profileData = {
          name: formData.name,
          image: formData.image || undefined,
          bio: formData.bio,
          pricePerHour: parseFloat(formData.pricePerHour),
          subjects: subjects,
          categoryId: formData.categoryId,
        };

        const result = await createTutorProfileAction(profileData);

        if (result?.success) {
          toast.success("Tutor profile created successfully!");
          router.push("/tutor-dashboard");
          router.refresh();
        } else {
          toast.error(result?.message || "Failed to create tutor profile");
        }
      } catch (error) {
        console.error("Error creating profile:", error);
        toast.error("An error occurred while creating your profile");
      }
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Tutor Profile</CardTitle>
        <CardDescription>
          Fill in your details to start tutoring on EduZone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image URL (Optional)</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/your-image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Provide a URL to your profile image
            </p>
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              placeholder="Tell students about yourself, your teaching style, and experience..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={5}
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum 50 characters recommended
            </p>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subjects Field */}
          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects *</Label>
            <div className="flex gap-2">
              <Input
                id="subjects"
                type="text"
                placeholder="e.g., Mathematics, Physics, Chemistry"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubject();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddSubject}
                variant="outline"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <span>{subject}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(subject)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Press Enter or click + to add subjects
            </p>
          </div>

          {/* Price Per Hour Field */}
          <div className="space-y-2">
            <Label htmlFor="pricePerHour">Price Per Hour (USD) *</Label>
            <Input
              id="pricePerHour"
              type="number"
              step="0.01"
              min="0"
              placeholder="25.00"
              value={formData.pricePerHour}
              onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Set your hourly rate for tutoring sessions
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Creating Profile..." : "Create Tutor Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
