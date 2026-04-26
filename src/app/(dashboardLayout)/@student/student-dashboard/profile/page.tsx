import { UserService } from "@/service/user.service";
import StudentProfileForm from "@/components/modules/student/profile/StudentProfileForm";
import GlassCard from "@/components/ui/GlassCard";

async function StudentProfilePage() {
  const session = await UserService.getSession();
  const user = session?.user;

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          My Profile
        </h1>
        <p className="text-muted-foreground italic">Manage your personal information and account settings.</p>
      </div>

      <StudentProfileForm initialUser={user} />

      <GlassCard className="border-rose-500/20 bg-rose-500/5">
        <h3 className="text-rose-400 font-semibold mb-2 italic">Danger Zone</h3>
        <p className="text-sm text-muted-foreground italic mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="text-rose-400 text-sm font-bold hover:underline italic">Delete Account</button>
      </GlassCard>
    </div>
  );
}

export default StudentProfilePage;
