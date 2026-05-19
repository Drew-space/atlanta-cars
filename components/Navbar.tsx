"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/allcars", label: "All Cars" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="font-black text-2xl tracking-tight text-white"
          >
            LUX<span className="text-[#a3b800]">ED</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === l.href
                      ? "text-[#a3b800]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#contact"
              className="px-5 py-2.5 bg-[#2e7d32] hover:bg-[#388e3c] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-green-900/40"
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col px-6 pt-24 pb-10 gap-2 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-5 right-6 text-white p-2"
          onClick={() => setOpen(false)}
        >
          <X size={22} />
        </button>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10 text-lg font-medium text-white/80 hover:text-white transition-colors"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="mt-6 py-3.5 text-center bg-[#2e7d32] hover:bg-[#388e3c] text-white text-sm font-semibold rounded-full transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </>
  );
}
