import React, { useContext, useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import { AddBahanMasuk, GetAllBahan } from "../service/Api";
import { toast } from "sonner";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarV2 from "../component/NavbarV2";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

const AddPenerimaanBahan = () => {
  const navigate = useNavigate();
  const [openSelect, setOpenSelect] = useState(null);
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [dataBahan, setDataBahan] = useState([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    getDataBahan();
  }, []);

  const getDataBahan = async () => {
    try {
      const res = await GetAllBahan();
      console.log(res.data);

      setDataBahan(res.data);
    } catch (error) {
      console.log(error);
    }
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

  const addData = async (payload) => {
    try {
      setLoading(true);

      const res = await AddBahanMasuk(payload);

      if (res.status === 201) {
        toast.success("Penerimaan bahan berhasil ditambahkan", {
          position: "top-right",
          description: "Data transaksi berhasil disimpan",
          className: `
            !rounded-2xl
            !border !border-orange-100
            !bg-white
            !text-slate-800
            !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
          `,
          descriptionClassName: "!text-slate-500",
        });

        navigate("/bahan/penerimaan-bahan");

        return res.data;
      }

      return null;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.data?.[0]?.message ||
        "Terjadi kesalahan sistem";

      toast.error("Gagal menambahkan penerimaan bahan", {
        position: "top-right",
        description: message,
        className: `
          !rounded-2xl
          !border !border-red-100
          !bg-white
          !text-slate-800
          !shadow-[0_10px_40px_rgba(239,68,68,0.10)]
        `,
        descriptionClassName: "!text-slate-500",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      supplier: form.supplier,
      catatan: form.catatan,
      tanggalMasuk: form.tanggalMasuk,
      bahan: form.bahan.map((item) => ({
        bahanId: item.bahanId,
        jumlah: Number(item.jumlah),
      })),
    };

    addData(payload);
  };

  console.log(dataBahan);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-[#f8f8f7]">
      {/* background */}
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

                <h1 className="mt-4 text-[34px] sm:text-[48px] leading-none font-black tracking-tight text-slate-900">
                  Tambah{" "}
                  <span className="text-orange-500">Penerimaan Bahan</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                  Tambahkan data penerimaan bahan untuk mendukung proses
                  pencatatan, pengelolaan, dan operasional bahan produksi secara
                  lebih terstruktur.
                </p>
              </div>

              <button
                onClick={() => window.history.back()}
                className="
                  h-12 px-5
                  rounded-2xl
                  bg-white/90
                  backdrop-blur-xl
                  border border-white
                  text-sm font-semibold text-slate-700
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
            </div>
          </div>

          {/* FORM */}
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
                  Lengkapi data transaksi penerimaan bahan dengan benar sebelum
                  menyimpan data.
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
                        bg-white/80
                        px-4
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
                  {/* tanggal */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Tanggal Masuk
  </label>

  <div className="relative group">
    {/* ICON */}
    <div
      className="
        absolute left-4 top-1/2 -translate-y-1/2
        z-10
        w-10 h-10
        rounded-2xl
        bg-gradient-to-br
        from-orange-100
        to-amber-50
        text-orange-500
        flex items-center justify-center
        shadow-sm
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
      placeholderText="Pilih tanggal masuk"
      className="
      w-full h-13
      rounded-2xl
      border border-slate-200
      bg-white/80
      pl-17 pr-5
      text-sm text-slate-700
      placeholder:text-slate-400
      outline-none
      transition-all
      focus:border-orange-300
      focus:ring-4 focus:ring-orange-100
      shadow-sm
      "
      calendarClassName="
        !border-0
        !rounded-[24px]
        !shadow-[0_20px_80px_rgba(15,23,42,0.16)]
        !overflow-hidden
      "
      dayClassName={() =>
        "hover:!bg-orange-100 hover:!text-orange-600 !rounded-xl transition-all"
      }
    />

    {/* GLOW */}
    <div
      className="
        absolute inset-0
        rounded-[24px]
        bg-gradient-to-r
        from-orange-100/0
        via-orange-100/20
        to-amber-100/0
        opacity-0
        group-focus-within:opacity-100
        transition-all
        pointer-events-none
      "
    />
  </div>
</div>
                </div>

                {/* catatan */}
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
                      bg-white/80
                      p-4
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

                {/* DETAIL BAHAN */}
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Detail Bahan
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        Tambahkan bahan sesuai kebutuhan transaksi.
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
        flex items-center justify-center gap-2
        transition-all
        shadow-lg shadow-orange-200
        cursor-pointer
      "
                    >
                      <Plus size={16} />
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
            hover:bg-[#f7f7f7]
            transition-all
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
                                  Informasi detail bahan masuk
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeBahanField(index)}
                              disabled={form.bahan.length === 1}
                              className="
                w-11 h-11
                rounded-2xl
                border border-red-100
                bg-red-50
                text-red-500
                flex items-center justify-center
                hover:bg-red-100
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {/* FORM */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            {/* nama bahan */}
                            <div className="lg:col-span-6">
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Nama Bahan
                              </label>

                              <Popover.Root
                                open={openSelect === index}
                                onOpenChange={(open) =>
                                  setOpenSelect(open ? index : null)
                                }
                              >
                                {/* BUTTON */}
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
          focus:border-orange-300
          focus:ring-4 focus:ring-orange-100
          transition-all
          shadow-sm
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

                                {/* CONTENT */}
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
          animate-in
          fade-in-0
          zoom-in-95
        "
                                  >
                                    <Command className="w-full bg-white">
                                      {/* SEARCH */}
                                      <div className="border-b border-slate-100 px-4">
                                        <Command.Input
                                          placeholder="Cari nama bahan..."
                                          className="
                w-full h-13
                text-sm text-slate-700
                outline-none
                bg-transparent
                placeholder:text-slate-400
              "
                                        />
                                      </div>

                                      {/* LIST */}
                                      <Command.List className="max-h-[280px] overflow-y-auto p-2">
                                        <Command.Empty>
                                          <div className="py-8 text-center">
                                            <p className="text-sm font-medium text-slate-500">
                                              Bahan tidak ditemukan
                                            </p>

                                            <p className="text-xs text-slate-400 mt-1">
                                              Coba cari dengan kata kunci lain
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

                                                setOpenSelect(null);
                                              }}
                                              className="
                    flex items-center justify-between
                    px-4 py-3
                    rounded-2xl
                    cursor-pointer
                    transition-all
                    hover:bg-orange-50
                    aria-selected:bg-orange-50
                    mb-1
                  "
                                            >
                                              {/* LEFT */}
                                              <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-slate-700">
                                                  {bahan.name}
                                                </span>

                                                <span className="text-xs text-slate-400 mt-0.5">
                                                  Satuan : {bahan.satuan}
                                                </span>
                                              </div>

                                              {/* CHECK */}
                                              <div
                                                className={`
                      w-6 h-6
                      rounded-full
                      flex items-center justify-center
                      transition-all
                      ${
                        item.bahanId === bahan.id
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
                                value={selectedBahan?.satuan || "-"}
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
                                placeholder="0"
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
                    disabled={loading}
                    className="
                      h-12 px-6
                      rounded-2xl
                      bg-gradient-to-r from-orange-500 to-amber-400
                      hover:from-orange-600 hover:to-amber-500
                      text-white
                      text-sm font-bold
                      flex items-center justify-center gap-2
                      shadow-xl shadow-orange-200/60
                      hover:-translate-y-0.5
                      transition-all
                      disabled:opacity-70
                      disabled:cursor-not-allowed
                      cursor-pointer
                    "
                  >
                    <Save size={17} />

                    {loading ? "Menyimpan..." : "Simpan Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPenerimaanBahan;
