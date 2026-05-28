import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import React, { useContext, useState, useEffect } from "react";
import {
  GetAllUsers,
  RestorePengguna,
  DeletePenggunaPermanent,
} from "../service/Api";
import { RotateCcw, Trash2, ArrowLeft, Inbox, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavbarV2 from "../component/NavbarV2";
import { useAuth } from "../component/AuthContext";

const GudangNonAktif = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { expanded } = useContext(SidebarContext);
  const [gudang, setGudang] = useState([]);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // GET DATA
  const getData = async () => {
    try {
      const getUsers = await GetAllUsers();
      const GudangProduksi = getUsers.data
        .filter(
          (user) =>
            user.role === "STAFF_GUDANG" && user.isActive === false
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setGudang(GudangProduksi);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (!["OWNER"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["OWNER"].includes(user.role)
  ) {
    return null;
  }

  useEffect(() => {
    getData();
  }, []);

  // RESTORE
  const handleRestore = async (id) => {
    try {
      await RestorePengguna(id);
      toast.success("Staff gudang berhasil restore", {
        position: "top-right",
        description: "berhasil restore",
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
            await DeletePenggunaPermanent(id);

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
  const filteredGudang = gudang.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredGudang.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGudang = filteredGudang.slice(startIndex, endIndex);
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
                Manajemen Staff Gudang
              </p>

              <h1 className="text-[30px] sm:text-[42px] leading-none font-bold text-slate-900 mt-2">
                Data <span className="text-orange-500">Non Aktif</span>
              </h1>

              <p className="text-slate-500 text-sm mt-3 max-w-xl">
                Kelola data staff gudang yang sudah dinonaktifkan
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
                  placeholder="Cari staff gudang..."
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
                onClick={() => navigate("/pengguna/staff-gudang")}
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
          <div
              className="
                bg-white
                border border-[#ececec]
                rounded-[24px] sm:rounded-[32px]
                shadow-sm
                overflow-hidden
                mt-4
              "
            >
              {/* MOBILE CARD */}
              <div className="block lg:hidden">
                {currentGudang.length > 0 ? (
                  <div className="divide-y divide-[#f3f3f3]">
                    {currentGudang.map((item, index) => (
                      <div key={item.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-800">
                              {item.name}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              NIK : {item.nik}
                            </p>
                          </div>

                          <span
                            className="
                              px-3 py-1
                              rounded-xl
                              bg-indigo-50
                              text-indigo-500
                              text-xs
                              font-semibold
                              whitespace-nowrap
                            "
                          >
                            Email {item.jumlahMinimum || "-"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5">
                          <div className="col-span-2">
                            <p className="text-xs text-slate-400">
                              Tanggal Dibuat
                            </p>

                            <p className="text-sm font-medium text-slate-700 mt-1">
                              {new Date(item.createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        {/* ACTION */}
                        <div className="flex items-center gap-3 mt-5">
                          <button
                            onClick={() => handleEdit(item.nik)}
                            className="
                              flex-1 h-11
                              rounded-2xl
                              bg-orange-50
                              hover:bg-orange-100
                              text-orange-500
                              text-sm font-semibold
                              flex items-center justify-center gap-2
                              transition-all
                            "
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="
                              flex-1 h-11
                              rounded-2xl
                              bg-red-50
                              hover:bg-red-100
                              text-red-500
                              text-sm font-semibold
                              flex items-center justify-center gap-2
                              transition-all
                            "
                          >
                            <Trash2 size={16} />
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-400">
                    {search
                      ? "Data tidak ditemukan"
                      : "Data Gudang belum tersedia"}
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
                        "Nama Gudang",
                        "Email",
                        "Tanggal Dibuat",
                        "Aksi",
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
  {currentGudang.length > 0 ? (
    currentGudang.map((item, index) => (
      <tr
        key={item.id}
        className="
          border-b border-[#f5f5f5]
          hover:bg-[#fcfcfc]
          transition-all
        "
      >
        <td className="px-6 py-6 text-sm text-slate-500 font-medium">
          {startIndex + index + 1}
        </td>

        <td className="px-6 py-6">
          <div>
            <p className="font-semibold text-slate-800">
              {item.name}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              NIK : {item.nik}
            </p>
          </div>
        </td>

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
            {item.email || "-"}
          </span>
        </td>

        <td className="px-6 py-6 text-sm text-slate-500">
          {new Date(item.createdAt).toLocaleDateString(
            "id-ID",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}
        </td>

        <td className="px-6 py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleRestore(item.id)}
              className="
                w-10 h-10
                rounded-2xl
                bg-orange-50
                hover:bg-orange-100
                text-orange-500
                flex items-center justify-center
                transition-all
                cursor-pointer
              "
            >
              <RotateCcw size={17} />
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="
                w-10 h-10
                rounded-2xl
                bg-red-50
                hover:bg-red-100
                text-red-500
                flex items-center justify-center
                transition-all
                cursor-pointer
              "
            >
              <Trash2 size={17} />
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={5}
        className="px-6 py-14 text-center"
      >
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
            Data staff gudang kosong
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Belum ada data staff gudang
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
  );
};

export default GudangNonAktif;
