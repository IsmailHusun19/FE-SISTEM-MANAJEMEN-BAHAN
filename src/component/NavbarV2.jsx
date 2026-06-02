import { PackageSearch, ChevronDown } from "lucide-react";
import React, {useState} from "react";
import { useAuth } from "../component/AuthContext";
import { BASE_URL } from "../utils/config";

const NavbarV2 = () => {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  return (
    <div
      className="
        sticky top-0 z-30
        backdrop-blur-2xl
        bg-white/70
        border-b border-white/50
        shadow-[0_10px_35px_rgba(15,23,42,0.04)]
      "
    >
      <div
        className="
          px-4 sm:px-6 lg:px-8
          min-h-[72px]
          flex items-center justify-between
          gap-4
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="
              w-10 h-10
              rounded-[18px]
              bg-gradient-to-br from-orange-500 to-amber-400
              flex items-center justify-center
              shadow-lg shadow-orange-200/70
              shrink-0
            "
          >
            <PackageSearch size={20} className="text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
                DOIR
              </span>

              <span
                className="
                  px-2 py-[3px]
                  rounded-full
                  bg-gradient-to-r from-orange-500 to-amber-400
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  shadow-sm
                "
              >
                Warehouse
              </span>
            </div>

            <p className="text-[10px] text-slate-400 tracking-wide mt-1 truncate">
              Raw Material Management System
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center justify-end">
          <div
            className="
              group
              inline-flex
              min-w-[205px]
              max-w-fit
              items-center gap-3
              px-3 py-2
              rounded-2xl
              bg-white/85
              backdrop-blur-xl
              border border-slate-200/80
              shadow-sm
            "
          >
            <div className="relative shrink-0">
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
                  w-2.5 h-2.5
                  rounded-full
                  bg-emerald-500
                  border-2 border-white
                "
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate leading-none">
                {user?.name}
              </p>

              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {user?.role
                  ?.toLowerCase()
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarV2;