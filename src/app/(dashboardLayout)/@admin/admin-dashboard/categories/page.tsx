import { CategoryService } from "@/service/category.service";
import CategoryManagement from "@/components/modules/admin/category/CategoryManagement";

async function AdminCategoriesPage() {
  const categoriesResponse = await CategoryService.getAllCategories();
  const categories = categoriesResponse?.data || [];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Category Management
        </h1>
        <p className="text-muted-foreground italic">Define and organize subject categories for tutors.</p>
      </div>

      <CategoryManagement initialCategories={categories} />
    </div>
  );
}

export default AdminCategoriesPage;
