import {
  Home,
  Users,
  LogOut,
  User,
  PackageSearch,
  Settings,
  UserCog,
  Notebook,
  Factory,
  CalendarCog,
  Activity,
  CheckCircle,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./SlideBar";
import React from "react";
import { Logout } from "../service/Api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const MenuSlideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await Logout();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const activeRoutes = [
    "/pemakaian-bahan",
    "/tambah-pemakaian-bahan",
    "/edit-pemakaian-bahan",
    "/detail-pemakaian-bahan",
  ];
  
  const isActive = activeRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  const userRole = user?.role;
  const sidebarItems = [
    {
      icon: <Home size={20} />,
      text: "Home",
      to: "/dashboard",
      active: currentPath === "/dashboard",
    },
    {
      icon: <PackageSearch size={20} />,
      text: "Bahan",
      to: "/bahan",
      active: currentPath.startsWith("/bahan"),
      roles: ["OWNER", "STAFF_GUDANG", "SUPERVISOR_PRODUKSI"],
      children: [
        {
          text: "Kelola Bahan",
          to: "/bahan/kelola-bahan",
        },
        {
          text: "Penerimaan Bahan",
          to: "/bahan/penerimaan-bahan",
        },
      ],
    },
    {
      icon: <PackageSearch size={20} />,
      text: "Bahan",
      to: "/bahan",
      active: currentPath.startsWith("/bahan"),
      roles: ["LEADER_PRODUKSI"],
      children: [
        {
          text: "Kelola Bahan",
          to: "/bahan/kelola-bahan",
        },
      ],
    },
    {
      icon: <Users size={20} />,
      text: "Pengguna",
      to: "/pengguna",
      active: currentPath.startsWith("/pengguna"),
      roles: ["OWNER"],
      children: [
        {
          text: "Supervisor Produksi",
          to: "/pengguna/supervisor-produksi",
        },
        {
          text: "Staff Gudang",
          to: "/pengguna/staff-gudang",
        },
        {
          text: "Leader Produksi",
          to: "/pengguna/leader-produksi",
        },
      ],
    },
    {
      icon: <Users size={20} />,
      text: "Pengguna",
      to: "/pengguna",
      active: currentPath.startsWith("/pengguna"),
      roles: ["SUPERVISOR_PRODUKSI"],
      children: [
        {
          text: "Leader Produksi",
          to: "/pengguna/leader-produksi",
        },
      ],
    },
    {
      icon: <Factory size={20} />,
      text: "Pemakaian Bahan",
      to: "/pemakaian-bahan",
      active: isActive
    },

    {
      icon: <User size={20} />,
      text: "Profile",
      to: "/profile",
      active: currentPath === "/profile",
    },

    {
      icon: <LogOut size={20} />,
      text: "Logout",
      onClick: handleLogout,

    },
  ];

  return (
    <div className="flex">
      <Sidebar>
        {sidebarItems.map((item) => {
          if (!item.roles || item.roles.includes(userRole)) {
            return (
              <React.Fragment key={item.text}>
                {item.text === "Profile" && (
                  <hr className="my-3 border-amber-500" />
                )}

                <SidebarItem
                  icon={item.icon}
                  text={item.text}
                  to={item.to}
                  active={item.active}
                  onClick={item.onClick}
                >
                  {item.children?.map((child) => child)}
                </SidebarItem>
              </React.Fragment>
            );
          }
          return null;
        })}
      </Sidebar>


    </div>
  );
};

export default MenuSlideBar;
