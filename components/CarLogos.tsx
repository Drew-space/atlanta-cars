import { MarqueeScroll } from "infinite-marquee-scroll";

const items = [
  { text: "Tesla", image: { src: "/icons/tesla.svg" } },
  { text: "BMW", image: { src: "/icons/bmw.svg" } },
  { text: "Mercedes", image: { src: "/icons/mercedes.svg" } },
  { text: "Audi", image: { src: "/icons/audi.svg" } },
  { text: "Toyota", image: { src: "/icons/toyota.svg" } },
  { text: "Honda", image: { src: "/icons/honda.svg" } },
  { text: "Lexus", image: { src: "/icons/lexus.svg" } },
  { text: "Porsche", image: { src: "/icons/porsche.svg" } },
  { text: "Lamborghini", image: { src: "/icons/lamborghini.svg" } },
  { text: "Ferrari", image: { src: "/icons/ferrari.svg" } },
  { text: "Bentley", image: { src: "/icons/bentley.svg" } },
  { text: "Rolls Royce", image: { src: "/icons/rollsroyce.svg" } },
  { text: "Nissan", image: { src: "/icons/nissan.svg" } },
  { text: "Hyundai", image: { src: "/icons/hyundai.svg" } },
  { text: "Kia", image: { src: "/icons/kia.svg" } },
];

export default function CarLogos() {
  return (
    <div className="mt-5 py-10">
      <div className="container mx-auto">
        <MarqueeScroll
          items={items}
          speed={30}
          imageSize={36}
          textClassName="text-sm font-semibold text-gray-700"
        />
      </div>
    </div>
  );
}
