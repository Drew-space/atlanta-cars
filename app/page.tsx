import About from "@/components/About";
import BestCars from "@/components/BestCars";
import Hero from "@/components/Hero";
import TopCarSection from "@/components/TopPicks";
import TopPicks from "@/components/TopPicks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TopCarSection />
      <BestCars />
      <WhyChooseUs />
    </>
  );
}
