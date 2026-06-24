"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";
import logo from "../../../public/logo.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userRole } from "@/constant/role.type";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tutors", href: "/tutors" },
  { label: "About", href: "/about" },
  { label: "Teacher", href: "/teacher" },
];

const getDashboardLink = (role: string | undefined) => {
  if (role === userRole.ADMIN) return "/admin-dashboard";
  if (role === userRole.TUTOR) return "/tutor-dashboard";
  if (role === userRole.STUDENT) return "/student-dashboard";
  return "/login";
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as { role?: string } | undefined;

  const dashboardLink = getDashboardLink(user?.role);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky bg-white/80 backdrop-blur-xl top-0 left-0 right-0 z-50 border-b border-teal-100/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image alt="EduZone" src={logo} width={40} height={40} className="object-contain group-hover:scale-105 transition-transform duration-300" priority />
          <span className="text-2xl font-black tracking-tight text-slate-800">
            Edu<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Zone</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 bg-slate-50/50 px-6 py-2.5 rounded-full border border-slate-100">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {!isPending && (
            user ? (
              <div className="flex items-center gap-4">
                <Link
                  href={dashboardLink}
                  className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors duration-200 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md"
                >
                  Dashboard
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="relative group px-5 py-2.5 rounded-full overflow-hidden border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all duration-300"
                >
                  <div className="relative flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Sign Out</span>
                  </div>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors duration-200 px-2"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-teal-500/30 font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 group">
                    Register Now
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden shadow-xl absolute w-full"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-slate-600 hover:text-teal-600 transition-colors py-2 border-b border-slate-50"
                >
                  {item.label}
                </a>
              ))}

              {!isPending && (
                user ? (
                  <div className="flex flex-col gap-4 mt-2">
                    <Link
                      href={dashboardLink}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors py-3 px-4 rounded-xl text-center"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-3 text-base font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all py-3 px-4 rounded-xl"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors py-3 px-4 rounded-xl text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-bold text-center shadow-md shadow-teal-500/20"
                    >
                      Register Now
                    </Link>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;