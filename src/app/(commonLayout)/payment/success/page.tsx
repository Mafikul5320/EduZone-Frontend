import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in zoom-in-95 duration-300">
        <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Payment Successful!</h1>
        <p className="text-slate-500 mb-8">
          Thank you for your booking. Your payment has been processed successfully.
        </p>
        <Link 
          href="/student-dashboard" 
          className="block w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
}
