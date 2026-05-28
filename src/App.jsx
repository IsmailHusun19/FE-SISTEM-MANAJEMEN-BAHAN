import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SidebarContextProvider from "./component/SidebarContextProvider";
import ProtectedRoute from "./component/ProtectedRoute";
import { Toaster } from "sonner";
import Error from "./pages/Error";
import EditBahan from "./pages/EditBahan";
import AddBahan from "./pages/AddBahan";
import Profile from "./pages/Profile";
import Bahan from "./pages/Bahan";
import BahanNonAktif from "./pages/BahanNonAktif";
import Supervisor from "./pages/Supervisor";
import AddSupervisor from "./pages/AddSupervisor";
import EditSupervsior from "./pages/EditSupervisor";
import SupervisorNonAktif from "./pages/SupervisorNonAktif";
import Gudang from "./pages/Gudang";
import AddGudang from "./pages/AddGudang";
import EditGudang from "./pages/EditGudang";
import GudangNonAktif from "./pages/GudangNonAktif";
import Leader from "./pages/Leader";
import AddLeader from "./pages/AddLeader";
import EditLeader from "./pages/EditLeader";
import LeaderNonAktif from "./pages/LeaderNonAktif";
import BahanMasuk from "./pages/BahanMasuk";
import AddPenerimaanBahan from "./pages/AddBahanMasuk";
import DetailPenerimaanBahan from "./pages/DetailBahanMasuk";
import EditPenerimaanBahan from "./pages/EditBahanMasuk";
import BahanSisa from "./pages/BahanSisa";
import AddBahanSisa from "./pages/AddBahanSisa";
import DetailPemakaianBahan from "./pages/DetailBahanSisa";
import EditBahanSisa from "./pages/EditBahanSisa";

const App = () => {
  return (
    <>
      <Toaster richColors theme="dark" />
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <Dashboard />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <Profile />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bahan/kelola-bahan"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <Bahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bahan/tambah-bahan"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <AddBahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bahan/edit-bahan/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <EditBahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bahan/bahan-nonaktif"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <BahanNonAktif />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/supervisor-produksi"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <Supervisor />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/tambah-supervisor"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <AddSupervisor />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/edit-supervisor/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <EditSupervsior />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/supervisor-nonaktif"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <SupervisorNonAktif />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/staff-gudang"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <Gudang />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/tambah-gudang"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <AddGudang />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/edit-gudang/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <EditGudang />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/gudang-nonaktif"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <GudangNonAktif />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/leader-produksi"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <Leader />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/tambah-leader"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <AddLeader />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/edit-leader/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <EditLeader />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pengguna/leader-nonaktif"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <LeaderNonAktif />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                        <Route
              path="/bahan/penerimaan-bahan"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <BahanMasuk />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                        <Route
              path="/bahan/tambah-penerimaan-bahan"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <AddPenerimaanBahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                                    <Route
              path="/bahan/detail-penerimaan-bahan/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <DetailPenerimaanBahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                        <Route
              path="/bahan/edit-penerimaan-bahan/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <EditPenerimaanBahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                                    <Route
              path="/pemakaian-bahan"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <BahanSisa />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                                    <Route
              path="/tambah-pemakaian-bahan"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <AddBahanSisa />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                                                <Route
              path="/detail-pemakaian-bahan/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <DetailPemakaianBahan />
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
                                    <Route
              path="/edit-pemakaian-bahan/:id"
              element={
                <ProtectedRoute>
                  <SidebarContextProvider>
                    <EditBahanSisa/>
                  </SidebarContextProvider>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
