"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "How can I buy a car from your website?",
    answer:
      "Simply browse our selection of cars for sale, select the one that fits your needs, and follow the steps to complete the purchase online. Our team is here to assist if you need help.",
  },
  {
    question: "What are the rental terms for cars?",
    answer:
      "Our rental terms vary by vehicle and duration. Generally, you'll need a valid driver's license, a credit card for the deposit, and proof of insurance. Rentals can be daily, weekly, or monthly.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we offer flexible financing plans tailored to your budget. You can apply online and get a decision within minutes. Our team will walk you through the best options available.",
  },
  {
    question: "Can I test drive a car before purchasing?",
    answer:
      "Absolutely! We encourage test drives before any purchase. Simply book an appointment online or walk in to any of our locations and our team will arrange it for you.",
  },
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You'll need a valid government-issued ID, a valid driver's license, and a credit or debit card in your name. International customers may also need their passport.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left — title + image */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-4xl font-semibold text-neutral-900 leading-tight">
              Frequently Asked
            </h2>
            <h2 className="text-4xl font-semibold text-[#04995b] leading-tight">
              Questions
            </h2>
          </div>

          {/* Image hidden on mobile, visible on md+ */}
          <div className="rounded-3xl relative overflow-hidden shadow-md">
            {/* IMAGE */}
            <Image
              src={"/images/faq.png"}
              alt="Car buyer"
              width={400}
              height={400}
              className="w-full h-[320px] object-cover"
            />

            {/* INNER WHITE RING */}
            <div className="pointer-events-none absolute inset-3 rounded-3xl ring-2 ring-white/80" />
          </div>
        </div>

        {/* Right — accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={i}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className={`w-full text-left rounded-2xl px-5 py-4 transition-colors duration-200 ${
                  isOpen
                    ? "bg-[#04995b] text-white"
                    : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-medium leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? "bg-white text-[#04995b]"
                        : "bg-[#04995b] text-white"
                    }`}
                  >
                    {isOpen ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                  </span>
                </div>

                {isOpen && (
                  <p className="mt-3 text-[13px] text-green-100 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
