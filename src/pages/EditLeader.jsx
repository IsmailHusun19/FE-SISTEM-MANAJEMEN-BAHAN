import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import MenuSlideBar from "../component/MenuSlidebar";
import NavbarV2 from "../component/NavbarV2";
import { SidebarContext } from "../component/SidebarContextProvider";
import { useAuth } from "../component/AuthContext";

import {
  GetUserById,
  EditPengguna,
} from "../service/Api";

const EditLeader = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  useEffect(() => {
    if (!user) return;

    if (!["OWNER", "SUPERVISOR_PRODUKSI"].includes(user.role)) {
      navigate("/error");
    }
  }, [user, navigate]);

  if (
    !user ||
    !["OWNER", "SUPERVISOR_PRODUKSI"].includes(user.role)
  ) {
    return null;
  }

  const fetchDetail = async () => {
    try {
      setLoading(true);

      const res = await GetUserById(id);
      const data = res.data;
      setForm({
        name: data.name || "",
        email: data.email|| "",
        password: "",
      });
    } catch (error) {
      toast.error("Gagal mengambil data leader produksi", {
        position: "top-right",
        description:
          error?.response?.data?.message ||
          "Terjadi kesalahan sistem",
      });

      navigate("/pengguna/edit-leader");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = async () => {
    try {
      const res = await EditPengguna(form, id);

      if (res.status === 200) {
        toast.success("Staff Leader berhasil diperbarui", {
          position: "top-right",
          description: `${form.name} berhasil diperbarui`,
          className: `
            !rounded-2xl
            !border !border-orange-100
            !bg-white
            !text-slate-800
            !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
          `,
          descriptionClassName: "!text-slate-500",
        });

        navigate("/pengguna/leader-produksi");
      }
    } catch (error) {
      toast.error("Gagal memperbarui leader produksi", {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)

    updateData();
  };

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-[#f8f8f7]">
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
                  Manajemen Leader Produksi
                </div>

                <h1 className="mt-4 text-[34px] sm:text-[48px] leading-none font-black tracking-tight text-slate-900">
                  Edit <span className="text-orange-500">Leader Produksi</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                Perbarui informasi leader produksi untuk memastikan data pengelolaan dan operasional produksi tetap akurat dan terbaru.
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
                  Informasi Leader Produksi
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Lengkapi detail leader produksi dengan benar sebelum menyimpan data.
                </p>
              </div>

              {loading ? (
                <div className="py-20 flex items-center justify-center">
                  <div
                    className="
                      w-10 h-10
                      border-4 border-orange-200
                      border-t-orange-500
                      rounded-full
                      animate-spin
                    "
                  />
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* nama */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Leader Produksi
                    </label>
  
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Nama leader produksi"
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
                      placeholder="Example : leaderproduksi@gmail.com"
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
                      value={form.password ?? ""}
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
                    Simpan Leader Produksi
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLeader;