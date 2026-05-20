"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/allcars", label: "All Cars" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/">
            <Image alt="logo" height={55} width={55} src="/car-logo.png" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium transition-colors duration-200 text-white/70 hover:text-white"
                  style={pathname === l.href ? { color: "#1E90FF" } : {}}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#contact"
              className="px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#1E90FF" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1a7ee0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1E90FF")
              }
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
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col px-6 pt-24 pb-10 gap-4 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <button
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          onClick={() => setOpen(false)}
        >
          <X size={18} />
        </button>

        <div
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-6 py-4 border-b border-white/10 last:border-b-0 text-sm font-medium transition-colors text-white/75 hover:text-white hover:bg-white/5"
              style={
                pathname === l.href
                  ? { color: "#1E90FF", background: "rgba(255,255,255,0.05)" }
                  : {}
              }
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="py-3.5 text-center text-white text-sm font-semibold rounded-2xl"
          style={{ background: "#1E90FF" }}
        >
          Contact Us
        </Link>
      </div>
    </>
  );
}
