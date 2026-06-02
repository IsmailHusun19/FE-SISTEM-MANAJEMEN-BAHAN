import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/logo-kecil.png";
import { use, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarContext } from "./SidebarContextProvider";
import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../component/AuthContext";
import { BASE_URL } from "../utils/config";

export default function Sidebar({ children }) {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded(false)}
            className="
        fixed inset-0 z-40
        bg-slate-900/20
        backdrop-blur-[2px]
        sm:hidden
      "
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={`
    fixed top-0 left-0 z-40
    h-screen flex flex-col
    border-r border-neutral-200/70
    bg-white/95 backdrop-blur-xl
    shadow-[2px_0_18px_rgba(0,0,0,0.04)]
    transition-all duration-300
    overflow-hidden
    ${expanded ? "w-60" : "w-[72px]"}
  `}
      >
        {/* TOP LINE */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400" />

        {/* BG GLOW */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-amber-100/50 blur-3xl" />
          <div className="absolute bottom-0 -left-14 h-36 w-36 rounded-full bg-orange-50/70 blur-3xl" />
        </div>

        <nav className="flex h-full flex-col">
          {/* HEADER */}
          <div
            className={`
    relative flex items-center
    px-3 pt-5 pb-4
    ${expanded ? "justify-between" : "justify-center"}
  `}
          >
            <AnimatePresence mode="wait">
              {expanded && (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5"
                >
                  {/* LOGO */}
                  <div
                    className="
            relative flex h-9 w-9
            items-center justify-center
          "
                  >
                    <img src={logo} alt="Logo" className="object-contain" />

                    <div className="absolute" />
                  </div>

                  <div>
                    <h2 className="text-[13px] font-black tracking-tight text-slate-900 leading-none">
                      DOIR
                    </h2>

                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium tracking-wide">
                      Warehouse System
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TOGGLE */}
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="
      flex h-8 w-8 items-center justify-center
      rounded-lg
      border border-neutral-200
      bg-white
      text-slate-500
      hover:bg-amber-50
      hover:text-amber-600
      transition-all duration-200
      cursor-pointer
    "
            >
              {expanded ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>

          {/* PROFILE */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  marginInline: 12,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  marginInline: 12,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginInline: 12,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <div
                  className="
                    rounded-xl
                    border border-neutral-100
                    bg-gradient-to-br
                    from-neutral-50
                    to-amber-50/40
                    p-3
                    mb-2
                  "
                >
                  <div className="flex items-center gap-2.5">
                    {/* AVATAR */}
                    <div className="relative">
                    <div
                className="
                  w-9 h-9
                  rounded-xl
                  overflow-hidden
                  bg-gradient-to-br from-orange-500 to-amber-400
                  flex items-center justify-center
                  text-white text-sm font-bold
                  ring-2 ring-white
                "
              >
      {user?.avatar && !imageError ? (
        <img
          src={`${BASE_URL}/${user.avatar}`}
          alt={user?.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        user?.name?.charAt(0)?.toUpperCase()
      )}
              </div>

                      <span
                        className="
                          absolute -bottom-0.5 -right-0.5
                          h-2.5 w-2.5 rounded-full
                          bg-emerald-400
                          border border-white
                        "
                      />
                    </div>

                    <div>
                      <h3 className="text-[13px] font-bold text-slate-900 leading-none">
                        {user.name}
                      </h3>

                      <p className="text-[10px] text-slate-400 mt-1 font-medium">
                        {user.role
                          ?.toLowerCase()
                          .replaceAll("_", " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div
                    className="
                      mt-3
                      flex items-center gap-2
                      rounded-lg
                      bg-emerald-50
                      border border-emerald-100
                      px-2.5 py-1.5
                    "
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>

                    <span className="text-[11px] font-semibold text-emerald-700">
                      System Active
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DIVIDER */}
          <div className="mx-3 border-t border-neutral-100 mb-2" />

          {/* MENU */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 space-y-0.5 px-2 overflow-y-auto">
              {children}
            </ul>
          </SidebarContext.Provider>

          {/* FOOTER */}
          <div className="p-3 border-t border-neutral-100">
            {expanded ? (
              <div
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-amber-50 to-orange-50
                  border border-amber-100
                  px-3 py-2.5
                "
              >
                <p className="text-[9px] font-bold text-amber-700 uppercase tracking-[0.15em]">
                  Raw Material Management
                </p>

                <p className="text-[10px] text-slate-400 mt-1">
                  v1.0.0 · © 2026 DOIR
                </p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div
                  className="
                    h-9 w-9 rounded-lg
                    bg-amber-50
                    border border-amber-100
                    flex items-center justify-center
                  "
                >
                  <span
                    className="                          flex h-9 w-9 items-center justify-center
                          rounded-lg
                          bg-gradient-to-br
                          from-amber-500 to-orange-500
                          text-sm font-black text-white
                          shadow-md shadow-amber-200"
                  >
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

/* =========================================================
   SIDEBAR SECTION
========================================================= */

export function SidebarSection({ label }) {
  const { expanded } = useContext(SidebarContext);

  if (!expanded) {
    return <div className="my-2 mx-3 border-t border-neutral-100" />;
  }

  return (
    <li className="pt-4 pb-1 px-2">
      <p
        className="
        text-[9px]
        font-bold
        uppercase
        tracking-[0.18em]
        text-slate-400
      "
      >
        {label}
      </p>
    </li>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  children,
  onClick,
  to = "#",
}) {
  const { expanded } = useContext(SidebarContext);

  const [open, setOpen] = useState(false);

  const hasChildren = Array.isArray(children);

  const itemClass = `
    group relative list-none
    overflow-hidden rounded-xl
    transition-all duration-200
    cursor-pointer
    ${
      active
        ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-md shadow-amber-200/40"
        : "hover:bg-amber-100"
    }
  `;

  return (
    <>
      {/* HAS CHILDREN */}
      {hasChildren ? (
        <li className={itemClass} onClick={() => setOpen(!open)}>
          <div className="relative flex items-center gap-2.5 px-2 py-2">
            {/* ICON */}
            <div
              className={`
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                transition-all duration-200
                ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600"
                }
              `}
            >
              {React.cloneElement(icon, {
                size: 17,
              })}
            </div>

            {/* LABEL */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    flex flex-1 items-center
                    justify-between overflow-hidden
                  "
                >
                  <span
                    className={`
                      text-[13px]
                      font-semibold
                      whitespace-nowrap
                      ${active ? "text-white" : "text-slate-700"}
                    `}
                  >
                    {text}
                  </span>

                  <ChevronDown
                    size={13}
                    className={`
                      transition-transform duration-300
                      shrink-0
                      ${active ? "text-white/70" : "text-slate-400"}
                      ${open ? "rotate-180" : ""}
                    `}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* TOOLTIP */}
            {!expanded && (
              <div
                className="
                  pointer-events-none absolute left-14 z-50
                  whitespace-nowrap rounded-lg
                  bg-slate-900 px-3 py-1.5
                  text-[11px] font-semibold text-white
                  opacity-0 group-hover:opacity-100
                  translate-x-1 group-hover:translate-x-0
                  transition-all duration-200
                  shadow-xl
                "
              >
                {text}

                <div
                  className="
                  absolute left-0 top-1/2
                  -translate-y-1/2 -translate-x-1.5
                  border-4 border-transparent
                  border-r-slate-900
                "
                />
              </div>
            )}
          </div>
        </li>
      ) : (
        <li
          className={itemClass}
          onClick={text === "Logout" ? onClick : undefined}
        >
          <Link
            to={to}
            className="relative flex items-center gap-2.5 px-2 py-2"
          >
            {/* ICON */}
            <div
              className={`
                relative flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                transition-all duration-200
                ${
                  active
                    ? "bg-white/20 text-white"
                    : text === "Logout"
                    ? "bg-neutral-100 text-slate-500 group-hover:bg-red-50 group-hover:text-red-500"
                    : "bg-neutral-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600"
                }
              `}
            >
              {React.cloneElement(icon, {
                size: 17,
              })}

              {alert && !expanded && (
                <span
                  className="
                  absolute -top-0.5 -right-0.5
                  h-2.5 w-2.5 rounded-full
                  bg-red-500 border border-white
                "
                />
              )}
            </div>

            {/* LABEL */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    flex flex-1 items-center
                    justify-between overflow-hidden
                  "
                >
                  <span
                    className={`
                      text-[13px]
                      font-semibold
                      whitespace-nowrap
                      ${
                        active
                          ? "text-white"
                          : text === "Logout"
                          ? "group-hover:text-red-600 text-slate-700"
                          : "text-slate-700"
                      }
                    `}
                  >
                    {text}
                  </span>

                  {alert && (
                    <span
                      className="
                        flex items-center justify-center
                        h-4.5 min-w-4.5
                        px-1 rounded-full
                        bg-red-500 text-white
                        text-[9px] font-bold
                        shrink-0 ml-2
                      "
                    >
                      {typeof alert === "number" ? alert : ""}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* TOOLTIP */}
            {!expanded && (
              <div
                className="
                  pointer-events-none absolute left-14 z-50
                  whitespace-nowrap rounded-lg
                  bg-slate-900 px-3 py-1.5
                  text-[11px] font-semibold text-white
                  opacity-0 group-hover:opacity-100
                  translate-x-1 group-hover:translate-x-0
                  transition-all duration-200 shadow-xl
                "
              >
                {text}

                <div
                  className="
                  absolute left-0 top-1/2
                  -translate-y-1/2 -translate-x-1.5
                  border-4 border-transparent
                  border-r-slate-900
                "
                />
              </div>
            )}
          </Link>
        </li>
      )}

      {/* SUBMENU */}
      <AnimatePresence initial={false}>
        {hasChildren && open && expanded && (
          <motion.ul
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="
              ml-6
              mt-1 mb-1
              space-y-0.5
              overflow-hidden
              border-l-2 border-amber-200
              pl-2
              list-none
            "
          >
            {children.map((child, index) => (
              <motion.li
                key={index}
                initial={{
                  opacity: 0,
                  x: -6,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -6,
                }}
                transition={{
                  duration: 0.15,
                  delay: index * 0.04,
                }}
              >
                <Link
                  to={child.to}
                  className="
                    flex items-center gap-2
                    rounded-lg
                    px-2.5 py-2
                    text-[13px] font-medium
                    text-slate-500
                    transition-all
                    hover:bg-amber-50
                    hover:text-amber-700
                  "
                >
                  {child.text}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
