import React, { useContext, useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import { AddDataBahan } from "../service/Api";
import { toast } from "sonner";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarV2 from "../component/NavbarV2";

const AddMesin = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    jumlahMinimum: "",
    stok: "",
    satuan:"",
  });

  useEffect(() => {
    if (!user) return;

    if (!["STAFF_GUDANG", "OWNER"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["STAFF_GUDANG", "OWNER"].includes(user.role)
  ) {
    return null;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addData = async (payload) => {
    try {
      const res = await AddDataBahan(payload);

      if (res.status === 201) {
        toast.success("Bahan berhasil ditambahkan", {
          position: "top-right",
          description: `${payload.name} telah tersimpan`,
          className: `
            !rounded-2xl
            !border !border-orange-100
            !bg-white
            !text-slate-800
            !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
          `,
          descriptionClassName: "!text-slate-500",
        });
  
        navigate("/bahan/kelola-bahan");
  
        return res.data;
      }
  
      return null;
    } catch (error) {
      const message =
      error?.response?.data?.message ||
      error?.response?.data?.data?.[0]?.message ||
      "Terjadi kesalahan sistem";
    
      toast.error("Gagal menambahkan bahan", {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
    };
    addData(data);
  };

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
  
        {/* CONTENT */}
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
            {/* decorative */}
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
                  Manajemen Bahan
                </div>
  
                <h1 className="mt-4 text-[34px] sm:text-[48px] leading-none font-black tracking-tight text-slate-900">
                  Tambah <span className="text-orange-500">Bahan</span>
                </h1>
  
                <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                  Tambahkan data bahan produksi baru untuk mempermudah pengelolaan operasional gudang.
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
            {/* top accent */}
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
                  Informasi Bahan
                </h2>
  
                <p className="text-sm text-slate-400 mt-1">
                  Lengkapi detail bahan dengan benar sebelum menyimpan data.
                </p>
              </div>
  
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* nama */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Bahan
                    </label>
  
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Contoh : Kain Drill Coklat"
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

                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Stok Minumum Bahan
                    </label>
  
                    <input
                      name="jumlahMinimum"
                      type="number"
                      value={form.jumlahMinimum}
                      onWheel={(e) => e.target.blur()}
                      onChange={handleChange}
                      required
                      placeholder="Contoh : 200"
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
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [-moz-appearance:textfield]
                      "
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Stok Bahan
                    </label>
  
                    <input
                      name="stok"
                      type="number"
                      value={form.stok}
                      onWheel={(e) => e.target.blur()}
                      onChange={handleChange}
                      required
                      placeholder="Contoh : 400"
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
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [-moz-appearance:textfield]
                      "
                    />
                  </div>
                  <div className="lg:col-span-1">
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Satuan Bahan
  </label>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {["PCS", "METER", "KG", "ROLL", "CONE", "PACK", "YARD"].map(
      (item) => (
        <button
          key={item}
          type="button"
          onClick={() =>
            setForm({
              ...form,
              satuan: item,
            })
          }
          className={`
            h-12 rounded-2xl
            border
            text-sm font-semibold
            transition-all duration-300
            flex items-center justify-center
            backdrop-blur-xl
            hover:-translate-y-0.5
            cursor-pointer
            ${
              form.satuan === item
                ? "border-orange-300 bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-200"
                : "border-slate-200 bg-white/80 text-slate-600 hover:border-orange-200 hover:bg-orange-50"
            }
          `}
        >
          {item}
        </button>
      )
    )}
  </div>
</div>
                </div>
  
                {/* action */}
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
                      cursor-pointer
                    "
                  >
                    <Save size={17} />
                    Simpan Mesin
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

export default AddMesin;
