import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import React, { useContext, useState, useEffect, useRef } from "react";
import { GetAllPenerimaanBahan } from "../service/Api";
import {
  Plus,
  Inbox,
  PackageCheck,
  CheckCircle2,
  Clock3,
  Filter,
  RotateCcw,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import NavbarV2 from "../component/NavbarV2";
import { useReactToPrint } from "react-to-print";
import CetakLaporanBahanMasuk from "../component/CetakLaporanBahanMasuk";

const BahanMasuk = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [bahan, setBahan] = useState([]);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const isOwner = user?.role === "OWNER";
  const isStaffGudang = user?.role === "STAFF_GUDANG";
  const isSupervisorProduksi = user?.role === "SUPERVISOR_PRODUKSI";
  const showTambah = isStaffGudang;
  const showFilter = isOwner;
  const showCetak = isStaffGudang || isSupervisorProduksi;
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const getData = async (customFilters = filters) => {
    try {
      const getPenerimaanBahan = await GetAllPenerimaanBahan({
        startDate: customFilters.startDate,
        endDate: customFilters.endDate,
      });

      const bahanMasuk = getPenerimaanBahan.data.sort(
        (a, b) => new Date(b.tanggalMasuk) - new Date(a.tanggalMasuk)
      );

      setBahan(bahanMasuk);
    } catch (error) {
      console.error("Gagal mengambil data bahan masuk :", error);
      setBahan([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!["OWNER", "STAFF_GUDANG", "SUPERVISOR_PRODUKSI"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["OWNER", "STAFF_GUDANG", "SUPERVISOR_PRODUKSI"].includes(user.role)
  ) {
    return null;
  }

  const handleAdd = () => {
    navigate("/bahan/tambah-penerimaan-bahan");
  };

  const filteredBahan = bahan.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase())
  );
  const handleApplyFilter = () => {
    getData(filters);
    setShowFilterModal(false);
  };
  const handleResetFilter = () => {
    const resetFilter = {
      startDate: "",
      endDate: "",
    };
    setFilters(resetFilter);
    getData(resetFilter);
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  const totalItems = filteredBahan.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBahan = filteredBahan.slice(startIndex, endIndex);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const printRef = useRef(null);

  const dataCetak =
    filters.startDate && filters.endDate
      ? bahan.filter((item) => {
          const tanggal = new Date(item.tanggalMasuk);
          const start = new Date(filters.startDate);
          const end = new Date(filters.endDate);
  
          end.setHours(23, 59, 59, 999);
  
          return tanggal >= start && tanggal <= end;
        })
      : bahan;
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Data Penerimaan Bahan",
  });
  
  const handleCetak = () => {
    setShowFilterModal(false);
  
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  return (
    <div className="w-full min-h-screen relative bg-[#f8f8f7]">
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white shadow-2xl border border-white/70 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {isOwner ? "Filter Tanggal" : "Cetak Data"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {isOwner
                  ? "Pilih rentang tanggal penerimaan bahan."
                  : "Pilih rentang tanggal data penerimaan bahan yang ingin dicetak."}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="
              mt-2 w-full h-11 px-4
              rounded-2xl border border-slate-200
              text-sm text-slate-700
              outline-none
              focus:border-orange-300
              focus:ring-4 focus:ring-orange-100
            "
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Akhir
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className="
              mt-2 w-full h-11 px-4
              rounded-2xl border border-slate-200
              text-sm text-slate-700
              outline-none
              focus:border-orange-300
              focus:ring-4 focus:ring-orange-100
            "
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setShowFilterModal(false)}
                className="
            h-10 px-4 rounded-xl
            bg-white border border-slate-200
            text-sm font-semibold text-slate-600
            hover:bg-slate-100 transition-all
            cursor-pointer
          "
              >
                Batal
              </button>

              <button
                onClick={isOwner ? handleApplyFilter : handleCetak}
                className="
            h-10 px-5 rounded-xl
            bg-gradient-to-r from-amber-500 to-orange-500
            text-white text-sm font-bold
            shadow-md shadow-orange-200
            hover:-translate-y-0.5
            hover:shadow-lg hover:shadow-orange-200
            transition-all cursor-pointer
          "
              >
                {isOwner ? "Terapkan" : "Cetak"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="
    absolute z-0
    top-[0px] right-[0px]
    w-[420px] h-[420px]
    rounded-full
    bg-orange-200/30
    blur-3xl
    pointer-events-none
  "
      ></div>
      <MenuSlideBar />
      <div className="min-h-screen">
        <div
          className={`
            transition-all duration-300
            ${expanded ? "lg:ml-60" : "ml-16 lg:ml-16"}
          `}
        >
          {/* NAVBAR */}
          <NavbarV2 />

          {/* CONTENT */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {/* HEADER */}
            <div
              className="
                flex flex-col xl:flex-row
                xl:items-center
                xl:justify-between
                gap-6
                
              "
            >
              {/* LEFT */}
              <div className="mb-0 lg:mb-4">
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-500">
                  Manajemen Penerimaan Bahan
                </p>

                <h1 className="text-[30px] sm:text-[42px] leading-none font-bold text-slate-900 mt-2">
                  Data <span className="text-orange-500">Penerimaan Bahan</span>
                </h1>

                <p className="text-slate-500 text-sm mt-3 max-w-xl">
                  Kelola data penerimaan bahan yang masuk untuk mendukung proses
                  pencatatan bahan produksi.
                </p>
              </div>

              {/* ACTION */}
              <div className="flex flex-col sm:flex-row mb-4 gap-3 w-full xl:w-auto">
                {/* SEARCH → SEMUA ROLE */}
                <div className="w-full sm:w-[320px] relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 absolute left-4 top-3 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari penerimaan bahan..."
                    className="
      w-full h-11
      rounded-2xl
      border border-[#ececec]
      bg-white
      pl-12 pr-4
      text-sm text-slate-700
      placeholder:text-slate-400
      outline-none
      transition-all
      focus:border-orange-300
      focus:ring-4 focus:ring-orange-100
      shadow-sm
    "
                  />
                </div>

                {/* ACTION */}
                {(showTambah || showFilter || showCetak) && (
                  <div className="flex flex-col gap-3 w-full sm:w-auto">
                    {showTambah && (
                      <button
                        onClick={handleAdd}
                        className="
          h-11 px-5
          rounded-2xl
          bg-orange-500
          hover:bg-orange-600
          text-white
          text-sm font-semibold
          flex items-center justify-center gap-2
          shadow-lg shadow-orange-200
          transition-all
          cursor-pointer
          w-max
        "
                      >
                        <Plus size={18} />
                        Tambah penerimaan bahan
                      </button>
                    )}

                    <div className="flex gap-3 justify-end">
                      {showFilter && (
                        <>
                          <button
                            onClick={() => setShowFilterModal(true)}
                            className="
            h-11 px-5
            rounded-2xl
            bg-white/80
            backdrop-blur-xl
            border border-[#ececec]
            text-sm font-semibold text-slate-700
            flex items-center gap-2
            shadow-sm
            hover:border-orange-200
            hover:bg-orange-50
            hover:-translate-y-0.5
            transition-all
            cursor-pointer
          "
                          >
                            <Filter size={16} className="text-orange-500" />
                            Filter
                          </button>
                          <button
                            onClick={handleResetFilter}
                            title="Reset Filter"
                            className="h-10 w-10 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500 transition-all cursor-pointer"
                          >
                            <RotateCcw size={16} />
                          </button>
                        </>
                      )}

                      {showCetak && (
                        <button
                          onClick={() => setShowFilterModal(true)}
                          className="
            h-11 px-5
            rounded-2xl
            bg-white/80
            backdrop-blur-xl
            border border-[#ececec]
            text-sm font-semibold text-slate-700
            flex items-center gap-2
            shadow-sm
            hover:border-amber-200
            hover:bg-amber-50
            hover:-translate-y-0.5
            transition-all
            cursor-pointer
          "
                        >
                          <Download size={16} className="text-amber-500" />
                          Cetak
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TABLE CARD */}
            <div
              className="
                bg-white
                border border-[#ececec]
                rounded-[24px] sm:rounded-[32px]
                shadow-sm
                overflow-hidden
              "
            >
              {/* MOBILE CARD */}
              <div className="block lg:hidden">
                {currentBahan.length > 0 ? (
                  <div className="divide-y divide-[#f3f3f3]">
                    {currentBahan.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() =>
                          navigate(`/bahan/detail-penerimaan-bahan/${item.id}`)
                        }
                        className="
            p-5
            cursor-pointer
            hover:bg-[#fafafa]
            transition-all
          "
                      >
                        {/* TOP */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-800">
                              {item.id}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Transaksi penerimaan bahan
                            </p>
                          </div>

                          <div
                            className={`
                inline-flex items-center gap-2
                px-3 py-1.5
                rounded-xl
                border
                text-xs
                font-semibold
                ${
                  item.konfirmasi
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : "bg-amber-50 border-amber-100 text-amber-600"
                }
              `}
                          >
                            {item.konfirmasi ? "TERVALIDASI" : "PENDING"}
                          </div>
                        </div>

                        {/* PENERIMA */}
                        <div className="mt-5">
                          <p className="text-xs text-slate-400">Penerima</p>

                          <div
                            className="
                inline-flex mt-2
                px-3 py-1
                rounded-xl
                bg-indigo-50
                text-indigo-500
                text-xs
                font-semibold
              "
                          >
                            {item.user?.name || "-"}
                          </div>
                        </div>

                        {/* SUPPLIER */}
                        <div className="mt-5">
                          <p className="text-xs text-slate-400">Supplier</p>

                          <p className="text-sm font-medium text-slate-700 mt-1">
                            {item.supplier || "-"}
                          </p>
                        </div>

                        {/* TOTAL ITEM */}
                        <div className="mt-5">
                          <p className="text-xs text-slate-400">Total Item</p>

                          <div
                            className="
                inline-flex items-center gap-2
                mt-2
                px-3 py-2
                rounded-xl
                bg-orange-50
                text-orange-600
                text-xs
                font-semibold
              "
                          >
                            <Inbox size={14} />
                            {item.bahanMasuk?.length || 0} Item
                          </div>
                        </div>

                        {/* TANGGAL */}
                        <div className="mt-5">
                          <p className="text-xs text-slate-400">Tanggal</p>

                          <p className="text-sm font-medium text-slate-700 mt-1">
                            {new Date(item.tanggalMasuk).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        {/* CATATAN */}
                        <div className="mt-5">
                          <p className="text-xs text-slate-400">Catatan</p>

                          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                            {item.catatan || "-"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-400">
                    {search
                      ? "Data tidak ditemukan"
                      : "Data penerimaan bahan belum tersedia"}
                  </div>
                )}
              </div>
              {/* DESKTOP TABLE */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f1f1f1]">
                      {[
                        "No",
                        "ID Transaksi",
                        "Penerima",
                        "Total Item",
                        "Status",
                        "Tanggal",
                      ].map((head) => (
                        <th key={head} className="px-6 py-5 text-left">
                          <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                            {head}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currentBahan.length > 0 ? (
                      currentBahan.map((item, index) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            navigate(
                              `/bahan/detail-penerimaan-bahan/${item.id}`
                            )
                          }
                          className="
              border-b border-[#f5f5f5]
              hover:bg-[#f9fdfb]
              transition-all
              cursor-pointer
            "
                        >
                          {/* NO */}
                          <td className="px-6 py-6 text-sm text-slate-500 font-medium">
                            {startIndex + index + 1}
                          </td>

                          {/* ID */}
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-3">
                              <div
                                className="
                    w-10 h-10
                    rounded-2xl
                    bg-orange-50
                    text-orange-600
                    flex items-center justify-center
                  "
                              >
                                <Inbox size={18} />
                              </div>

                              <div>
                                <h3 className="text-xs font-medium text-slate-800">
                                  {item.id}
                                </h3>
                              </div>
                            </div>
                          </td>

                          {/* PENERIMA */}
                          <td className="px-6 py-6">
                            <span
                              className="
                  px-3 py-1
                  rounded-xl
                  bg-indigo-50
                  text-indigo-500
                  text-xs
                  font-semibold
                "
                            >
                              {item.user?.name || "-"}
                            </span>
                          </td>

                          {/* TOTAL ITEM */}
                          <td className="px-6 py-6">
                            <div
                              className="
                  inline-flex items-center gap-2
                  px-3 py-1.5
                  rounded-xl
                  bg-slate-100
                  text-slate-600
                  text-xs
                  font-semibold
                "
                            >
                              <PackageCheck size={14} />
                              {item.bahanMasuk?.length || 0} Item
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-6">
                            <div
                              className={`
                  inline-flex items-center gap-2
                  px-3 py-1.5
                  rounded-xl
                  border
                  text-[10px]
                  font-semibold
                  ${
                    item.konfirmasi
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : "bg-amber-50 border-amber-100 text-amber-600"
                  }
                `}
                            >
                              {item.konfirmasi ? (
                                <>
                                  <CheckCircle2 size={14} />
                                  TERVALIDASI
                                </>
                              ) : (
                                <>
                                  <Clock3 size={14} />
                                  PENDING
                                </>
                              )}
                            </div>
                          </td>

                          {/* TANGGAL */}
                          <td className="px-6 py-6 text-sm text-slate-500">
                            {new Date(item.tanggalMasuk).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-14 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div
                              className="
                  w-16 h-16
                  rounded-2xl
                  bg-slate-100
                  flex items-center justify-center
                  mb-4
                "
                            >
                              <Inbox className="text-slate-400" size={28} />
                            </div>

                            <p className="text-sm font-semibold text-slate-600">
                              Data penerimaan bahan kosong
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Belum ada data penerimaan bahan
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div
                className="
                  flex flex-col sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  px-4 sm:px-6
                  py-5
                  border-t border-[#f1f1f1]
                "
              >
                <p className="text-sm text-slate-400">
                  Menampilkan{" "}
                  <span className="font-semibold text-slate-700">
                    {totalItems === 0
                      ? 0
                      : `${startIndex + 1}-${Math.min(endIndex, totalItems)}`}
                  </span>{" "}
                  dari {totalItems} data
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="
                      w-10 h-10
                      rounded-xl
                      border border-[#ececec]
                      bg-white
                      text-slate-500
                      hover:bg-slate-50
                      transition-all
                      disabled:opacity-50
                      cursor-pointer
                    "
                  >
                    ‹
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                          w-10 h-10
                          rounded-xl
                          text-sm
                          font-semibold
                          transition-all
                          cursor-pointer
                          ${
                            currentPage === page
                              ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                              : "border border-[#ececec] bg-white text-slate-600 hover:bg-slate-50"
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="
                      w-10 h-10
                      rounded-xl
                      border border-[#ececec]
                      bg-white
                      text-slate-500
                      hover:bg-slate-50
                      transition-all
                      disabled:opacity-50
                      cursor-pointer
                    "
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
  <CetakLaporanBahanMasuk
    ref={printRef}
    data={dataCetak}
    filters={filters}
  />
</div>
    </div>
  );
};

export default BahanMasuk;
