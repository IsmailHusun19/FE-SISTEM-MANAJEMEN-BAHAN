import React from "react";
import Logo from "../assets/logo.png";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-200 bg-gradient-to-b from-white to-neutral-100">
      {/* Blur Accent */}
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Logo & Desc */}
          <div className="lg:col-span-1">
            <img
              className="w-44 drop-shadow-sm"
              src={Logo}
              alt="Logo"
            />

            <p className="mt-5 text-sm leading-7 text-neutral-600">
              Membantu menghadirkan solusi digital modern dengan
              tampilan elegan, cepat, dan profesional.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="rounded-full border border-neutral-200 bg-white p-3 text-neutral-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:text-amber-600 hover:shadow-md"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full border border-neutral-200 bg-white p-3 text-neutral-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:text-amber-600 hover:shadow-md"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="rounded-full border border-neutral-200 bg-white p-3 text-neutral-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:text-amber-600 hover:shadow-md"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase">
              Services
            </h3>

            <ul className="mt-5 space-y-3">
              {["Branding", "Design", "Marketing", "Advertisement"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-neutral-600 transition-colors duration-300 hover:text-amber-600"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {["About Us", "Contact", "Careers", "Press Kit"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-neutral-600 transition-colors duration-300 hover:text-amber-600"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-neutral-900 uppercase">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">
              {["Terms", "Privacy Policy", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-neutral-600 transition-colors duration-300 hover:text-amber-600"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-neutral-200 pt-6">
          <p className="text-center text-sm text-neutral-500">
            © 2026 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;