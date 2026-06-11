import React, { useState, useContext, useEffect } from "react";
import CountUp from "react-countup";
import {
  Package,
  Scissors,
  Archive,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Zap,
  CheckCircle,
  FileText,
  Calendar,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import MenuSlideBar from "../component/MenuSlidebar";
import { SidebarContext } from "../component/SidebarContextProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetDashboard } from "../service/Api";
import { Navigate, useNavigate } from "react-router-dom";

const statusStyle = {
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  muted: "bg-slate-50 text-slate-500 border border-slate-200",
};

const activityStyle = {
  success: { bg: "#f0fdf4", color: "#16a34a", icon: CheckCircle },
  warning: { bg: "#fffbeb", color: "#d97706", icon: AlertTriangle },
  info: { bg: "#eff6ff", color: "#2563eb", icon: Zap },
  muted: { bg: "#f8fafc", color: "#64748b", icon: FileText },
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  accent,
  bg,
  trend,
  trendUp,
  sub,
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-6 cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div
      className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.14]"
      style={{ background: accent }}
    />

    <div className="flex items-start justify-between mb-5">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: bg }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>

      <span
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold"
        style={{
          color: trendUp ? "#16a34a" : "#dc2626",
          background: trendUp ? "#dcfce7" : "#fee2e2",
        }}
      >
        {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend}
      </span>
    </div>

    <CountUp
      end={Number(value) || 0}
      duration={1.2}
      separator="."
      decimals={Number(value) % 1 !== 0 ? 1 : 0}
      className="block text-[34px] font-black tracking-tight text-slate-900 leading-none mb-1.5"
    />

    <p className="text-sm text-slate-500 font-medium">{title}</p>
    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-slate-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      {sub}
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);

  const today = new Date().toISOString().slice(0, 10);

  const [filters, setFilters] = useState({
    startDate: "2026-01-08",
    endDate: new Date(new Date(today).setDate(new Date(today).getDate() + 1))
      .toISOString()
      .split("T")[0],
  });

  const [dashboard, setDashboard] = useState({
    summary: {
      totalMasuk: 0,
      totalDipakai: 0,
      totalStok: 0,
      stockMenipis: 0,
    },
    analytics: {
      weekly: [],
    },
    materialUsage: [],
    lowStock: [],
    activities: [],
    transactions: [],
  });

  const [activeTab, setActiveTab] = useState("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const getDashboard = async () => {
    try {
      const response = await GetDashboard({
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      setDashboard(response.data);
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const stats = [
    {
      title: "Total Bahan Masuk",
      value: dashboard.summary.totalMasuk,
      icon: Package,
      accent: "#e8890c",
      bg: "#fff7ed",
      trend: "Masuk",
      trendUp: true,
      sub: "Akumulasi bahan masuk sesuai periode",
      path: "/bahan/penerimaan-bahan",
    },

    {
      title: "Bahan Terpakai",
      value: dashboard.summary.totalDipakai,
      icon: Scissors,
      accent: "#2563eb",
      bg: "#eff6ff",
      trend: "Pakai",
      trendUp: true,
      sub: "Total pemakaian bahan sesuai periode",
      path: "/pemakaian-bahan",
    },

    {
      title: "Total Stock",
      value: dashboard.summary.totalStok,
      icon: Archive,
      accent: "#7c3aed",
      bg: "#f5f3ff",
      trend: "Aktif",
      trendUp: true,
      sub: "Total stok bahan aktif saat ini",
      path: "/bahan/kelola-bahan",
    },

    {
      title: "Stock Menipis",
      value: dashboard.summary.stockMenipis,
      icon: AlertTriangle,
      accent: "#dc2626",
      bg: "#fef2f2",
      trend: `${dashboard.summary.stockMenipis}`,
      trendUp: false,
      sub: "Perlu perhatian segera",
      path: "/bahan/kelola-bahan",
    },
  ];

  const chartData = dashboard?.analytics || {};

  const activeChart = chartData?.[activeTab] || [];

  const maxChartVal = Math.max(
    ...activeChart.map((item) => Number(item.value || 0)),
    1
  );

  const materials = dashboard.materialUsage || [];
  const lowStock = dashboard.lowStock || [];
  const activities = dashboard.activities || [];
  const transactions = dashboard.transactions || [];

  const filteredTx = transactions.filter((item) =>
    item.bahan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUsagePercent = materials.reduce(
    (acc, item) => acc + Number(item.value || 0),
    0
  );

  const materialColors = [
    "#f59e0b",
    "#2563eb",
    "#7c3aed",
    "#16a34a",
    "#dc2626",
    "#64748b",
  ];

  const pieGradient =
    materials.length > 0
      ? `conic-gradient(${materials
          .reduce(
            (acc, item, index) => {
              const value = Number(item.value || 0);
              const color = materialColors[index % materialColors.length];

              acc.parts.push(
                `${color} ${acc.current}% ${acc.current + value}%`
              );
              acc.current += value;

              return acc;
            },
            { current: 0, parts: [] }
          )
          .parts.join(", ")})`
      : "#ffedd5";

      const handleResetFilter = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      
        const resetFilter = {
          startDate: firstDay.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
        };
      
        setFilters(resetFilter);
      
        getDashboard(resetFilter);
      };

  return (
    <div className="min-h-screen bg-[#f8f8f7]">
      <MenuSlideBar />

      <div
        className={`transition-all duration-300 ${
          expanded ? "lg:ml-60" : "ml-16 lg:ml-16"
        }`}
      >
        <div className="sticky top-0 z-20 flex flex-col lg:flex-row lg:items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 border-b border-neutral-200 bg-white/90 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between lg:mr-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  DOIR
                </span>

                <span className="text-[9px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Warehouse
                </span>
              </div>

              <span className="text-[10px] font-medium text-slate-400 tracking-wide">
                Raw Material Management System
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <div className="flex items-center justify-between gap-2 h-10 px-3 rounded-xl bg-neutral-50 border border-neutral-200 w-full sm:w-auto min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar size={14} className="text-slate-400 shrink-0" />

                <DatePicker
                  selected={new Date(filters.startDate)}
                  onChange={(date) => {
                    if (!date) return;

                    setFilters((prev) => ({
                      ...prev,
                      startDate: date.toISOString().split("T")[0],
                    }));
                  }}
                  dateFormat="dd MMM yyyy"
                  className="w-[90px] sm:w-[95px] bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>

              <span className="text-slate-300 shrink-0">—</span>

              <DatePicker
                selected={new Date(filters.endDate)}
                onChange={(date) => {
                  if (!date) return;

                  setFilters((prev) => ({
                    ...prev,
                    endDate: date.toISOString().split("T")[0],
                  }));
                }}
                dateFormat="dd MMM yyyy"
                className="w-[90px] sm:w-[95px] bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>

            <button
              onClick={getDashboard}
              className="h-10 cursor-pointer px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200 transition-all whitespace-nowrap w-full sm:w-auto"
            >
              Terapkan
            </button>
            <button
  onClick={handleResetFilter}
  title="Reset Filter"
  className="
    h-10 w-10 shrink-0
    cursor-pointer
    flex items-center justify-center
    rounded-xl
    bg-white/90
    backdrop-blur-xl
    border border-orange-100
    text-orange-500
    shadow-[0_8px_24px_rgba(251,146,60,0.12)]
    hover:bg-gradient-to-r
    hover:from-amber-500
    hover:to-orange-500
    hover:text-white
    hover:shadow-[0_10px_30px_rgba(251,146,60,0.25)]
    hover:-translate-y-0.5
    transition-all duration-300
  "
>
  <RotateCcw size={16} />
</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-600 mb-1">
                Real-time Overview
              </p>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Dashboard{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  Overview
                </span>
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Periode: {filters.startDate} → {filters.endDate}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 shadow-sm">
              <TrendingUp size={14} className="text-emerald-500" />
              Total stock aktif&nbsp;
              <span className="font-bold text-emerald-600">
                {dashboard.summary.totalStok}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item, index) => (
  <div
    key={index}
    onClick={() => navigate(item.path)}
    className="cursor-pointer hover:shadow-lg transition-all duration-300"
  >
         <StatCard key={index} {...item} />
  </div>
))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Warehouse Analytics
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Bahan masuk berdasarkan periode
                  </p>
                </div>

                <div className="flex gap-1 p-1 rounded-xl bg-neutral-100 border border-neutral-200">
                  {[
                    { key: "weekly", label: "Mingguan" },
                    { key: "monthly", label: "Bulanan" },
                    { key: "yearly", label: "Tahunan" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setActiveBarIdx(0);
                      }}
                      className={`px-3 cursor-pointer py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeTab === tab.key
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex h-[400px] items-end gap-4 px-2 pt-4">
                {activeChart.length > 0 ? (
                  activeChart.map((item, index) => {
                    const value = Number(item.value || 0);

                    const barHeight =
                      value > 0
                        ? `${Math.max(
                            Math.round((value / maxChartVal) * 100),
                            12
                          )}%`
                        : "8px";

                    return (
                      <div
                        key={index}
                        onClick={() => setActiveBarIdx(index)}
                        className="flex h-full flex-1 cursor-pointer flex-col items-center gap-2"
                      >
                        <span className="text-[10px] font-medium text-slate-400">
                          {value}
                        </span>

                        <div className="relative flex w-full flex-1 items-end">
                          <div
                            className="min-h-[8px] w-full rounded-t-xl bg-gradient-to-t from-amber-500 to-orange-500 transition-all duration-500"
                            style={{ height: barHeight }}
                          />
                        </div>

                        <span className="text-[11px] text-slate-400">
                          {item.label}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    Data grafik belum tersedia
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-1.5 rounded-full bg-amber-400 inline-block" />
                  Bahan Masuk
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">
                Material Usage
              </h3>

              <p className="mt-0.5 mb-6 text-sm text-slate-500">
                Distribusi bahan produksi
              </p>

              <div className="mb-6 flex justify-center">
                <div
                  className="relative flex h-40 w-40 items-center justify-center rounded-full shadow-inner"
                  style={{
                    background: pieGradient,
                  }}
                >
                  <div className="absolute h-28 w-28 rounded-full bg-white" />

                  <div className="z-10 text-center">
                    <p className="text-3xl font-black text-slate-900">
                      {Math.round(totalUsagePercent)}%
                    </p>
                    <p className="text-[11px] text-slate-400">Usage</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {materials.length > 0 ? (
                  materials.map((item, index) => {
                    const color = materialColors[index % materialColors.length];

                    return (
                      <div key={index}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ background: color }}
                            />

                            <span className="text-sm font-semibold text-slate-700">
                              {item.name}
                            </span>
                          </div>

                          <span className="text-sm font-bold text-slate-900">
                            {item.value}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${item.value}%`,
                              background: color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm text-slate-400">
                    Data pemakaian bahan belum tersedia.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Low Stock Alert
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Bahan mendekati batas minimum
                  </p>
                </div>

                <div className="h-10 w-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
              </div>

              <div className="space-y-3">
                {lowStock.length > 0 ? (
                  lowStock.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 hover:border-neutral-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>

                        <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                          {item.qty}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${item.pct}%`,
                              background:
                                item.pct <= 25
                                  ? "#ef4444"
                                  : item.pct <= 50
                                  ? "#f59e0b"
                                  : "#22c55e",
                            }}
                          />
                        </div>

                        <span className="text-[11px] text-slate-400 w-7 text-right font-medium">
                          {item.pct}%
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-400 mt-1.5">
                        Minimum stok: {item.threshold}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    Tidak ada bahan yang menipis.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Recent Activity
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Aktivitas warehouse terbaru
                  </p>
                </div>

                <button
                  onClick={getDashboard}
                  className="h-9 px-3 cursor-pointer rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-neutral-100 transition-all flex items-center gap-1.5"
                >
                  <RefreshCw size={12} />
                  Refresh
                </button>
              </div>

              <div className="space-y-1">
                {activities.length > 0 ? (
                  activities.map((activity, index) => {
                    const style =
                      activityStyle[activity.type] || activityStyle.muted;
                    const Icon = style.icon;

                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                          style={{
                            background: style.bg,
                            borderColor: `${style.color}25`,
                          }}
                        >
                          <Icon size={15} style={{ color: style.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-snug">
                            {activity.text}
                          </p>

                          <span className="text-[11px] text-slate-400 mt-0.5 block">
                            {formatDate(activity.time)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    Belum ada aktivitas terbaru.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Recent Transactions
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Riwayat transaksi warehouse terbaru
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    {["Nama Bahan", "Jenis", "Jumlah", "Tanggal", "Status"].map(
                      (head) => (
                        <th
                          key={head}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                        >
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filteredTx.map((tx, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                        {tx.bahan}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                            tx.jenis === "Masuk"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : tx.jenis === "Terpakai"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : "bg-purple-50 text-purple-700 border border-purple-100"
                          }`}
                        >
                          {tx.jenis}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-500 font-medium">
                        {tx.jumlah}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-500">
                        {formatDate(tx.tanggal)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${
                            statusStyle[tx.statusType] || statusStyle.muted
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredTx.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Tidak ada transaksi yang cocok dengan pencarian.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-100">
              <span className="text-xs text-slate-400">
                Menampilkan{" "}
                <span className="font-semibold text-slate-600">
                  {filteredTx.length}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-slate-600">
                  {transactions.length}
                </span>{" "}
                transaksi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
