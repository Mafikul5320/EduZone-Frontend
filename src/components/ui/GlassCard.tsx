import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "premium" | "accent";
}

const GlassCard = ({ children, className, variant = "default", ...props }: GlassCardProps) => {
  const variants = {
    default: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl",
    premium: "bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/30 shadow-2xl",
    accent: "bg-primary/10 backdrop-blur-md border border-primary/20 shadow-lg",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 hover:border-white/40",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
