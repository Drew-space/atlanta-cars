"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Show, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const WHATSAPP_URL = `https://wa.me/12125550000?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20a%20car.`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = useIsAdmin();

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
          <div className="hidden md:flex items-center gap-4">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button variant={"outline"}>Sign Up</Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              {isAdmin ? (
                <Link href={"/admin"}>
                  <Button variant={"outline"}>Dashboard</Button>
                </Link>
              ) : (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant={"outline"}>Contact Us</Button>
                </a>
              )}

              <UserButton />
            </Show>
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

        {/* Mobile nav links */}
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

        {/* Mobile CTA */}
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button variant={"outline"} className="w-full">
              Sign Up
            </Button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <div className="flex flex-col gap-4">
            {isAdmin ? (
              <Link href={"/admin"} onClick={() => setOpen(false)}>
                <Button variant={"outline"} className="w-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <Button variant={"outline"} className="w-full">
                  Contact Us
                </Button>
              </a>
            )}

            <div className="flex justify-center">
              <UserButton />
            </div>
          </div>
        </Show>
      </div>
    </>
  );
}
