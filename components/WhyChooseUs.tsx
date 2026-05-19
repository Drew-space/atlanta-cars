import { Car, Receipt, CreditCard, Headset } from "lucide-react";
import Image from "next/image";

const features = {
  left: [
    {
      icon: Car,
      title: "Wide selection of vehicles",
      description:
        "Choose from a diverse selection of cars to suit your style and budget, whether you're looking to buy or rent.",
    },
    {
      icon: Receipt,
      title: "Transparent pricing",
      description:
        "We believe in clear, upfront pricing with no hidden fees, ensuring you get the best deal on your vehicle.",
    },
  ],
  right: [
    {
      icon: CreditCard,
      title: "Flexible financing options",
      description:
        "Get customized financing plans that fit your budget, making it easier to drive away in your dream car.",
    },
    {
      icon: Headset,
      title: "Exceptional customer service",
      description:
        "Our team is dedicated to providing personalized support, ensuring a seamless experience from start to finish.",
    },
  ],
};

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex  max-sm:items-center max-sm:text-center flex-col gap-2">
      <div className="w-11 h-11 rounded-lg ring ring-[#04995b] flex items-center justify-center">
        <Icon size={20} className="text-[#04995b]" />
      </div>
      <h3 className="text-[15px] font-medium text-neutral-900">{title}</h3>
      <p className="text-[13px] text-neutral-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-medium text-neutral-900 mb-3">
            Why <span className="text-[#04995b]">Choose</span> Us
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-md mx-auto">
            We provide a smooth car buying or renting experience with great
            vehicle options, clear pricing, and top-notch customer support.
          </p>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-rows-1 md:grid-cols-[1fr_220px_1fr] gap-10 items-center">
          {/* Left features */}
          <div className="flex flex-col gap-10">
            {features.left.map((f) => (
              <FeatureItem key={f.title} {...f} />
            ))}
          </div>

          {/* Center image */}
          <div className="flex justify-center mt-10">
            {/* wrapper so absolute image has a reference */}
            <div className="relative w-full max-w-sm">
              {/* floating car image */}
              <div className="absolute -top-16 left-1/2 -translate-x-[60%] w-85 h-70 z-10">
                <Image
                  src="/images/hero.png"
                  alt="car"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* background card */}
              <div className="w-full h-40 transparent rounded-2xl pt-20 px-6 pb-6">
                {/* your text/content goes here */}
              </div>
            </div>
          </div>

          {/* Right features */}
          <div className="flex flex-col gap-10">
            {features.right.map((f) => (
              <FeatureItem key={f.title} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
