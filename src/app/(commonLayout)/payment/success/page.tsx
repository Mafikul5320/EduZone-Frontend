"use client";

import Link from "next/link";
import { CheckCircle, Home, FileText, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in zoom-in-95 duration-300 border border-emerald-200 dark:border-emerald-800">
        {/* Success Icon */}
        <div className="relative mx-auto mb-6 w-20 h-20">
          <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/50 rounded-full animate-ping opacity-75"></div>
          <div className="relative flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full">
            <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          Payment Successful!
        </h1>
        
        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Thank you for your booking. Your payment has been processed successfully.
        </p>

        {/* Transaction ID */}
        {transactionId && (
          <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-semibold">
              Transaction ID
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-mono break-all">
              {transactionId}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/student-dashboard/bookings"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 transition-all active:scale-95"
          >
            <FileText size={20} />
            View My Bookings
            <ArrowRight size={20} />
          </Link>
          
          <Link
            href="/student-dashboard"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold transition-all active:scale-95"
          >
            <Home size={20} />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
