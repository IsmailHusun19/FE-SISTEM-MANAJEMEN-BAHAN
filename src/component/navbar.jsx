import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              alt="Logo"
              src={logo}
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold text-neutral-800 transition-colors duration-300 hover:text-amber-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Login Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/login"
            className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-600 hover:shadow-md"
          >
            Log in
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2 text-neutral-800 transition hover:bg-neutral-100"
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-all duration-300 ${
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div
          className={`fixed right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
            <img src={logo} alt="Logo" className="h-8 w-auto" />

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2 px-6 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
              >
                {item.name}
              </Link>
            ))}

            {/* Login Mobile */}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;