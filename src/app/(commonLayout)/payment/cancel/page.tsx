import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in zoom-in-95 duration-300">
        <AlertCircle size={64} className="text-amber-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Payment Cancelled</h1>
        <p className="text-slate-500 mb-8">
          You cancelled the payment process. No charges were made.
        </p>
        <Link 
          href="/tutors" 
          className="block w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
        >
          Return to Tutors
        </Link>
      </div>
    </div>
  );
}
