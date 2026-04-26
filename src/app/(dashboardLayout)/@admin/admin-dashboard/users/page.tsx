import { AdminService } from "@/service/admin.service";
import UserList from "@/components/modules/admin/user/UserList";

async function AdminUsersPage() {
  const usersResponse = await AdminService.getAllUsers();
  const users = usersResponse?.data || [];
  console.log(users)

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic">
          User Management
        </h1>
        <p className="text-muted-foreground italic">Monitor and manage all users on the platform.</p>
      </div>

      <UserList initialUsers={users} />
    </div>
  );
}

export default AdminUsersPage;
