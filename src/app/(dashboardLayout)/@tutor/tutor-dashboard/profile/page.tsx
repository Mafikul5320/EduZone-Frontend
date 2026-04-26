import { CategoryService } from "@/service/category.service";
import TutorProfileForm from "@/components/modules/tutor/profile/TutorProfileForm";
import { UserService } from "@/service/user.service";

async function TutorProfilePage() {
  const categoriesResponse = await CategoryService.getAllCategories();
  const categories = categoriesResponse?.data || [];

  const session = await UserService.getSession();
  const user = session?.user;

  // In a real scenario, we would fetch the tutor profile by user ID
  // For now, we'll pass the user data as initial values
  const initialData = {
    user: {
      name: user?.name || "Tutor Name",
      image: user?.image || "https://avatars.githubusercontent.com/u/12345678",
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          Teacher Profile
        </h1>
        <p className="text-muted-foreground italic">Customize your public profile to showcase your expertise.</p>
      </div>

      <TutorProfileForm categories={categories} initialData={initialData} />
    </div>
  );
}

export default TutorProfilePage;
