import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, PackageSearch } from "lucide-react";

export default function Error() {
  return (
    <div className="relative min-h-screen bg-[#f8f8f7] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-160px] left-[-120px] w-[420px] h-[420px] rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

      <div
        className="
          relative z-10
          w-full max-w-[520px]
          bg-white/90 backdrop-blur-xl
          border border-white
          rounded-[32px]
          shadow-[0_20px_70px_rgba(15,23,42,0.08)]
          px-6 sm:px-8 py-8
          text-center
        "
      >
        <div className="mx-auto w-16 h-16 rounded-[24px] bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-200">
          <PackageSearch size={28} className="text-white" />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-500 text-[11px] font-bold uppercase tracking-[0.2em]">
          <AlertTriangle size={14} />
          Page Not Found
        </div>

        <h1 className="mt-5 text-[64px] leading-none font-black text-slate-900">
          404
        </h1>

        <h2 className="mt-3 text-[20px] font-bold text-slate-800">
          Halaman tidak ditemukan
        </h2>

        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Halaman yang kamu tuju tidak tersedia atau kamu tidak memiliki akses
          ke halaman ini.
        </p>

        <Link
          to="/dashboard"
          className="
            inline-flex items-center justify-center gap-2
            mt-7
            h-11 px-5
            rounded-2xl
            bg-orange-500
            hover:bg-orange-600
            text-white text-sm font-semibold
            shadow-lg shadow-orange-200
            transition-all
          "
        >
          <ArrowLeft size={17} />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}