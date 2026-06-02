import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import React, { useContext, useState, useEffect } from "react";
import { GetAllBahan, DeleteBahan } from "../service/Api";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../component/AuthContext";
import NavbarV2 from "../component/NavbarV2";

const Bahan = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [bahan, setBahan] = useState([]);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const getBahan = await GetAllBahan();
      setBahan(getBahan.data);
      console.log(getBahan.data);
    } catch (error) {
      console.error("Gagal mengambil data bahan :", error);
      setProduct([]);
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
  const canManageBahan = ["STAFF_GUDANG"].includes(user?.role);

  const handleAdd = () => {
    navigate("/bahan/tambah-bahan");
  };
  const handleEdit = (id) => {
    navigate(`/bahan/edit-bahan/${id}`);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    toast("Konfirmasi Penghapusan", {
      description: "Data akan dinonaktifkan",
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
            await DeleteBahan(id);

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

  const filteredBahan = bahan.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredBahan.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBahan = filteredBahan.slice(startIndex, endIndex);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="w-full min-h-screen relative bg-[#f8f8f7]">
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
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-orange-500">
                  Manajemen Bahan
                </p>

                <h1 className="text-[30px] sm:text-[42px] leading-none font-bold text-slate-900 mt-2">
                  Data <span className="text-orange-500">Bahan</span>
                </h1>

                <p className="text-slate-500 text-sm mt-3 max-w-xl">
                  Kelola data bahan baku yang digunakan dalam proses produksi
                </p>
              </div>

              {/* ACTION */}
              <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                {/* SEARCH */}
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
                    placeholder="Cari bahan..."
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

                {/* BUTTON */}
                {(user?.role === "STAFF_GUDANG") && (
                  <button
                    onClick={handleAdd}
                    className="
      h-11 px-5
      rounded-2xl
      bg-orange-500
      hover:bg-orange-600
      text-white
      text-sm
      font-semibold
      flex items-center justify-center gap-2
      shadow-lg shadow-orange-200
      transition-all
      cursor-pointer
      whitespace-nowrap
    "
                  >
                    <Plus size={18} />
                    Tambah Bahan
                  </button>
                )}

                {(user?.role === "SUPERVISOR_PRODUKSI" ||
                user?.role === "OWNER" ||
                  user?.role === "LEADER_PRODUKSI") && (
                  <button
                    onClick={() => window.history.back()}
                    className="
                  h-12 px-5
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  backdrop-blur-xl
                  border border-white
      font-semibold
      text-sm 
                  flex items-center justify-center gap-2
                  shadow-lg shadow-orange-100/50
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  transition-all
                  whitespace-nowrap
                  cursor-pointer
                "
                  >
                    <ArrowLeft size={17} />
                    Kembali
                  </button>
                )}
              </div>
            </div>
            {(user?.role === "OWNER" || user?.role === "STAFF_GUDANG") && (
              <div className="w-full flex justify-end">
                <button
                  onClick={() => navigate("/bahan/bahan-nonaktif")}
                  className="
    h-11 px-5
    rounded-2xl
    cursor-pointer
    bg-white/80
    backdrop-blur-xl
    border border-[#ececec]

    text-sm font-semibold text-slate-700

    flex items-center gap-2
    justify-center

    shadow-sm
    hover:shadow-lg
    hover:-translate-y-0.5

    hover:border-orange-200
    hover:bg-orange-50

    transition-all
  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-orange-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L12 12m0 0l-5.25-5.25M12 12v7.5"
                    />
                  </svg>
                  Lihat Non Aktif
                </button>
              </div>
            )}

            {/* TABLE CARD */}
            <div
              className="
                bg-white
                border border-[#ececec]
                rounded-[24px] sm:rounded-[32px]
                shadow-sm
                overflow-hidden
                mt-5
              "
            >
              {/* MOBILE CARD */}
              <div className="block lg:hidden">
                {currentBahan.length > 0 ? (
                  <div className="divide-y divide-[#f3f3f3]">
                    {currentBahan.map((item, index) => (
                      <div key={item.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-800">
                              {item.name}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              ID : {item.id}
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
                            Min {item.jumlahMinimum || "-"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5">
                          <div>
                            <p className="text-xs text-slate-400">Stok</p>

                            <p className="text-sm font-medium text-slate-700 mt-1">
                              {item.stok || "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">Satuan</p>

                            <p className="text-sm font-medium text-slate-700 mt-1">
                              {item.satuan || "-"}
                            </p>
                          </div>

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
                        {canManageBahan && (
                        <div className="flex items-center gap-3 mt-5">
                          <button
                            onClick={() => handleEdit(item.id)}
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
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-400">
                    {search
                      ? "Data tidak ditemukan"
                      : "Data bahan belum tersedia"}
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
                        "Nama Bahan",
                        "Stok Min",
                        "Stok Bahan",
                        "Satuan",
                        "Tanggal Dibuat",
                        ...(canManageBahan ? ["Aksi"] : []),
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
                    {currentBahan.map((item, index) => (
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
                              ID : {item.id}
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
                            {item.jumlahMinimum || "-"}
                          </span>
                        </td>

                        <td className="px-6 py-6 text-sm text-slate-500">
                          {item.stok || "-"}
                        </td>

                        <td className="px-6 py-6 text-sm text-slate-500">
                          {item.satuan || "-"}
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
                        {canManageBahan && (
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleEdit(item.id)}
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
                                <Pencil size={17} />
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
                        )}
                      </tr>
                    ))}
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
    </div>
  );
};

export default Bahan;
