import React, { useContext, useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import { AddPengguna } from "../service/Api";
import { toast } from "sonner";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarV2 from "../component/NavbarV2";

const AddGudang = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STAFF_GUDANG"
  });

  useEffect(() => {
    if (!user) return;

    if (user.role !== "OWNER") {
      navigate("/error");
    }
  }, [user, navigate]);

  if (!user || user.role !== "OWNER") {
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
      const res = await AddPengguna(payload);

      if (res.status === 201) {
        toast.success("Gudang berhasil ditambahkan", {
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

        navigate("/pengguna/staff-gudang");
  
        return res.data;
      }
  
      return null;
    } catch (error) {
      const message =
      error?.response?.data?.message ||
      error?.response?.data?.data?.[0]?.message ||
      "Terjadi kesalahan sistem";
    
      toast.error("Gagal menambahkan staff gudang", {
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
                  Manajemen Staff Gudang
                </div>
  
                <h1 className="mt-4 text-[34px] sm:text-[48px] leading-none font-black tracking-tight text-slate-900">
                  Tambah <span className="text-orange-500">Staff Gudang</span>
                </h1>
  
                <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                Tambahkan data staff gudang baru untuk mendukung proses pengelolaan, penyimpanan, dan operasional barang di gudang secara lebih terstruktur dan efisien.
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
                  Informasi Staff Gudang
                </h2>
  
                <p className="text-sm text-slate-400 mt-1">
                  Lengkapi detail staff gudang dengan benar sebelum menyimpan data.
                </p>
              </div>
  
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* nama */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Staff Gudang
                    </label>
  
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Nama staff gudang"
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
                      Email
                    </label>
  
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Example : Staffgudang@gmail.com"
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
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
  
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      required
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
                    Simpan staff gudang
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

export default AddGudang;