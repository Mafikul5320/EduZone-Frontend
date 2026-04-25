"use client"
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import logo from "../../../public/logo.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userRole } from "@/constant/role.type";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Subjects", href: "#subjects" },
  { label: "Tutors", href: "#tutors" },
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
      className="sticky bg-white/80 backdrop-blur-md top-0 py-2 left-0 right-0 z-50 glass-card border-b border-border/50"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Image alt="EduZone" src={logo} />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Edu<span className="text-destructive">Zone</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}

          {!isPending && (
            user ? (
              <div className="flex items-center gap-5">
                <Link
                  href={dashboardLink}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="relative group px-5 py-2 rounded-full overflow-hidden border border-destructive/20 hover:border-destructive/40 transition-all duration-300"
                >
                  <div className="relative flex items-center gap-2 text-destructive font-bold text-xs uppercase tracking-wider">
                    <LogOut size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Sign Out</span>
                  </div>
                </motion.button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <button className="bg-[#1A237E] text-white px-6 py-2 rounded-full hover:bg-[#1A237E]/90 transition-all active:scale-95">
                    Register Now
                  </button>
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
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
            className="md:hidden glass-card border-t border-border/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}


              {!isPending && (
                user ? (
                  <div className="flex flex-col gap-4">
                    <Link
                      href={dashboardLink}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-1"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 text-sm font-bold text-destructive bg-destructive/10 hover:bg-destructive/20 transition-all py-3 px-4 rounded-xl text-left"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="mt-2 px-5 py-2.5 rounded-lg bg-[#1A237E] text-white text-sm font-semibold text-center"
                    >
                      Register Now
                    </Link>
                  </>
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