import React from "react";
import Button from "../component/Button";
import heroImage from "../assets/konveksi-hero.png";
import GaleriSatu from "../assets/galeri-satu.png";
import GaleriDua from "../assets/galeri-dua.png";
import GaleriTiga from "../assets/galeri-tiga.png";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { PackageCheck, Warehouse, Boxes, BarChart3, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      title: "Stock Monitoring",
      desc: "Pantau stok bahan baku secara real-time dengan sistem yang akurat.",
      icon: <PackageCheck size={40} />,
    },
    {
      title: "Warehouse Control",
      desc: "Manajemen penyimpanan bahan lebih rapi, terstruktur, dan efisien.",
      icon: <Warehouse size={40} />,
    },
    {
      title: "Distribusi Bahan",
      desc: "Kontrol distribusi bahan ke produksi secara transparan.",
      icon: <Boxes size={40} />,
    },
    {
      title: "Laporan Analitik",
      desc: "Visualisasi data bahan baku untuk keputusan yang lebih tepat.",
      icon: <BarChart3 size={40} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-slate-900 max-w-7xl mx-auto overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="mt-20 lg:mt-6 relative px-8 min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100 rounded-full blur-3xl opacity-50"></div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs lg:text-sm font-medium text-slate-700">
              Raw Material Management System
            </span>
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Kelola
              <span className="text-amber-700"> Bahan Baku </span>
              Produksi
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              Solusi manajemen bahan baku yang membantu perusahaan mengontrol
              stok dan penggunaan bahan secara efisien dan transparan.
            </p>
            {/* STATS */}
            <section>
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[
      {
        value: "1.2K",
        label: "Bahan Tercatat",
        icon: <Boxes size={26} />,
      },
      {
        value: "350+",
        label: "Distribusi Harian",
        icon: <PackageCheck size={26} />,
      },
      {
        value: "80+",
        label: "Supplier Aktif",
        icon: <Warehouse size={26} />,
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl p-4 w-full border border-slate-100 shadow-md hover:shadow-lg transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            {item.icon}
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {item.value}
            </h3>

            <p className="text-slate-500 text-sm">
              {item.label}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

<div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
  <Link to="/login" className="w-full sm:w-auto">
    <Button className="w-full sm:w-auto px-7 py-3 rounded-2xl cursor-pointer text-white shadow-lg">
      Mulai Sistem
    </Button>
  </Link>

  <Link to="/company" className="w-full sm:w-auto">
    <button className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition cursor-pointer">
      Pelajari Lebih Lanjut
    </button>
  </Link>
</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-100 rounded-[40px] blur-2xl opacity-40"></div>
            <img
              src={heroImage}
              alt="Warehouse"
              className="relative rounded-[32px] shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 pb-24 pt-14 lg:pt-0">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight">
            Solusi Pengelolaan Bahan Baku
          </h2>
          <p className="mt-4 text-slate-600">
            Sistem modern dengan desain clean dan workflow yang terintegrasi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-[28px] border border-slate-100 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

            {/* WORKFLOW SECTION */}
            <section className="px-8 pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight">
            Alur Pengelolaan Bahan Baku
          </h2>
          <p className="mt-4 text-slate-600">
            Proses kerja yang terstruktur untuk memastikan bahan baku selalu siap digunakan.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Penerimaan Bahan",
              desc: "Bahan baku diterima dan diverifikasi sesuai kebutuhan produksi.",
            },
            {
              step: "02",
              title: "Penyimpanan Warehouse",
              desc: "Bahan disimpan dengan pencatatan stok yang terintegrasi.",
            },
            {
              step: "03",
              title: "Distribusi Produksi",
              desc: "Bahan didistribusikan ke bagian produksi sesuai permintaan.",
            },
            {
              step: "04",
              title: "Laporan & Evaluasi",
              desc: "Penggunaan bahan dicatat untuk evaluasi efisiensi produksi.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-[28px] p-8 border border-slate-100 shadow-md"
            >
              <span className="text-5xl font-bold text-amber-100 absolute top-4 right-6">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold relative z-10">
                {item.title}
              </h3>
              <p className="mt-4 text-slate-600 relative z-10 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>



            {/* GALLERY SECTION */}
            <section className="px-8 pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight">
            Aktivitas Warehouse
          </h2>
          <p className="mt-4 text-slate-600">
            Dokumentasi aktivitas pengelolaan bahan baku dalam proses operasional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {[GaleriSatu, GaleriDua, GaleriTiga].map((img, i) => (
            <div key={i} className="overflow-hidden rounded-[28px] shadow-md">
              <img
                src={img}
                alt="Warehouse Activity"
                className="w-full h-72 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="px-8 pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight">
            Testimoni Pengguna
          </h2>
          <p className="mt-4 text-slate-600">
            Pengalaman pengguna dalam meningkatkan efisiensi pengelolaan bahan baku.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {[
            {
              name: "Leader Produksi",
              text: "Sistem ini sangat membantu pencatatan bahan masuk dan distribusi menjadi lebih cepat.",
              image: heroImage,
            },
            {
              name: "Admin Warehouse",
              text: "Monitoring stok jadi lebih mudah dan meminimalisir kesalahan pencatatan.",
              image: heroImage,
            },
            {
              name: "Supervisor",
              text: "Data lebih transparan dan laporan bahan baku lebih mudah dianalisa.",
              image: heroImage,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[28px] shadow-md border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-sm text-slate-500">Pengguna Sistem</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">“{item.text}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-8 pb-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* FAQ Accordion */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <div className="max-w-xl">
    <h2 className="text-4xl font-bold tracking-tight">
      Frequently Asked Questions
    </h2>

    <p className="mt-4 text-slate-600">
      Temukan jawaban atas pertanyaan umum terkait pengelolaan bahan baku
      dan warehouse production.
    </p>
  </div>

  <div className="mt-10 space-y-4">
    {[
      {
        q: "Apakah data stok diperbarui secara real-time?",
        a: "Ya, sistem memperbarui data stok secara langsung setelah transaksi dilakukan.",
      },
      {
        q: "Apakah laporan penggunaan bahan bisa diunduh?",
        a: "Ya, laporan dapat diunduh untuk kebutuhan evaluasi dan dokumentasi produksi.",
      },
      {
        q: "Apakah supplier dapat dipantau melalui sistem?",
        a: "Ya, seluruh data supplier dan histori pengiriman dapat dipantau dengan mudah.",
      },
      {
        q: "Apakah laporan penggunaan bahan bisa diunduh?",
        a: "Ya, laporan dapat diunduh untuk kebutuhan evaluasi dan dokumentasi produksi.",
      },
    ].map((item, i) => (
      <motion.details
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg p-6 cursor-pointer transition-all duration-300"
      >
        <summary className="flex items-center justify-between list-none font-semibold text-slate-900 text-[15px]">
          {item.q}

          <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center transition-all duration-300 group-open:rotate-180 group-hover:bg-amber-100 text-amber-700">
  <ChevronDown size={18} strokeWidth={2.5} />
</span>
        </summary>

        <p className="mt-4 text-slate-600 leading-relaxed">
          {item.a}
        </p>
      </motion.details>
    ))}
  </div>
</motion.div>

        {/* Google Maps */}
        <div className="bg-white rounded-[28px] border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-2xl font-semibold text-slate-900">
              Lokasi Warehouse
            </h3>
            <p className="mt-2 text-slate-600">
              Kunjungi lokasi operasional kami untuk melihat proses pengelolaan bahan baku secara langsung.
            </p>
          </div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1081738405273!2d106.1457484!3d-6.1161376999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418b76796d57dd%3A0x37a628565a7c42fe!2skonveksi%20serang!5e0!3m2!1sid!2sid!4v1778339383428!5m2!1sid!2sid" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>

      <Footer />
    </div>
  );
}
