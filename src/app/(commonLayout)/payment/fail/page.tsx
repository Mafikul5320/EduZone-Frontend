"use client";

import Link from "next/link";
import { XCircle, Home, RefreshCw, HelpCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FailContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in zoom-in-95 duration-300 border border-red-200 dark:border-red-800">
        {/* Error Icon */}
        <div className="relative mx-auto mb-6 w-20 h-20">
          <div className="absolute inset-0 bg-red-100 dark:bg-red-900/50 rounded-full animate-pulse opacity-75"></div>
          <div className="relative flex items-center justify-center w-20 h-20 bg-red-500 rounded-full">
            <XCircle size={48} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          Payment Failed
        </h1>
        
        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Unfortunately, we couldn't process your payment. Please try again or use a different payment method.
        </p>

        {/* Transaction ID */}
        {transactionId && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-semibold">
              Transaction ID
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-mono break-all">
              {transactionId}
            </p>
          </div>
        )}

        {/* Possible Reasons */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-start gap-2 mb-2">
            <HelpCircle size={18} className="text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Possible reasons:
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>Insufficient funds</li>
                <li>Card declined by bank</li>
                <li>Incorrect payment details</li>
                <li>Network connection issue</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/tutors"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 dark:shadow-red-900/50 transition-all active:scale-95"
          >
            <RefreshCw size={20} />
            Try Again
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

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    }>
      <FailContent />
    </Suspense>
  );
}
