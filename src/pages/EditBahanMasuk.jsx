import React, { useContext, useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Check,
  ChevronsUpDown,
  CalendarDays,
  Loader2,
} from "lucide-react";

import MenuSlideBar from "../component/MenuSlidebar";
import NavbarV2 from "../component/NavbarV2";
import { SidebarContext } from "../component/SidebarContextProvider";
import { useAuth } from "../component/AuthContext";

import {
  GetAllBahan,
  GetDetailPenerimaanBahan,
  EditBahanMasuk,
} from "../service/Api";

import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditPenerimaanBahan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)

  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();

  const [openSelect, setOpenSelect] = useState(null);

  const [dataBahan, setDataBahan] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState({
    supplier: "",
    catatan: "",
    tanggalMasuk: new Date(),
    bahan: [
      {
        bahanId: "",
        jumlah: "",
      },
    ],
  });

  useEffect(() => {
    if (!user) return;

    if (!["STAFF_GUDANG"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["STAFF_GUDANG"].includes(user.role)
  ) {
    return null;
  }

  useEffect(() => {
    getDataBahan();
    getDetailData();
  }, []);

  const getDataBahan = async () => {
    try {
      const res = await GetAllBahan();

      setDataBahan(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailData = async () => {
    try {
      setLoadingPage(true);

      const res = await GetDetailPenerimaanBahan(id);

      const data = res.data;

      setForm({
        supplier: data.supplier || "",
        catatan: data.catatan || "",
        tanggalMasuk: new Date(data.tanggalMasuk),
        bahan:
          data.bahanMasuk?.map((item) => ({
            bahanId: item.bahanId,
            jumlah: item.jumlah,
          })) || [],
      });
    } catch (error) {
      console.log(error);

      toast.error("Gagal mengambil detail data", {
        position: "top-right",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBahanChange = (index, field, value) => {
    const updated = [...form.bahan];

    updated[index][field] = value;

    setForm({
      ...form,
      bahan: updated,
    });
  };

  const addBahanField = () => {
    setForm({
      ...form,
      bahan: [
        ...form.bahan,
        {
          bahanId: "",
          jumlah: "",
        },
      ],
    });
  };

  const removeBahanField = (index) => {
    const updated = form.bahan.filter((_, i) => i !== index);

    setForm({
      ...form,
      bahan: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingSubmit(true);

      const payload = {
        supplier: form.supplier,
        catatan: form.catatan,
        tanggalMasuk: new Date(form.tanggalMasuk).toISOString(),
        bahan: form.bahan.map((item) => ({
          bahanId: item.bahanId,
          jumlah: Number(item.jumlah),
        })),
      };

      const res = await EditBahanMasuk(id, payload);

      if (res.status === 200) {
        toast.success("Penerimaan bahan berhasil diperbarui", {
          position: "top-right",
          description: "Perubahan data berhasil disimpan",
          className: `
          !rounded-2xl
          !border !border-orange-100
          !bg-white
          !text-slate-800
          !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
          `,
        });

        navigate(`/bahan/detail-penerimaan-bahan/${id}`);
      }
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.data?.[0]?.message ||
        "Terjadi kesalahan sistem";

      toast.error("Gagal memperbarui data", {
        position: "top-right",
        description: message,
        className: `
        !rounded-2xl
        !border !border-orange-100
        !bg-white
        !text-slate-800
        !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
        `,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-[#f8f8f7]">
      {/* BACKGROUND */}
      <div
        className="
          absolute top-[-120px] right-[-100px]
          w-[420px] h-[420px]
          rounded-full
          bg-orange-200/40
          blur-3xl
          pointer-events-none
        "
      />

      <MenuSlideBar />

      <div
        className={`
          transition-all duration-300
          min-h-screen
          ${expanded ? "lg:ml-60" : "ml-16 lg:ml-16"}
        `}
      >
        <NavbarV2 />

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* HERO */}
          <div
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-white/60
              bg-gradient-to-br from-[#fff7ed] via-white to-[#fffaf5]
              p-6 sm:p-8
              shadow-[0_20px_60px_rgba(251,146,60,0.08)]
              mb-6
            "
          >
            <div
              className="
                absolute top-[-60px] right-[-40px]
                w-[220px] h-[220px]
                rounded-full
                bg-orange-200/30
                blur-3xl
              "
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1.5
                    rounded-full
                    bg-orange-100
                    text-orange-600
                    text-[11px]
                    font-bold
                    tracking-[0.2em]
                    uppercase
                  "
                >
                  Manajemen Penerimaan Bahan
                </div>

                <h1 className="mt-4 text-[30px] sm:text-[42px] font-bold tracking-tight text-slate-900">
                  Edit{" "}
                  <span className="text-orange-500">
                    Penerimaan Bahan
                  </span>
                </h1>

                <p className="mt-3 text-sm text-slate-500 max-w-2xl leading-relaxed">
                  Perbarui data penerimaan bahan untuk memastikan
                  informasi transaksi tetap akurat dan terintegrasi.
                </p>
              </div>

              <button
                onClick={() => window.history.back()}
                className="
                  h-11 px-5
                  rounded-2xl
                  bg-white
                  border border-slate-200
                  text-sm font-semibold text-slate-700
                  flex items-center gap-2
                  hover:bg-slate-50
                  transition-all
                  cursor-pointer
                "
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>
          </div>

          {/* CONTENT */}
          {loadingPage ? (
            <div
              className="
                rounded-[32px]
                border border-slate-200
                bg-white
                p-16
                flex flex-col items-center justify-center
              "
            >
              <Loader2
                size={42}
                className="animate-spin text-orange-500"
              />

              <p className="mt-5 text-sm text-slate-500">
                Memuat detail penerimaan bahan...
              </p>
            </div>
          ) : (
            <div
              className="
                relative overflow-hidden
                rounded-[32px]
                border border-white/60
                bg-white/80
                backdrop-blur-2xl
                shadow-[0_20px_70px_rgba(15,23,42,0.06)]
              "
            >
              <div
                className="
                  h-1.5 w-full
                  bg-gradient-to-r
                  from-orange-500
                  via-amber-400
                  to-yellow-300
                "
              />

              <div className="p-5 sm:p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800">
                    Informasi Penerimaan Bahan
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Edit data transaksi penerimaan bahan sesuai
                    kebutuhan.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* HEADER */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* supplier */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nama Supplier
                      </label>

                      <input
                        type="text"
                        name="supplier"
                        value={form.supplier}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan nama supplier"
                        className="
                          w-full h-13
                          rounded-2xl
                          border border-slate-200
                          bg-white
                          px-4
                          text-sm text-slate-700
                          outline-none
                          transition-all
                          focus:border-orange-300
                          focus:ring-4 focus:ring-orange-100
                        "
                      />
                    </div>

                    {/* tanggal */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Tanggal Masuk
                      </label>

                      <div className="relative">
                        <div
                          className="
                            absolute left-4 top-1/2 -translate-y-1/2
                            z-10
                            text-orange-500
                          "
                        >
                          <CalendarDays size={18} />
                        </div>

                        <DatePicker
                          selected={form.tanggalMasuk}
                          wrapperClassName="w-full"
                          onChange={(date) =>
                            setForm({
                              ...form,
                              tanggalMasuk: date,
                            })
                          }
                          dateFormat="dd MMMM yyyy"
                          className="
                            w-full h-13
                            rounded-2xl
                            border border-slate-200
                            bg-white
                            pl-12 pr-4
                            text-sm text-slate-700
                            outline-none
                            transition-all
                            focus:border-orange-300
                            focus:ring-4 focus:ring-orange-100
                          "
                        />
                      </div>
                    </div>
                  </div>

                  {/* CATATAN */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Catatan
                    </label>

                    <textarea
                      name="catatan"
                      value={form.catatan}
                      onChange={handleChange}
                      required
                      placeholder="Masukkan catatan penerimaan bahan"
                      className="
                        w-full min-h-[120px]
                        rounded-2xl
                        border border-slate-200
                        bg-white
                        p-4
                        text-sm text-slate-700
                        outline-none
                        transition-all
                        focus:border-orange-300
                        focus:ring-4 focus:ring-orange-100
                      "
                    />
                  </div>

                  {/* DETAIL BAHAN */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          Detail Bahan
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                          Edit detail bahan transaksi.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addBahanField}
                        className="
                          h-11 px-4
                          rounded-2xl
                          bg-orange-500
                          hover:bg-orange-600
                          text-white
                          text-sm font-semibold
                          flex items-center gap-2
                          transition-all
                          shadow-lg shadow-orange-200
                          cursor-pointer
                        "
                      >
                        Tambah Bahan
                      </button>
                    </div>

                    <div className="space-y-4">
                      {form.bahan.map((item, index) => {
                        const selectedBahan = dataBahan.find(
                          (b) => b.id === item.bahanId
                        );

                        return (
                          <div
                            key={index}
                            className="
                              rounded-[28px]
                              border border-slate-200
                              bg-[#fcfcfc]
                              p-5
                            "
                          >
                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-5">
                              <div className="flex items-center gap-3">
                                <div
                                  className="
                                    w-10 h-10
                                    rounded-2xl
                                    bg-orange-100
                                    text-orange-600
                                    flex items-center justify-center
                                    text-sm font-bold
                                  "
                                >
                                  {index + 1}
                                </div>

                                <div>
                                  <h4 className="text-sm font-bold text-slate-800">
                                    Bahan #{index + 1}
                                  </h4>

                                  <p className="text-xs text-slate-400">
                                    Detail bahan penerimaan
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeBahanField(index)
                                }
                                disabled={form.bahan.length === 1}
                                className="
                                  w-10 h-10
                                  rounded-2xl
                                  border border-red-100
                                  bg-red-50
                                  text-red-500
                                  flex items-center justify-center
                                  hover:bg-red-100
                                  transition-all
                                  disabled:opacity-50
                                  cursor-pointer
                                "
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>

                            {/* FORM */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                              {/* bahan */}
                              <div className="lg:col-span-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Nama Bahan
                                </label>

                                <Popover.Root
                                  open={openSelect === index}
                                  onOpenChange={(open) =>
                                    setOpenSelect(
                                      open ? index : null
                                    )
                                  }
                                >
                                  <Popover.Trigger asChild>
                                    <button
                                      type="button"
                                      className="
                                        w-full h-13
                                        rounded-2xl
                                        border border-slate-200
                                        bg-white
                                        px-4
                                        text-sm
                                        flex items-center justify-between
                                        text-slate-700
                                        hover:border-orange-300
                                        transition-all
                                      "
                                    >
                                      <span className="truncate">
                                        {selectedBahan
                                          ? selectedBahan.name
                                          : "Cari bahan..."}
                                      </span>

                                      <ChevronsUpDown
                                        size={16}
                                        className="opacity-50"
                                      />
                                    </button>
                                  </Popover.Trigger>

                                  <Popover.Portal>
                                    <Popover.Content
                                      sideOffset={8}
                                      align="start"
                                      className="
                                        z-50
                                        w-[420px]
                                        rounded-3xl
                                        border border-slate-200
                                        bg-white
                                        overflow-hidden
                                        shadow-[0_20px_70px_rgba(15,23,42,0.12)]
                                      "
                                    >
                                      <Command className="w-full bg-white">
                                        <div className="border-b border-slate-100 px-4">
                                          <Command.Input
                                            placeholder="Cari bahan..."
                                            className="
                                              w-full h-13
                                              text-sm text-slate-700
                                              outline-none
                                              bg-transparent
                                            "
                                          />
                                        </div>

                                        <Command.List className="max-h-[280px] overflow-y-auto p-2">
                                          <Command.Empty>
                                            <div className="py-8 text-center">
                                              <p className="text-sm text-slate-500">
                                                Bahan tidak ditemukan
                                              </p>
                                            </div>
                                          </Command.Empty>

                                          <Command.Group>
                                            {dataBahan.map((bahan) => (
                                              <Command.Item
                                                key={bahan.id}
                                                value={bahan.name}
                                                onSelect={() => {
                                                  handleBahanChange(
                                                    index,
                                                    "bahanId",
                                                    bahan.id
                                                  );

                                                  setOpenSelect(
                                                    null
                                                  );
                                                }}
                                                className="
                                                  flex items-center justify-between
                                                  px-4 py-3
                                                  rounded-2xl
                                                  cursor-pointer
                                                  hover:bg-orange-50
                                                  aria-selected:bg-orange-50
                                                  mb-1
                                                "
                                              >
                                                <div>
                                                  <p className="text-sm font-semibold text-slate-700">
                                                    {bahan.name}
                                                  </p>

                                                  <p className="text-xs text-slate-400 mt-0.5">
                                                    Satuan :{" "}
                                                    {bahan.satuan}
                                                  </p>
                                                </div>

                                                <div
                                                  className={`
                                                    w-6 h-6
                                                    rounded-full
                                                    flex items-center justify-center
                                                    ${
                                                      item.bahanId ===
                                                      bahan.id
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-slate-100 text-slate-300"
                                                    }
                                                  `}
                                                >
                                                  <Check size={13} />
                                                </div>
                                              </Command.Item>
                                            ))}
                                          </Command.Group>
                                        </Command.List>
                                      </Command>
                                    </Popover.Content>
                                  </Popover.Portal>
                                </Popover.Root>
                              </div>

                              {/* satuan */}
                              <div className="lg:col-span-3">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Satuan
                                </label>

                                <input
                                  type="text"
                                  value={
                                    selectedBahan?.satuan || "-"
                                  }
                                  readOnly
                                  className="
                                    w-full h-13
                                    rounded-2xl
                                    border border-slate-200
                                    bg-slate-50
                                    px-4
                                    text-sm text-slate-500
                                    outline-none
                                  "
                                />
                              </div>

                              {/* jumlah */}
                              <div className="lg:col-span-3">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Jumlah
                                </label>

                                <input
                                  type="number"
                                  min="0,1"
                                  value={item.jumlah}
                                  onWheel={(e) => e.target.blur()}
                                  onChange={(e) =>
                                    handleBahanChange(
                                      index,
                                      "jumlah",
                                      e.target.value
                                    )
                                  }
                                  required
                                  className="
                                    w-full h-13
                                    rounded-2xl
                                    border border-slate-200
                                    bg-white
                                    px-4
                                    text-sm text-slate-700
                                    outline-none
                                    transition-all
                                    focus:border-orange-300
                                    focus:ring-4 focus:ring-orange-100
                                    appearance-none
                                    [&::-webkit-outer-spin-button]:appearance-none
                                    [&::-webkit-inner-spin-button]:appearance-none
                                    [-moz-appearance:textfield]
                                  "
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ACTION */}
                  <div
                    className="
                      flex flex-col-reverse sm:flex-row
                      justify-end
                      gap-3
                      mt-10
                      pt-6
                      border-t border-slate-100
                    "
                  >
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="
                        h-12 px-5
                        rounded-2xl
                        bg-white
                        border border-slate-200
                        text-sm font-semibold text-slate-700
                        hover:bg-slate-50
                        transition-all
                        cursor-pointer
                      "
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={loadingSubmit}
                      className="
                        h-12 px-6
                        rounded-2xl
                        bg-gradient-to-r from-orange-500 to-amber-400
                        hover:from-orange-600 hover:to-amber-500
                        text-white
                        text-sm font-bold
                        flex items-center justify-center gap-2
                        shadow-xl shadow-orange-200/60
                        transition-all
                        disabled:opacity-70
                        cursor-pointer
                      "
                    >
                      <Save size={17} />

                      {loadingSubmit
                        ? "Menyimpan..."
                        : "Simpan Perubahan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPenerimaanBahan;