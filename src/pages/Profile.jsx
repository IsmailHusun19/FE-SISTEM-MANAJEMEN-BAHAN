import React, { useContext, useState, useEffect } from "react";
import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import NavbarV2 from "../component/NavbarV2";
import { useAuth } from "../component/AuthContext";
import { Camera, Save, UserRound, Mail, Lock, IdCard } from "lucide-react";
import { toast } from "sonner";
import { EditMe } from "../service/Api";
import { BASE_URL } from "../utils/config";

const Profile = () => {
  const { expanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    nik: user?.nik || "",
    password: "",
    avatar: null,
  });

  const avatarUrl = user?.avatar ? `${BASE_URL}/${user.avatar}` : null;

  const [preview, setPreview] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "avatar") {
      const file = files[0];
  
      setForm((prev) => ({
        ...prev,
        avatar: file,
      }));
  
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
  
      return;
    }
  
    if (name === "nik") {
      const nik = value.replace(/\D/g, "").slice(0, 10);
  
      setForm((prev) => ({
        ...prev,
        nik,
      }));
  
      return;
    }
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nik) {
      toast.error("NIK wajib diisi");
      return;
    }
    
    if (form.nik.length < 10) {
      toast.error("NIK minimal 10 digit");
      return;
    }
    
    if (form.nik.length > 10) {
      toast.error("NIK maksimal 10 digit");
      return;
    }
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("nik", form.nik);
    if (form.password) {
      formData.append("password", form.password);
    }

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    try {
      setLoading(true);

      await EditMe(formData);

      toast.success("Profile berhasil diperbarui", {
        description: "Data akun berhasil disimpan",
        className: `
        !rounded-2xl
        !border !border-orange-100
        !bg-white
        !text-slate-800
        !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
      `,
        descriptionClassName: "!text-slate-500",
        position: "top-right",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      toast.error("Gagal memperbarui profile", {
        description:
          error?.response?.data?.message || "Terjadi kesalahan sistem",
        position: "top-right",
        className: `
        !rounded-2xl
        !border !border-orange-100
        !bg-white
        !text-slate-800
        !shadow-[0_10px_40px_rgba(251,146,60,0.12)]
      `,
        descriptionClassName: "!text-slate-500",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#f8f8f7]">
      <div className="absolute z-0 top-0 right-0 w-[460px] h-[460px] rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />

      <MenuSlideBar />

      <div className="min-h-screen">
        <div
          className={`
            transition-all duration-300
            ${expanded ? "lg:ml-60" : "ml-16 lg:ml-16"}
          `}
        >
          <NavbarV2 />

          <div className="relative z-10 sm:px-6 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="    w-full
    max-w-[1320px]
    mx-auto
    h-screen
    flex
    justify-center 
    items-center
    "
            >
              <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-[360px_minmax(0,780px)]
                justify-center
                gap-7
                "
              >
                <div
                  className="
                    bg-white/90 backdrop-blur-xl
                    border border-white
                    rounded-[32px]
                    shadow-[0_20px_70px_rgba(15,23,42,0.07)]
                    overflow-hidden
                  "
                >
                  <div className="h-28 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_35%)]" />
                  </div>

                  <div className="px-6 pb-6 -mt-16 flex flex-col items-center text-center">
                    <div
                      className="
                        relative w-32 h-32
                        rounded-[32px]
                        bg-gradient-to-br from-orange-500 to-amber-400
                        flex items-center justify-center
                        text-white text-4xl font-bold
                        overflow-hidden
                        ring-4 ring-white
                        shadow-[0_18px_45px_rgba(251,146,60,0.28)]
                      "
                    >
{preview && !imageError ? (
  <img
    src={preview}
    alt="Avatar"
    className="w-full h-full object-cover"
    onError={() => setImageError(true)}
  />
) : (
  form.name?.charAt(0)?.toUpperCase() || <UserRound size={42} />
)}

                      <label
                        className="
                          absolute bottom-3 right-3
                          w-10 h-10 rounded-2xl
                          bg-white text-orange-500
                          flex items-center justify-center
                          shadow-lg shadow-orange-200
                          border border-orange-100
                          cursor-pointer
                          hover:scale-105
                          transition-all
                        "
                      >
                        <Camera size={18} />
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <h2 className="mt-4 text-[18px] font-bold text-slate-900">
                      {form.name || "Nama Pengguna"}
                    </h2>

                    <p className="text-[13px] text-slate-400 mt-1">
                      {form.email || "email pengguna"}
                    </p>

                    <div className="mt-5 w-full rounded-3xl bg-orange-50/70 border border-orange-100 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-500">
                        Avatar Profile
                      </p>
                      <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
                        Gunakan foto dengan format JPG, JPEG, atau PNG
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT FORM CARD */}
                <div
                  className="
                    bg-white/90 backdrop-blur-xl
                    border border-white
                    rounded-[32px]
                    shadow-[0_20px_70px_rgba(15,23,42,0.07)]
                    overflow-hidden
                  "
                >
                  <div className="px-6 sm:px-7 py-6 border-b border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-[16px] font-bold text-slate-900">
                        Informasi Profile
                      </h2>
                      <p className="text-[12px] text-slate-400 mt-1">
                        Perbarui data akun kamu dengan informasi terbaru.
                      </p>
                    </div>

                    <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-slate-50 text-slate-500 items-center justify-center">
                      <UserRound size={20} />
                    </div>
                  </div>


                  <div className="p-6 sm:p-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            {/* NIK */}
                                            <div className="lg:col-span-2">
                        <label className="text-[12px] font-semibold text-slate-600">
                          Nomor Induk Karyawan
                        </label>

                        <div className="relative mt-2 group">
                          <IdCard
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-all"
                          />

                          <input
                           type="text"
                            name="nik"
                            value={form.nik}
                            inputMode="numeric"
                            maxLength={10}
                            onWheel={(e) => e.target.blur()}
                            onChange={handleChange}
                            placeholder="Kosongkan jika tidak ingin mengganti password"
                            className="
                              w-full h-12
                              rounded-2xl
                              border border-[#ececec]
                              bg-white
                              pl-11 pr-4
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
                      </div>
                      {/* NAME */}
                      <div className="lg:col-span-1">
                        <label className="text-[12px] font-semibold text-slate-600">
                          Nama Lengkap
                        </label>

                        <div className="relative mt-2 group">
                          <UserRound
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-all"
                          />

                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            className="
                              w-full h-12
                              rounded-2xl
                              border border-[#ececec]
                              bg-white
                              pl-11 pr-4
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

                      {/* EMAIL */}
                      <div className="lg:col-span-1">
                        <label className="text-[12px] font-semibold text-slate-600">
                          Email
                        </label>

                        <div className="relative mt-2 group">
                          <Mail
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-all"
                          />

                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Masukkan email"
                            className="
                              w-full h-12
                              rounded-2xl
                              border border-[#ececec]
                              bg-white
                              pl-11 pr-4
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

                      {/* PASSWORD */}
                      <div className="lg:col-span-2">
                        <label className="text-[12px] font-semibold text-slate-600">
                          Password Baru
                        </label>

                        <div className="relative mt-2 group">
                          <Lock
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-all"
                          />

                          <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Kosongkan jika tidak ingin mengganti password"
                            className="
                              w-full h-12
                              rounded-2xl
                              border border-[#ececec]
                              bg-white
                              pl-11 pr-4
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
                    </div>

                    {/* INFO STRIP */}
                    <div
                      className="
                        mt-6
                        rounded-3xl
                        bg-gradient-to-r from-orange-50 to-amber-50
                        border border-orange-100
                        px-5 py-4
                        flex items-start gap-3
                      "
                    >
                      <div className="w-9 h-9 rounded-2xl bg-white text-orange-500 flex items-center justify-center shrink-0 shadow-sm">
                        <Lock size={17} />
                      </div>

                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">
                          Keamanan Akun
                        </p>
                        <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                          Password hanya akan diperbarui jika kolom password
                          baru diisi.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 py-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
                    <p className="text-[12px] text-slate-400">
                      Pastikan data yang dimasukkan sudah benar sebelum
                      disimpan.
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
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
                        disabled:opacity-60
                        whitespace-nowrap
                      "
                    >
                      <Save size={18} />
                      {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
