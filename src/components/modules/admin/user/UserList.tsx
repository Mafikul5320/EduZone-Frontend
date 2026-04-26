"use client";

import { useState } from "react";
import { User, Shield, ShieldOff, MoreVertical, Loader2 } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { updateUserStatusAction } from "@/action/admin.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  status: "ACTIVE" | "BANNED";
}

interface UserListProps {
  initialUsers: UserData[];
}

export default function UserList({ initialUsers }: UserListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleStatus = async (userId: string, currentStatus: "ACTIVE" | "BANNED") => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    
    setLoadingId(userId);
    try {
      const res = await updateUserStatusAction(userId, newStatus);
      if (res?.success) {
        toast.success(`User status updated to ${newStatus}`);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold italic text-sm">User</th>
              <th className="p-4 font-semibold italic text-sm">Role</th>
              <th className="p-4 font-semibold italic text-sm">Status</th>
              <th className="p-4 font-semibold italic text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {initialUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground italic">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    user.role === 'TUTOR' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${
                    user.status === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                    }`} />
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      disabled={loadingId === user.id}
                      className={`p-2 rounded-lg hover:bg-white/10 transition-all ${
                        user.status === 'ACTIVE' ? 'text-rose-400 hover:text-rose-300' : 'text-emerald-400 hover:text-emerald-300'
                      }`}
                      title={user.status === 'ACTIVE' ? 'Ban User' : 'Activate User'}
                    >
                      {loadingId === user.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        user.status === 'ACTIVE' ? <ShieldOff size={18} /> : <Shield size={18} />
                      )}
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {initialUsers.length === 0 && (
          <div className="p-12 text-center text-muted-foreground italic">
            No users found.
          </div>
        )}
      </div>
    </GlassCard>
  );
}
