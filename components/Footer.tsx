// import Link from "next/link";
// import { Phone, MapPin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className=" px-6 pt-6 pb-0" id="contact">
//       {/* CTA Banner */}
//       <div className="max-w-5xl mx-auto rounded-2xl bg-[#1E90FF] overflow-hidden relative mb-14">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center">
//           {/* Text */}
//           <div className="px-10 py-12 flex flex-col gap-6">
//             <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight">
//               Drive Your Dream Car Today!
//             </h2>
//             <p className="text-green-100 text-sm leading-relaxed max-w-sm">
//               Whether you&apos;re looking to buy or rent, we have the perfect
//               car waiting for you. Browse our extensive selection and get behind
//               the wheel with ease.
//             </p>{" "}
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/cars"
//                 className="bg-white text-neutral-900 text-sm font-medium px-6 py-3 rounded-full hover:bg-green-50 transition-colors"
//               >
//                 Browse Cars
//               </Link>
//               <Link
//                 href=""
//                 className="border border-white text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>

//           {/* Car image — hidden on mobile */}
//           <div className="flex items-end justify-center h-full pt-6">
//             <img
//               src={"/images/hero.png"}
//               alt="Luxury SUV"
//               className="w-full max-w-sm object-contain drop-shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Footer body */}
//       <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
//         {/* Brand */}
//         <div className="flex flex-col gap-4 col-span-1">
//           <div className="flex items-center gap-2">
//             {/* Logo mark */}
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M12 2L4 7v5c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V7L12 2z"
//                 fill="#1E90FF"
//               />
//               <path
//                 d="M9 12l2 2 4-4"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span className="text-white font-semibold tracking-widest text-sm uppercase">
//               Luxed
//             </span>
//           </div>
//           <p className=" text-sm leading-relaxed">
//             We are dedicated to providing the best car buying and renting
//             experience, offering a wide range of high-quality vehicles with
//             excellent customer service.
//           </p>
//         </div>

//         {/* Information */}
//         <div className="flex flex-col gap-4">
//           <h4 className=" text-xs font-semibold tracking-widest uppercase">
//             Information
//           </h4>
//           <ul className="flex flex-col gap-3">
//             {[
//               "Cars for Sale",
//               "Cars for Rent",
//               "Financing",
//               "About Us",
//               "Contact Us",
//             ].map((item) => (
//               <li key={item}>
//                 <Link
//                   href="#"
//                   className=" text-sm hover:text-white transition-colors"
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact */}
//         <div className="flex flex-col gap-4">
//           <h4 className=" text-xs font-semibold tracking-widest uppercase">
//             Contact
//           </h4>
//           <ul className="flex flex-col gap-4">
//             <li className="flex items-start gap-3">
//               <span className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0">
//                 <Phone size={13} className="text-[#1E90FF]" />
//               </span>
//               <span className="text-sm leading-snug pt-1">+1-800-123-4567</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0">
//                 <MapPin size={13} className="text-[#1E90FF]" />
//               </span>
//               <span className=" text-sm leading-snug pt-1">
//                 73 Main Street, 5th block
//                 <br />
//                 New York City
//               </span>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div className="flex flex-col gap-4">
//           <h4 className=" text-xs font-semibold tracking-widest uppercase">
//             Social Media
//           </h4>
//           <ul className="flex flex-col gap-3">
//             {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((s) => (
//               <li key={s}>
//                 <Link href="#" className=" text-sm  transition-colors">
//                   {s}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="max-w-5xl mx-auto border-t border-neutral-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
//         <p className="text-neutral-500 text-xs">
//           © 2026 LUXEDRIVE. All Rights Reserved.
//         </p>
//         <div className="flex gap-6">
//           <Link
//             href="#"
//             className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors"
//           >
//             Terms of Service
//           </Link>
//           <Link
//             href="#"
//             className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors"
//           >
//             Privacy Policy
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";
import Link from "next/link";
import { Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !message) return;
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus("done");
      setEmail("");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="px-6 pt-6 pb-0" id="contact">
      {/* CTA Banner */}
      <div className="max-w-5xl mx-auto rounded-2xl bg-[#1E90FF] overflow-hidden relative mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="px-10 py-12 flex flex-col gap-6">
            <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight">
              Drive Your Dream Car Today!
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
              Whether you&apos;re looking to buy or rent, we have the perfect
              car waiting for you. Browse our extensive selection and get behind
              the wheel with ease.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6 py-3 h-auto"
              >
                <Link href="/all-cars">Browse Cars</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 py-3 h-auto bg-transparent border-white text-white hover:bg-white/10"
              >
                <a href="#contact-form">Contact Us</a>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-end justify-center h-full pt-6">
            <img
              src="/images/hero.png"
              alt="Luxury SUV"
              className="w-full max-w-sm object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Footer body — 5 columns */}
      <div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 pb-12"
        id="contact-form"
      >
        {/* Brand */}
        <div className="flex flex-col gap-4 col-span-1">
          <div className="flex items-center gap-2">
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
          <p className="text-sm leading-relaxed">
            We are dedicated to providing the best car buying and renting
            experience, offering a wide range of high-quality vehicles with
            excellent customer service.
          </p>
        </div>

        {/* Information */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase">
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
                  className="text-sm hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase">
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
              <span className="text-sm leading-snug pt-1">
                73 Main Street, 5th block
                <br />
                Atlanta, Georgia
              </span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase">
            Social Media
          </h4>
          <ul className="flex flex-col gap-3">
            {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((s) => (
              <li key={s}>
                <Link
                  href="#"
                  className="text-sm transition-colors hover:text-white"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get In Touch */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase">
            Get In Touch
          </h4>

          {status === "done" ? (
            <div className="flex flex-col gap-2 py-4">
              <div className="w-9 h-9 rounded-full bg-[#1E90FF]/15 flex items-center justify-center">
                <Send size={16} className="text-[#1E90FF]" />
              </div>
              <p className="text-white text-sm font-medium mt-1">
                Message sent!
              </p>
              <p className="text-neutral-500 text-xs leading-relaxed">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="footer-name">Name</Label>
                <Input
                  id="footer-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="footer-email">Email</Label>
                <Input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="footer-message">Message</Label>
                <Textarea
                  id="footer-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message…"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full mt-0.5 h-9 text-xs bg-[#1E90FF] hover:bg-[#1E90FF]"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto border-t border-neutral-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-neutral-500 text-xs">
          © 2026 LUXEDRIVE. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <Button
            asChild
            variant="link"
            size="sm"
            className="text-neutral-500 hover:text-neutral-300 h-auto p-0 text-xs"
          >
            <Link href="#">Terms of Service</Link>
          </Button>
          <Button
            asChild
            variant="link"
            size="sm"
            className="text-neutral-500 hover:text-neutral-300 h-auto p-0 text-xs"
          >
            <Link href="#">Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
