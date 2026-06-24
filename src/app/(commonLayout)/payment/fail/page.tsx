import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in zoom-in-95 duration-300">
        <XCircle size={64} className="text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Payment Failed</h1>
        <p className="text-slate-500 mb-8">
          Unfortunately, we couldn't process your payment. Please try again or use a different payment method.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/tutors" 
            className="block w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all active:scale-95"
          >
            Go Back
          </Link>
          <Link 
            href="/tutors" 
            className="block w-full py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
