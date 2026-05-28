import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import React, { useContext, useState, useEffect } from "react";
import {
  GetAllBahanNonAktif,
  RestoreBahan,
  DeleteBahanPermanent,
} from "../service/Api";
import { RotateCcw, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavbarV2 from "../component/NavbarV2";
import { useAuth } from "../component/AuthContext";

const BahanNonAktif = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { expanded } = useContext(SidebarContext);
  const [bahan, setBahan] = useState([]);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // GET DATA
  const getData = async () => {
    try {
      const res = await GetAllBahanNonAktif();
      setBahan(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (!["OWNER", "STAFF_GUDANG"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["OWNER", "STAFF_GUDANG"].includes(user.role)
  ) {
    return null;
  }

  useEffect(() => {
    getData();
  }, []);

  // RESTORE
  const handleRestore = async (id) => {
    try {
      await RestoreBahan(id);
      toast.success("Bahan berhasil restore", {
        position: "top-right",
        description:'berhasil restore',
        className: `
          !rounded-2xl
          !border !border-orange-100
          !bg-white
          !text-slate-800
          !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
        `,
        descriptionClassName: "!text-slate-500",
      });
      getData();
    } catch (error) {
      toast.error("Gagal restore data");
    }
  };

  // DELETE PERMANENT
  const handleDelete = async (id) => {
    if (!id) return;

    toast("Konfirmasi Penghapusan", {
      description: "Data akan hapus permanen",
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
          const loadingToast = toast.loading("Menghapus data...", {
            position: "top-right",
            className: `
              !rounded-2xl
              !border !border-orange-100
              !bg-white
              !text-slate-800
              !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
            `,
          });

          try {
            await DeleteBahanPermanent(id);

            toast.success("Data berhasil dihapus", {
              id: loadingToast,
              position: "top-right",
              description: "Data sudah dihapus dari sistem",
              className: `
                !rounded-2xl
                !border !border-orange-100
                !bg-white
                !text-slate-800
                !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
              `,
              descriptionClassName: "!text-slate-500",
            });

            getData();
          } catch (error) {
            toast.error("Gagal menghapus data", {
              id: loadingToast,
              position: "top-right",
              description:
                error?.response?.data?.message || "Terjadi kesalahan sistem",
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

  // FILTER
  const filteredBahan = bahan.filter((item) =>
    item?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredBahan.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentBahan = filteredBahan.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="w-full min-h-screen relative bg-[#f8f8f7]">
      {/* BG */}
      <div className="absolute z-0 top-0 right-0 w-[420px] h-[420px] rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />

      <MenuSlideBar />

      <div
        className={`transition-all duration-300 ${
          expanded ? "lg:ml-60" : "ml-16 lg:ml-16"
        }`}
      >
        <NavbarV2 />

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* HEADER */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-500">
                Manajemen Bahan
              </p>

              <h1 className="text-[30px] sm:text-[42px] leading-none font-bold text-slate-900 mt-2">
                Data <span className="text-orange-500">Non Aktif</span>
              </h1>

              <p className="text-slate-500 text-sm mt-3 max-w-xl">
                Kelola data bahan yang sudah dinonaktifkan
              </p>
            </div>

            {/* SEARCH */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
              {/* INPUT */}
              <div className="relative w-full lg:w-[360px]">
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
                  placeholder="Cari bahan..."
                  className="
      w-full h-11
      rounded-2xl
      border border-[#ececec]
      bg-white
      pl-12 pr-4
      text-sm text-slate-700
      outline-none
      focus:border-orange-300
      focus:ring-4 focus:ring-orange-100
      shadow-sm
    "
                />
              </div>

              <button
                onClick={() => navigate("/bahan/kelola-bahan")}
                className="
    h-11 px-5
    w-full sm:w-auto

    rounded-2xl
    bg-orange-500
    hover:bg-orange-600
    text-white
    text-sm font-semibold

    flex items-center justify-center gap-2

    shadow-lg shadow-orange-200
    transition-all
    whitespace-nowrap
    cursor-pointer
  "
              >
                            <ArrowLeft size={16} />

                Kembali
              </button>
            </div>
          </div>

          {/* MOBILE CARD */}
          <div className="block lg:hidden mt-6">
            {currentBahan.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white border border-[#ececec] rounded-2xl mb-3"
              >
                <p className="font-semibold text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-400">ID: {item.id}</p>

                <div className="text-sm text-slate-600 mt-2 space-y-1">
                  <p>Stok: {item.stok}</p>
                  <p>Satuan: {item.satuan}</p>
                  <p>Min: {item.jumlahMinimum}</p>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleRestore(item.id)}
                    className="flex-1 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="mt-6 bg-white border border-[#ececec] rounded-[24px] sm:rounded-[32px] shadow-sm overflow-hidden hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f1f1f1]">
                    {[
                      "No",
                      "Nama Bahan",
                      "Stok Min",
                      "Stok",
                      "Satuan",
                      "Aksi",
                    ].map((h) => (
                      <th key={h} className="px-6 py-5 text-left">
                        <p className="text-[11px] uppercase font-semibold text-slate-400">
                          {h}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {currentBahan.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#f5f5f5] hover:bg-[#fcfcfc]"
                    >
                      <td className="px-6 py-6 text-slate-500 text-sm">
                        {startIndex + index + 1}
                      </td>

                      <td className="px-6 py-6">
                        <p className="font-semibold text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400">ID: {item.id}</p>
                      </td>

                      <td className="px-6 py-6 text-slate-600">
                        {item.jumlahMinimum}
                      </td>

                      <td className="px-6 py-6 text-slate-600">{item.stok}</td>

                      <td className="px-6 py-6 text-slate-600">
                        {item.satuan}
                      </td>

                      {/* ACTION ICON */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center"
                          >
                            <RotateCcw size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EMPTY */}
          {currentBahan.length === 0 && (
            <div className="text-center text-slate-400 py-10">
              Tidak ada data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BahanNonAktif;
