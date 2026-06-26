import { Suspense } from "react";
import CreateTutorProfileForm from "@/components/modules/tutor/CreateTutorProfileForm";
import { CategoryService } from "@/service/category.service";
import { Skeleton } from "@/components/ui/skeleton";

async function CreateProfileContent() {
  const categoriesResponse = await CategoryService.getAllCategories();
  const categories = categoriesResponse?.data || [];

  return <CreateTutorProfileForm categories={categories} />;
}

function LoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export default function CreateTutorProfilePage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <CreateProfileContent />
      </Suspense>
    </div>
  );
}
