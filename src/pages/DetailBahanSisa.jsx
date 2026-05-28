import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import React, { useContext, useState, useEffect, useRef } from "react";
import {
  GetDetailPemakaianBahan,
  DeletePemakaianBahan,
  EditStatusKonfirmasiPemakaianBahan,
} from "../service/Api";

import {
  PackageMinus,
  Printer,
  Pencil,
  Trash2,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import NavbarV2 from "../component/NavbarV2";
import { useReactToPrint } from "react-to-print";
import CetakLaporanDetailPemakaianBahan from "../component/CetakLaporanDetailPemakaianBahan";
import { toast } from "sonner";

const DetailPemakaianBahan = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();

  const [pemakaianBahan, setPemakaianBahan] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const printRef = useRef();

  const getData = async () => {
    try {
      setLoading(true);

      const item = await GetDetailPemakaianBahan(id);

      setPemakaianBahan(item.data);

      console.log(item.data);
    } catch (error) {
      console.error(
        "Gagal mengambil detail pemakaian bahan :",
        error
      );

      setPemakaianBahan(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!["OWNER", "STAFF_GUDANG", "SUPERVISOR_PRODUKSI", "LEADER_PRODUKSI"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["OWNER", "STAFF_GUDANG", "SUPERVISOR_PRODUKSI", "LEADER_PRODUKSI"].includes(user.role)
  ) {
    return null;
  }

  const handleDelete = async (id) => {
    if (!id) return;

    toast("Konfirmasi Penghapusan", {
      description: "Data pemakaian bahan akan dihapus permanen",
      position: "top-center",
      duration: Infinity,

      className: `
        !rounded-2xl
        !border !border-orange-100
        !bg-white/90
        !backdrop-blur-xl
        !text-slate-800
        !shadow-[0_20px_60px_rgba(251,146,60,0.12)]
      `,

      descriptionClassName: "!text-slate-500",

      action: {
        label: "Hapus",

        onClick: async () => {
          const loadingToast = toast.loading(
            "Menghapus data...",
            {
              position: "top-right",

              className: `
                !rounded-2xl
                !border !border-orange-100
                !bg-white
                !text-slate-800
                !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
              `,
            }
          );

          try {
            await DeletePemakaianBahan(id);

            toast.success("Data berhasil dihapus", {
              id: loadingToast,
              position: "top-right",
              description:
                "Data pemakaian bahan berhasil dihapus dari sistem",

              className: `
                !rounded-2xl
                !border !border-orange-100
                !bg-white
                !text-slate-800
                !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
              `,

              descriptionClassName: "!text-slate-500",
            });

            navigate("/pemakaian-bahan");
          } catch (error) {
            toast.error("Gagal menghapus data", {
              id: loadingToast,
              position: "top-right",

              description:
                error?.response?.data?.message ||
                "Terjadi kesalahan sistem",

              className: `
                !rounded-2xl
                !border !border-red-100
                !bg-white
                !text-slate-800
                !shadow-[0_10px_40px_rgba(239,68,68,0.10)]
              `,

              descriptionClassName: "!text-slate-500",
            });
          }
        },
      },

      cancel: {
        label: "Batal",
      },
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit-pemakaian-bahan/${id}`);
  };

  const handleKonfirmasi = async (id, currentStatus) => {
    if (!id) return;
  
    const isKonfirmasi =
      currentStatus !== "DISETUJUI";
  
    toast(
      isKonfirmasi
        ? "Validasi Pemakaian Bahan"
        : "Hapus Validasi",
      {
        description: isKonfirmasi
          ? "Stok bahan akan dikurangi berdasarkan pemakaian"
          : "Stok bahan akan dikembalikan ke gudang",
  
        position: "top-center",
        duration: Infinity,
  
        className: `
          !rounded-2xl
          !border
          ${
            isKonfirmasi
              ? "!border-emerald-100"
              : "!border-orange-100"
          }
          !bg-white/90
          !backdrop-blur-xl
          !text-slate-800
          !shadow-[0_20px_60px_rgba(15,23,42,0.10)]
        `,
  
        descriptionClassName: "!text-slate-500",
  
        action: {
          label: isKonfirmasi
            ? "Validasi"
            : "Hapus Validasi",
  
          onClick: async () => {
            const loadingToast = toast.loading(
              isKonfirmasi
                ? "Memvalidasi transaksi..."
                : "Menghapus validasi transaksi...",
              {
                position: "top-right",
  
                className: `
                  !rounded-2xl
                  !border
                  ${
                    isKonfirmasi
                      ? "!border-emerald-100"
                      : "!border-orange-100"
                  }
                  !bg-white
                  !text-slate-800
                  !shadow-[0_10px_40px_rgba(15,23,42,0.08)]
                `,
              }
            );
  
            try {
              await EditStatusKonfirmasiPemakaianBahan(
                id,
                {
                  status: isKonfirmasi
                    ? "DISETUJUI"
                    : "PENDING",
                }
              );
  
              toast.success(
                isKonfirmasi
                  ? "Transaksi berhasil divalidasi"
                  : "Validasi berhasil dihapus",
                {
                  id: loadingToast,
                  position: "top-right",
  
                  description: isKonfirmasi
                    ? "Stok bahan berhasil dikurangi"
                    : "Stok bahan berhasil dikembalikan",
  
                  className: `
                    !rounded-2xl
                    !border
                    ${
                      isKonfirmasi
                        ? "!border-emerald-100"
                        : "!border-orange-100"
                    }
                    !bg-white
                    !text-slate-800
                    !shadow-[0_10px_40px_rgba(16,185,129,0.10)]
                  `,
  
                  descriptionClassName:
                    "!text-slate-500",
                }
              );
  
              getData();
            } catch (error) {
              toast.error(
                isKonfirmasi
                  ? "Gagal memvalidasi transaksi"
                  : "Gagal menghapus validasi",
                {
                  id: loadingToast,
                  position: "top-right",
  
                  description:
                    error?.response?.data?.message ||
                    "Terjadi kesalahan sistem",
  
                  className: `
                    !rounded-2xl
                    !border !border-red-100
                    !bg-white
                    !text-slate-800
                    !shadow-[0_10px_40px_rgba(239,68,68,0.10)]
                  `,
  
                  descriptionClassName:
                    "!text-slate-500",
                }
              );
            }
          },
        },
  
        cancel: {
          label: "Batal",
        },
      }
    );
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Pemakaian-${pemakaianBahan?.id}`,
  });

  return (
    <>
      {!loading ? (
        <div className="w-full min-h-screen bg-[#f4f6f8] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-orange-200/20 blur-3xl rounded-full pointer-events-none" />

          <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] bg-amber-100/30 blur-3xl rounded-full pointer-events-none" />

          <MenuSlideBar />

          <div className="min-h-screen">
            <div
              className={`
                transition-all duration-300
                ${expanded ? "lg:ml-60" : "ml-16 lg:ml-16"}
              `}
            >
              <NavbarV2 />

              <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* HERO */}

                <div
                  className="
                    relative overflow-hidden
                    rounded-[30px]
                    border border-white/60
                    bg-white/70
                    backdrop-blur-2xl
                    p-6 lg:p-7
                    shadow-[0_12px_50px_rgba(15,23,42,0.05)]
                  "
                >
                  <div className="absolute -top-16 -right-16 w-[220px] h-[220px] bg-orange-100/70 rounded-full blur-3xl" />

                  <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                    <div>
                      <div
                        className="
                          inline-flex items-center gap-2
                          px-3 py-1.5
                          rounded-full
                          border border-orange-100
                          bg-orange-50
                          text-[11px]
                          font-semibold
                          tracking-[0.18em]
                          uppercase
                          text-orange-500
                        "
                      >
                        Detail Pemakaian
                      </div>

                      <h1
                        className="
                          mt-4
                          text-[26px] sm:text-[32px]
                          font-bold
                          tracking-tight
                          text-slate-800
                        "
                      >
                        Detail Pemakaian Bahan
                      </h1>

                      <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-2xl">
                        Informasi lengkap transaksi pemakaian bahan produksi.
                      </p>
                    </div>

                    {/* ACTION */}

                    <div className="flex flex-wrap items-center justify-between gap-3">
                    {(user?.role === "SUPERVISOR_PRODUKSI") && (
                      <div>
                        <button
                          onClick={() =>
                            handleKonfirmasi(
                              pemakaianBahan.id,
                              pemakaianBahan.status
                            )
                          }
                          className={`
                            h-10 px-4
                            rounded-2xl
                            text-[13px]
                            font-semibold
                            transition-all duration-300
                            cursor-pointer
                            flex items-center gap-2

                            ${
                              pemakaianBahan.status === "DISETUJUI"
                                ? "bg-white border border-red-200 hover:bg-red-50 text-red-600"
                                : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                            }
                          `}
                        >
                          {pemakaianBahan.status === "DISETUJUI" ? (
                            <ShieldCheck size={16} strokeWidth={2.2} />
                          ) : (
                            <BadgeCheck size={16} strokeWidth={2.2} />
                          )}

                          {pemakaianBahan.status === "DISETUJUI"
                            ? "Hapus Validasi"
                            : "Validasi Transaksi"}
                        </button>
                      </div>
                    )}

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={handlePrint}
                          className="
                            h-9 px-3.5
                            rounded-xl
                            border border-slate-200
                            bg-white/90
                            hover:bg-slate-50
                            text-[13px] font-medium text-slate-700
                            transition-all duration-200
                            cursor-pointer
                            flex items-center gap-2
                            shadow-sm hover:shadow
                          "
                        >
                          <Printer size={14} strokeWidth={2} />
                          Cetak
                        </button>
                        {(user?.role === "OWNER" || user?.role === "LEADER_PRODUKSI") &&
  pemakaianBahan.status !== "DISETUJUI" && (
    <>
      <button
        onClick={() => handleEdit(pemakaianBahan.id)}
        className="
          h-9 px-3.5
          rounded-xl
          border border-orange-100
          bg-orange-50
          hover:bg-orange-100
          text-[13px]
          font-medium
          text-orange-600
          transition-all duration-200
          cursor-pointer
          flex items-center gap-2
        "
      >
        <Pencil size={14} strokeWidth={2} />
        Edit
      </button>

      <button
        onClick={() => handleDelete(pemakaianBahan.id)}
        className="
          h-9 px-3.5
          rounded-xl
          border border-red-100
          bg-red-50
          hover:bg-red-100
          text-[13px]
          font-medium
          text-red-500
          transition-all duration-200
          cursor-pointer
          flex items-center gap-2
        "
      >
        <Trash2 size={14} strokeWidth={2} />
        Hapus
      </button>
    </>
  )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
                  {/* LEFT */}

                  <div className="xl:col-span-8 space-y-6">
                    {/* HEADER INFO */}

                    <div
                      className="
                        rounded-[30px]
                        border border-white/60
                        bg-white/80
                        backdrop-blur-2xl
                        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                        overflow-hidden
                      "
                    >
                      <div className="p-6 border-b border-slate-100">
                        <div className="flex items-start gap-4">
                          <div
                            className="
                              min-w-[58px] h-[58px]
                              rounded-2xl
                              bg-gradient-to-br
                              from-orange-500
                              to-amber-400
                              flex items-center justify-center
                              text-white
                              shadow-lg shadow-orange-200
                            "
                          >
                            <PackageMinus size={24} />
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                                {pemakaianBahan.id}
                              </h2>

                              <div
                                className={`
                                  px-2.5 py-1
                                  rounded-full
                                  border
                                  text-[10px]
                                  font-bold
                                  tracking-wide

                                  ${
                                    pemakaianBahan.status ===
                                    "DISETUJUI"
                                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                      : "bg-amber-50 border-amber-100 text-amber-600"
                                  }
                                `}
                              >
                                {pemakaianBahan.status ===
                                "DISETUJUI"
                                  ? "TERVALIDASI"
                                  : "BELUM VALIDASI"}
                              </div>
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              Dibuat Oleh :

                              <span className="font-semibold text-slate-700 ml-1">
                                {pemakaianBahan.user?.name}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* BODY */}

                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* tanggal */}

                          <div
                            className="
                              rounded-2xl
                              border border-orange-100
                              bg-orange-50/70
                              p-4
                            "
                          >
                            <p className="text-[11px] uppercase tracking-wide font-semibold text-orange-400">
                              Tanggal Dibuat
                            </p>

                            <h3 className="mt-2 text-sm font-bold text-orange-600">
                              {new Date(
                                pemakaianBahan.createdAt
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </h3>
                          </div>

                          {/* user */}

                          <div
                            className="
                              rounded-2xl
                              border border-slate-100
                              bg-slate-50
                              p-4
                            "
                          >
                            <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
                              Dibuat Oleh
                            </p>

                            <h3 className="mt-2 text-sm font-bold text-slate-700">
                              {pemakaianBahan.user?.name}
                            </h3>
                          </div>

                          {/* total qty */}

                          <div
                            className="
                              rounded-2xl
                              border border-amber-100
                              bg-amber-50/70
                              p-4
                            "
                          >
                            <p className="text-[11px] uppercase tracking-wide font-semibold text-amber-400">
                              Total Dipakai
                            </p>

                            <h3 className="mt-2 text-sm font-bold text-slate-800">
                              {pemakaianBahan.detailBahanSisa?.reduce(
                                (acc, curr) =>
                                  acc + curr.jumlahDipakai,
                                0
                              ) || 0}
                            </h3>
                          </div>
                        </div>

                        {/* CATATAN */}

                        <div
                          className="
                            mt-5
                            rounded-2xl
                            border border-slate-100
                            bg-slate-50/80
                            p-5
                          "
                        >
                          <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
                            Catatan
                          </p>

                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {pemakaianBahan.catatan ||
                              "Tidak ada catatan tambahan."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DETAIL ITEM */}

                    <div
                      className="
                        rounded-[30px]
                        border border-white/60
                        bg-white/80
                        backdrop-blur-xl
                        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                        p-6
                      "
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">
                            Detail Pemakaian Bahan
                          </h3>

                          <p className="text-sm text-slate-400 mt-1">
                            Seluruh bahan yang digunakan dalam transaksi.
                          </p>
                        </div>

                        <div
                          className="
                            px-4 py-2
                            rounded-2xl
                            bg-slate-100
                            text-xs font-bold
                            text-slate-500
                          "
                        >
                          {pemakaianBahan.detailBahanSisa?.length || 0} ITEM
                        </div>
                      </div>

                      <div className="space-y-4">
                        {pemakaianBahan.detailBahanSisa?.map(
                          (detail, detailIndex) => (
                            <div
                              key={detail.id}
                              className="
                                rounded-[24px]
                                border border-slate-100
                                bg-[#fcfcfc]
                                hover:bg-white
                                transition-all
                                p-5
                              "
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                <div className="flex items-center gap-4">
                                  <div
                                    className="
                                      w-11 h-11
                                      rounded-2xl
                                      bg-orange-100
                                      text-orange-600
                                      flex items-center justify-center
                                      text-sm font-bold
                                    "
                                  >
                                    {detailIndex + 1}
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-bold text-slate-800">
                                      {detail.bahan?.name}
                                    </h4>

                                    <p className="text-xs text-slate-400 mt-1">
                                      {detail.bahanId}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  {/* DIPAKAI */}

                                  <div
                                    className="
                                      min-w-[130px]
                                      rounded-2xl
                                      border border-red-100
                                      bg-red-50
                                      px-4 py-3
                                    "
                                  >
                                    <p className="text-[10px] uppercase tracking-wide font-semibold text-red-400">
                                      Dipakai
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-red-600">
                                      {detail.jumlahDipakai}
                                      {" "}
                                      {detail.bahan?.satuan}
                                    </h4>
                                  </div>

                                  {/* SISA */}

                                  <div
                                    className="
                                      min-w-[130px]
                                      rounded-2xl
                                      border border-amber-100
                                      bg-amber-50
                                      px-4 py-3
                                    "
                                  >
                                    <p className="text-[10px] uppercase tracking-wide font-semibold text-amber-400">
                                      Sisa
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-amber-600">
                                      {detail.jumlahSisa}
                                      {" "}
                                      {detail.bahan?.satuan}
                                    </h4>
                                  </div>

                                  {/* KEBUTUHAN */}

                                  <div
                                    className="
                                      min-w-[130px]
                                      rounded-2xl
                                      border border-orange-100
                                      bg-orange-50
                                      px-4 py-3
                                    "
                                  >
                                    <p className="text-[10px] uppercase tracking-wide font-semibold text-orange-400">
                                      Terpakai
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-orange-600">
                                      {detail.jumlahDipakai -
                                        detail.jumlahSisa}
                                      {" "}
                                      {detail.bahan?.satuan}
                                    </h4>
                                  </div>

                                  {/* STOK */}

                                  <div
                                    className="
                                      min-w-[130px]
                                      rounded-2xl
                                      bg-slate-100
                                      px-4 py-3
                                    "
                                  >
                                    <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-400">
                                      Stok Saat Ini
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-slate-700">
                                      {detail.bahan?.stok}
                                      {" "}
                                      {detail.bahan?.satuan}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div className="xl:col-span-4">
                    <div
                      className="
                        sticky top-24
                        rounded-[30px]
                        border border-white/60
                        bg-white/80
                        backdrop-blur-xl
                        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                        p-6
                      "
                    >
                      <h3 className="text-base font-bold text-slate-800">
                        Ringkasan Transaksi
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        Statistik singkat pemakaian bahan.
                      </p>

                      <div className="space-y-4 mt-6">
                        <div
                          className="
                            rounded-2xl
                            border border-orange-100
                            bg-orange-50/70
                            p-4
                          "
                        >
                          <p className="text-[11px] uppercase tracking-wide font-semibold text-orange-400">
                            Total Item
                          </p>

                          <h2 className="mt-2 text-2xl font-bold text-slate-800">
                            {pemakaianBahan.detailBahanSisa?.length || 0}
                          </h2>
                        </div>

                        <div
                          className="
                            rounded-2xl
                            border border-red-100
                            bg-red-50/70
                            p-4
                          "
                        >
                          <p className="text-[11px] uppercase tracking-wide font-semibold text-red-400">
                            Total Dipakai
                          </p>

                          <h2 className="mt-2 text-2xl font-bold text-slate-800">
                            {pemakaianBahan.detailBahanSisa?.reduce(
                              (acc, curr) =>
                                acc + curr.jumlahDipakai,
                              0
                            ) || 0}
                          </h2>
                        </div>

                        <div
                          className="
                            rounded-2xl
                            border border-amber-100
                            bg-amber-50/70
                            p-4
                          "
                        >
                          <p className="text-[11px] uppercase tracking-wide font-semibold text-amber-400">
                            Total Sisa
                          </p>

                          <h2 className="mt-2 text-2xl font-bold text-slate-800">
                            {pemakaianBahan.detailBahanSisa?.reduce(
                              (acc, curr) =>
                                acc + curr.jumlahSisa,
                              0
                            ) || 0}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="hidden">
        <CetakLaporanDetailPemakaianBahan
          ref={printRef}
          pemakaianBahan={pemakaianBahan}
        />
      </div>
    </>
  );
};

export default DetailPemakaianBahan;
