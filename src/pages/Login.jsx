import Logo from "../assets/logo.png";
import React, { useState, useEffect } from "react";
import { ApiLogin } from "../service/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (data) => {
    const login = await ApiLogin(data);
  
    if (login?.success) {
      setUser(login.user);
  
      navigate("/dashboard", {
        replace: true,
      });
  
      return;
    }
  
    toast.error("Gagal!", {
      description:
        login?.message ||
        "Email atau password anda salah",
    });
  };

  const handleButton = (e) => {
    e.preventDefault();
    handleLogin(form);
  };
  return (
<div className="relative isolate flex min-h-screen overflow-hidden bg-[#fafaf7]">
  
  {/* Background Blur */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/2 top-0 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-orange-100/40 blur-3xl" />
  </div>

  {/* Grid Pattern */}
  <div className="absolute inset-0 -z-10 opacity-[0.03]">
    <svg className="h-full w-full">
      <defs>
        <pattern
          id="grid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="black"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  {/* Left Side */}
  <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-16">
    
    <div className="max-w-xl">
      <span className="inline-flex items-center rounded-full border border-amber-200 bg-white/80 px-5 py-2 text-sm font-medium text-amber-700 shadow-sm backdrop-blur">
        Premium Clothing Convection
      </span>

      <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight text-slate-900">
        Welcome to
        <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          {" "}
          Doir Warehouse
        </span>
      </h1>

      <p className="mt-8 text-lg leading-9 text-neutral-600">
        Platform manajemen produksi konveksi modern dengan tampilan
        profesional, efisien, dan mudah digunakan untuk membantu proses
        operasional lebih terorganisir.
      </p>

      {/* Feature Cards */}
      <div className="mt-12 grid gap-5">
        
        <div className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-xl font-bold text-slate-900">
            Professional Production
          </h3>

          <p className="mt-2 leading-7 text-neutral-600">
            Sistem terintegrasi untuk mendukung proses produksi yang lebih
            cepat dan efisien.
          </p>
        </div>

        <div className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-xl font-bold text-slate-900">
            Modern Dashboard
          </h3>

          <p className="mt-2 leading-7 text-neutral-600">
            Tampilan clean dan premium untuk pengalaman penggunaan yang
            nyaman dan profesional.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side Login */}
  <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
    
    <div className="w-full max-w-md">
      
      {/* Card */}
      <div className="rounded-[2.5rem] border border-white/50 bg-white/70 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
        
        {/* Logo */}
        <div className="text-center">
          <img
            alt="Logo"
            src={Logo}
            className="mx-auto h-14 w-auto drop-shadow-sm"
          />

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
            Sign In
          </h2>

          <p className="mt-3 text-neutral-500">
            Access your production management dashboard
          </p>
        </div>

        {/* Form */}
        <form
          action="#"
          method="POST"
          className="mt-10 space-y-6"
          onSubmit={handleButton}
        >
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="block w-full rounded-2xl border border-neutral-200 bg-white/80 px-5 py-4 text-slate-900 shadow-sm outline-none transition duration-300 placeholder:text-neutral-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <button
                type="button"
                className="text-sm font-medium text-amber-700 hover:text-amber-600"
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="block w-full rounded-2xl border border-neutral-200 bg-white/80 px-5 py-4 text-slate-900 shadow-sm outline-none transition duration-300 placeholder:text-neutral-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 px-5 py-4 text-sm font-bold tracking-wide text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-neutral-500">
          © 2026 Doir Warehouse Production
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;
