import React from "react";
import Navbar from "../component/navbar";
import Koneksi from "../assets/konveksi.png";
import Footer from "../component/Footer";
import {
  SparklesIcon,
  ShieldCheckIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

const Company = () => {
  return (
    <>
      <Navbar />

      <section className="relative isolate overflow-hidden bg-[#fafaf7] pt-24 pb-24">
        
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-orange-100/40 blur-3xl" />
        </div>

        {/* Grid */}
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

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Hero */}
          <div className="grid items-center gap-20 lg:grid-cols-2">
            
            {/* Left */}
            <div>
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-white/80 px-5 py-2 text-sm font-medium text-amber-700 shadow-sm backdrop-blur">
                Premium Clothing Convection
              </span>

              <h1 className="mt-3 text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-6xl">
                Doir
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  {" "}
                  Warehouse{" "}
                </span>
                Production
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-neutral-600">
                Doir Warehouse Production merupakan usaha konveksi yang
                bergerak di bidang produksi pakaian dan apparel dengan fokus
                pada kualitas, detail produksi, dan kenyamanan produk.
                Berawal dari produksi skala kecil, kami terus berkembang dan
                dipercaya dalam pembuatan berbagai kebutuhan pakaian custom.
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-9 text-neutral-600">
                Dengan proses produksi yang teliti dan penggunaan bahan yang
                berkualitas, Doir Warehouse Production berkomitmen menghadirkan
                hasil terbaik dengan pelayanan profesional dan pengerjaan yang
                konsisten.
              </p>

              {/* Stats */}
              <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
                
                <div className="group rounded-[2rem] border border-white/50 bg-white/70 p-7 shadow-xl backdrop-blur transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <h3 className="text-2xl font-black text-amber-600">
                    2021
                  </h3>

                  <p className="mt-3 text-sm tracking-wide text-neutral-500">
                    Mulai Beroperasi
                  </p>
                </div>

                <div className="group rounded-[2rem] border border-white/50 bg-white/70 p-7 shadow-xl backdrop-blur transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <h3 className="text-2xl font-black text-amber-600">
                    100+
                  </h3>

                  <p className="mt-3 text-sm tracking-wide text-neutral-500">
                    Produk Diproduksi
                  </p>
                </div>

                <div className="group rounded-[2rem] border border-white/50 bg-white/70 p-7 shadow-xl backdrop-blur transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <h3 className="text-2xl font-black text-amber-600">
                    Custom
                  </h3>

                  <p className="mt-3 text-sm tracking-wide text-neutral-500">
                    Desain Sesuai Kebutuhan
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              
              {/* Glow */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-amber-300/30 to-orange-200/20 blur-3xl" />

              {/* Image */}
              <div className="relative overflow-hidden rounded-[3rem] border border-white/40 bg-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl">
                <img
                  src={Koneksi}
                  alt="Konveksi"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-white backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    Professional Convection
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Premium Apparel Production
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            
            <div className="group rounded-[2.5rem] border border-neutral-200/70 bg-white/70 p-10 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Quality Production
              </h3>

              <p className="mt-5 leading-8 text-neutral-600">
                Mengutamakan kualitas jahitan, detail produksi, dan
                pemilihan bahan agar menghasilkan produk yang nyaman,
                rapi, dan tahan digunakan.
              </p>
            </div>

            <div className="group rounded-[2.5rem] border border-neutral-200/70 bg-white/70 p-10 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <SwatchIcon className="h-8 w-8" />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Custom Design
              </h3>

              <p className="mt-5 leading-8 text-neutral-600">
                Melayani kebutuhan pakaian custom sesuai desain dan
                kebutuhan pelanggan dengan proses produksi yang fleksibel
                dan profesional.
              </p>
            </div>

            <div className="group rounded-[2.5rem] border border-neutral-200/70 bg-white/70 p-10 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <SparklesIcon className="h-8 w-8" />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                Professional Service
              </h3>

              <p className="mt-5 leading-8 text-neutral-600">
                Berkomitmen memberikan pelayanan terbaik dengan proses
                pengerjaan tepat waktu serta hasil produksi yang konsisten
                dan terpercaya.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Company;