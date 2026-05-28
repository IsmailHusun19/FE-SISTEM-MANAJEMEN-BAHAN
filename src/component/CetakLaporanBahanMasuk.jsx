import React, { forwardRef } from "react";
import { BadgeCheck } from "lucide-react";
import logo from "../assets/logo-kecil.png";

const CetakLaporanBahanMasuk = forwardRef(({ data = [], filters }, ref) => {
  const totalItem = data.reduce(
    (total, item) => total + (item.bahanMasuk?.length || 0),
    0
  );

  const totalApproved = data.filter((item) => item.konfirmasi).length;
  const totalPending = data.filter((item) => !item.konfirmasi).length;

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      ref={ref}
      className="bg-white text-slate-900 px-12 py-10 text-[11px]"
    >
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

      {/* KOP SURAT */}
      <div className="border-b border-slate-300 pb-4 mb-5">
        <div className="flex justify-between items-start">
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

          <div className="text-right text-[10px] space-y-1">
            <div className="inline-flex items-center gap-1 border px-2 py-1">
              <BadgeCheck size={12} />
              <span className="font-semibold">OFFICIAL REPORT</span>
            </div>

            <div className="text-slate-500 mt-2">
              <div>
                DOC:
                <span className="ml-1 font-semibold text-slate-800">
                  INBOUND-SUMMARY
                </span>
              </div>

              <div>
                PRINT DATE:
                <span className="ml-1 font-semibold text-slate-800">
                  {formatTanggal(new Date())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className="mb-5">
        <h2 className="text-[14px] font-bold tracking-tight">
          MATERIAL INBOUND SUMMARY REPORT
        </h2>

        <p className="text-[10px] text-slate-500">
          Laporan rekap data penerimaan bahan produksi
        </p>
      </div>

      {/* INFO STRIP */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-[10px]">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
          <div className="font-semibold tracking-wide text-slate-700 uppercase">
            Report Information
          </div>

          <div className="px-2 py-1 rounded-md text-[9px] font-bold tracking-wider bg-orange-100 text-orange-700">
            INBOUND
          </div>
        </div>

        <div className="grid grid-cols-4 gap-0 divide-x divide-slate-200">
          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Periode
            </div>

            <div className="font-semibold text-slate-800 text-[11px] leading-4">
              {filters?.startDate && filters?.endDate
                ? `${formatTanggal(filters.startDate)} - ${formatTanggal(
                    filters.endDate
                  )}`
                : "Semua Data"}
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Total Transaksi
            </div>

            <div className="font-semibold text-slate-800 text-[11px]">
              {data.length} Transaksi
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Total Item
            </div>

            <div className="font-semibold text-orange-600 text-[11px]">
              {totalItem} Item
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Status Summary
            </div>

            <div className="flex gap-3 text-[11px] font-semibold">
              <span className="text-emerald-600">
                {totalApproved} Approved
              </span>

              <span className="text-orange-600">
                {totalPending} Pending
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-slate-400 uppercase text-[9px] tracking-wider">
              Notes
            </div>

            <div className="text-[9px] text-slate-400">
              System Generated
            </div>
          </div>

          <div className="text-[11px] text-slate-700 leading-relaxed">
            Dokumen ini berisi rekap penerimaan bahan masuk berdasarkan data
            transaksi yang tercatat pada sistem DOIR Warehouse.
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-slate-300">
        <div className="bg-slate-100 px-4 py-2 border-b">
          <span className="text-[10px] uppercase tracking-widest text-slate-600">
            Material Inbound Ledger
          </span>
        </div>

        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[10px] text-slate-500 border-b">
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">ID Transaksi</th>
              <th className="p-3 text-left">Penerima</th>
              <th className="p-3 text-center">Total Item</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-semibold text-slate-800">
                    {item.id}
                  </td>

                  <td className="p-3 text-slate-700">
                    {item.user?.name || "-"}
                  </td>

                  <td className="p-3 text-center font-bold text-orange-600">
                    {item.bahanMasuk?.length || 0} Item
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-wider ${
                        item.konfirmasi
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.konfirmasi ? "APPROVED" : "PENDING"}
                    </span>
                  </td>

                  <td className="p-3 text-center text-slate-600">
                    {formatTanggal(item.tanggalMasuk)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-slate-500"
                >
                  Tidak ada data penerimaan bahan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SIGNATURE */}
      <div className="grid grid-cols-2 gap-12 mt-10 text-[11px]">
        <div>
          <p className="text-[10px] text-slate-500 mb-12">
            Prepared By
          </p>

          <div className="border-t pt-2 font-semibold">
            Warehouse Staff
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
});

export default CetakLaporanBahanMasuk;