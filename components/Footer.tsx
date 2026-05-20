import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" px-6 pt-6 pb-0" id="contact">
      {/* CTA Banner */}
      <div className="max-w-5xl mx-auto rounded-2xl bg-[#1E90FF] overflow-hidden relative mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Text */}
          <div className="px-10 py-12 flex flex-col gap-6">
            <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight">
              Drive Your Dream Car Today!
            </h2>
            <p className="text-green-100 text-sm leading-relaxed max-w-sm">
              Whether you&apos;re looking to buy or rent, we have the perfect
              car waiting for you. Browse our extensive selection and get behind
              the wheel with ease.
            </p>{" "}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cars"
                className="bg-white text-neutral-900 text-sm font-medium px-6 py-3 rounded-full hover:bg-green-50 transition-colors"
              >
                Browse Cars
              </Link>
              <Link
                href=""
                className="border border-white text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Car image — hidden on mobile */}
          <div className="flex items-end justify-center h-full pt-6">
            <img
              src={"/images/hero.png"}
              alt="Luxury SUV"
              className="w-full max-w-sm object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4 col-span-1">
          <div className="flex items-center gap-2">
            {/* Logo mark */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 7v5c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V7L12 2z"
                fill="#1E90FF"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white font-semibold tracking-widest text-sm uppercase">
              Luxed
            </span>
          </div>
          <p className=" text-sm leading-relaxed">
            We are dedicated to providing the best car buying and renting
            experience, offering a wide range of high-quality vehicles with
            excellent customer service.
          </p>
        </div>

        {/* Information */}
        <div className="flex flex-col gap-4">
          <h4 className=" text-xs font-semibold tracking-widest uppercase">
            Information
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              "Cars for Sale",
              "Cars for Rent",
              "Financing",
              "About Us",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className=" text-sm hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className=" text-xs font-semibold tracking-widest uppercase">
            Contact
          </h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0">
                <Phone size={13} className="text-[#1E90FF]" />
              </span>
              <span className="text-sm leading-snug pt-1">+1-800-123-4567</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0">
                <MapPin size={13} className="text-[#1E90FF]" />
              </span>
              <span className=" text-sm leading-snug pt-1">
                73 Main Street, 5th block
                <br />
                New York City
              </span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-4">
          <h4 className=" text-xs font-semibold tracking-widest uppercase">
            Social Media
          </h4>
          <ul className="flex flex-col gap-3">
            {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((s) => (
              <li key={s}>
                <Link href="#" className=" text-sm  transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto border-t border-neutral-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-neutral-500 text-xs">
          © 2026 LUXEDRIVE. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
