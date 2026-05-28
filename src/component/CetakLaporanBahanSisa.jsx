import React, { forwardRef } from "react";
import { BadgeCheck } from "lucide-react";
import logo from "../assets/logo-kecil.png";

const CetakLaporanBahanSisa = forwardRef(({ data = [], filters }, ref) => {
  const totalItem = data.reduce(
    (total, item) => total + (item.detailBahanSisa?.length || 0),
    0
  );

  const totalPemakaianAll = data.reduce((total, item) => {
    const totalPemakaianTransaksi =
      item.detailBahanSisa?.reduce(
        (sum, detail) => sum + (Number(detail.jumlahDipakai) || 0),
        0
      ) || 0;

    return total + totalPemakaianTransaksi;
  }, 0);

  const totalSisaPemakaianAll = data.reduce((total, item) => {
    const totalSisaTransaksi =
      item.detailBahanSisa?.reduce(
        (sum, detail) => sum + (Number(detail.jumlahSisa) || 0),
        0
      ) || 0;

    return total + totalSisaTransaksi;
  }, 0);

  const totalApproved = data.filter(
    (item) => item.status === "DISETUJUI"
  ).length;

  const totalPending = data.filter(
    (item) =>
      item.status === "PENDING" ||
      item.status === "DITOLAK"
  ).length;

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
            body {
              background: white !important;
            }

            @page {
              size: A4;
              margin: 14mm;
            }

            .page-break {
              page-break-before: always;
            }
          }
        `}
      </style>

      {/* HEADER */}
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
              <span className="font-semibold">
                OFFICIAL REPORT
              </span>
            </div>

            <div className="text-slate-500 mt-2">
              <div>
                DOC:
                <span className="ml-1 font-semibold text-slate-800">
                  MATERIAL-USAGE-WASTE-SUMMARY
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
          MATERIAL USAGE WASTE SUMMARY REPORT
        </h2>

        <p className="text-[10px] text-slate-500">
          Laporan rekap data pemakaian dan sisa pemakaian bahan produksi
        </p>
      </div>

      {/* INFO */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-[10px]">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
          <div className="font-semibold tracking-wide text-slate-700 uppercase">
            Report Information
          </div>

          <div className="px-2 py-1 rounded-md text-[9px] font-bold tracking-wider bg-orange-100 text-orange-700">
            BAHAN SISA
          </div>
        </div>

        <div className="grid grid-cols-6 gap-0 divide-x divide-slate-200">
          {/* PERIODE */}
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

          {/* TOTAL TRANSAKSI */}
          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Total Transaksi
            </div>

            <div className="font-semibold text-slate-800 text-[11px]">
              {data.length} Transaksi
            </div>
          </div>

          {/* TOTAL ITEM */}
          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Total Item
            </div>

            <div className="font-semibold text-orange-600 text-[11px]">
              {totalItem} Item
            </div>
          </div>

          {/* TOTAL PEMAKAIAN */}
          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Total Pemakaian
            </div>

            <div className="font-semibold text-orange-600 text-[11px]">
              {totalPemakaianAll} Qty
            </div>
          </div>

          {/* TOTAL SISA */}
          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Total Sisa
            </div>

            <div className="font-semibold text-emerald-600 text-[11px]">
              {totalSisaPemakaianAll} Qty
            </div>
          </div>

          {/* STATUS */}
          <div className="px-4 py-3">
            <div className="text-slate-400 uppercase text-[9px] mb-1">
              Status Summary
            </div>

            <div className="flex flex-col gap-1 text-[10px] font-semibold">
              <span className="text-emerald-600">
                {totalApproved} Approved
              </span>

              <span className="text-orange-600">
                {totalPending} Pending
              </span>
            </div>
          </div>
        </div>

        {/* NOTES */}
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
            Dokumen ini berisi rekap pemakaian bahan produksi dan sisa
            pemakaian bahan berdasarkan transaksi yang tercatat pada
            sistem DOIR Warehouse.
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-slate-300">
        <div className="bg-slate-100 px-4 py-2 border-b">
          <span className="text-[10px] uppercase tracking-widest text-slate-600">
            Material Usage Waste Ledger
          </span>
        </div>

        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[10px] text-slate-500 border-b">
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">ID Transaksi</th>
              <th className="p-3 text-left">Dibuat Oleh</th>
              <th className="p-3 text-center">Total Item</th>
              <th className="p-3 text-center">Total Pemakaian</th>
              <th className="p-3 text-center">
                Total Sisa Pemakaian
              </th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                const totalPemakaian =
                  item.detailBahanSisa?.reduce(
                    (sum, detail) =>
                      sum + (Number(detail.jumlahDipakai) || 0),
                    0
                  ) || 0;

                const totalSisaPemakaian =
                  item.detailBahanSisa?.reduce(
                    (sum, detail) =>
                      sum + (Number(detail.jumlahSisa) || 0),
                    0
                  ) || 0;

                const isApproved =
                  item.status === "DISETUJUI";

                return (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-semibold text-slate-800">
                      {item.id}
                    </td>

                    <td className="p-3 text-slate-700">
                      {item.user?.name || "-"}
                    </td>

                    <td className="p-3 text-center font-bold text-orange-600">
                      {item.detailBahanSisa?.length || 0} Item
                    </td>

                    <td className="p-3 text-center font-bold text-orange-600">
                      {totalPemakaian} Qty
                    </td>

                    <td className="p-3 text-center font-bold text-emerald-600">
                      {totalSisaPemakaian} Qty
                    </td>

                    {/* STATUS */}
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-wider ${
                          isApproved
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {isApproved ? "DISETUJUI" : "PENDING"}
                      </span>
                    </td>

                    <td className="p-3 text-center text-slate-600">
                      {formatTanggal(item.createdAt)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-slate-500"
                >
                  Tidak ada data pemakaian bahan produksi.
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
            Owner
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-500 mb-12">
            Approved By
          </p>

          <div className="border-t pt-2 inline-block text-left min-w-[200px] font-semibold">
            Supervisor Produksi
          </div>
        </div>
      </div>
    </div>
  );
});

export default CetakLaporanBahanSisa;