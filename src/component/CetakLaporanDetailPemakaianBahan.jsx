import React, { forwardRef } from "react";
import { BadgeCheck } from "lucide-react";
import logo from "../assets/logo-kecil.png";

const CetakLaporanDetailPemakaianBahan = forwardRef(
  ({ pemakaianBahan }, ref) => {
    const totalDipakai =
      pemakaianBahan?.detailBahanSisa?.reduce(
        (a, b) => a + b.jumlahDipakai,
        0
      ) || 0;

    const totalSisa =
      pemakaianBahan?.detailBahanSisa?.reduce(
        (a, b) => a + b.jumlahSisa,
        0
      ) || 0;

    const isApproved = pemakaianBahan?.status === "DISETUJUI";

    return (
      <div
        ref={ref}
        className="bg-white text-slate-900 px-12 py-10 text-[11px]"
      >
        {/* ================= PRINT SYSTEM ================= */}
        <style>
          {`
            @media print {
              body { background: white !important; }
              @page { size: A4; margin: 14mm; }

              .page-break {
                page-break-before: always;
              }
            }
          `}
        </style>

        {/* ================= KOP SURAT ================= */}
        <div className="border-b border-slate-300 pb-4 mb-5">
          <div className="flex justify-between items-start">
            {/* LEFT */}
            <div className="flex gap-4 items-start">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 object-contain"
              />

              <div>
                <h1 className="text-[12px] font-extrabold tracking-[0.25em] uppercase">
                  Doir Warehouse Production
                </h1>

                <p className="text-[10px] text-slate-500 leading-4 mt-1">
                  Warehouse Management System
                  <br />
                  Jl. Raya Industri No. 88, Jakarta Selatan
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right text-[10px] space-y-1">
              <div className="inline-flex items-center gap-1 border px-2 py-1">
                <BadgeCheck size={12} />
                <span className="font-semibold">
                  {isApproved ? "APPROVED" : "DRAFT"}
                </span>
              </div>

              <div className="text-slate-500 mt-2">
                <div>
                  DOC:
                  <span className="ml-1 font-semibold text-slate-800">
                    {pemakaianBahan?.id}
                  </span>
                </div>

                <div>
                  DATE:
                  <span className="ml-1 font-semibold text-slate-800">
                    {new Date(pemakaianBahan?.createdAt).toLocaleDateString(
                      "id-ID"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <div className="mb-5">
          <h2 className="text-[14px] font-bold tracking-tight">
            MATERIAL USAGE REPORT
          </h2>
          <p className="text-[10px] text-slate-500">
            Official warehouse material usage document
          </p>
        </div>

        {/* ================= CLEAN META STRIP (ERP STYLE) ================= */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-[10px]">
          {/* TOP BAR */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
            <div className="font-semibold tracking-wide text-slate-700 uppercase">
              Transaction Information
            </div>

            <div
              className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-wider
                ${
                  isApproved
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-orange-100 text-orange-700"
                }`}
            >
              {isApproved ? "APPROVED" : "PENDING"}
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-3 gap-0 divide-x divide-slate-200">
            <div className="px-4 py-3">
              <div className="text-slate-400 uppercase text-[9px] mb-1">
                Created By
              </div>
              <div className="font-semibold text-slate-800 text-[11px]">
                {pemakaianBahan?.user?.name || "-"}
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="text-slate-400 uppercase text-[9px] mb-1">
                User Role
              </div>
              <div className="font-semibold text-slate-800 text-[11px]">
                {pemakaianBahan?.user?.role || "-"}
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="text-slate-400 uppercase text-[9px] mb-1">
                Items / Usage
              </div>
              <div className="flex gap-3 text-[11px] font-semibold">
                <span className="text-slate-800">
                  {pemakaianBahan?.detailBahanSisa?.length || 0} Items
                </span>

                <span className="text-orange-600">
                  {totalDipakai} Used
                </span>

                <span className="text-emerald-600">
                  {totalSisa} Left
                </span>
              </div>
            </div>
          </div>

          {/* NOTES SECTION */}
          <div className="border-t border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <div className="text-slate-400 uppercase text-[9px] tracking-wider">
                Notes
              </div>

              <div className="text-[9px] text-slate-400">
                Optional Field
              </div>
            </div>

            <div className="text-[11px] text-slate-700 leading-relaxed">
              {pemakaianBahan?.catatan || "No additional notes provided."}
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="border border-slate-300">
          <div className="bg-slate-100 px-4 py-2 border-b">
            <span className="text-[10px] uppercase tracking-widest text-slate-600">
              Material Usage Ledger
            </span>
          </div>

          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-[10px] text-slate-500 border-b">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Material</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-center">Used</th>
                <th className="p-3 text-center">Left</th>
                <th className="p-3 text-center">Unit</th>
                <th className="p-3 text-center">Stock</th>
              </tr>
            </thead>

            <tbody>
              {pemakaianBahan?.detailBahanSisa?.map((item, i) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3 font-semibold">
                    {item.bahan?.name}
                  </td>

                  <td className="p-3 text-slate-500">
                    {item.bahanId}
                  </td>

                  <td className="p-3 text-center font-bold text-orange-600">
                    {item.jumlahDipakai}
                  </td>

                  <td className="p-3 text-center font-bold text-emerald-600">
                    {item.jumlahSisa}
                  </td>

                  <td className="p-3 text-center">
                    {item.bahan?.satuan}
                  </td>

                  <td className="p-3 text-center">
                    {item.bahan?.stok}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= SIGNATURE ================= */}
        <div className="grid grid-cols-2 gap-12 mt-10 text-[11px]">
          <div>
            <p className="text-[10px] text-slate-500 mb-12">
              Prepared By
            </p>

            <div className="border-t pt-2 font-semibold">
              Production Staff
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-500 mb-12">
              Approved By
            </p>

            <div className="border-t pt-2 inline-block text-left min-w-[200px] font-semibold">
              Supervisor
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CetakLaporanDetailPemakaianBahan;