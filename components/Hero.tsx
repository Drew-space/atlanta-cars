import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className=" mt-16 pt-6  flex flex-col items-center  text-white bg-black justify-center gap-6 text-center">
      <h1 className=" capitalize font-semibold text-2xl ">
        <span className="text-blue-500">Buy</span> or{" "}
        <span className="text-blue-500">Rent</span> your dream car today!
      </h1>
      <p className=" max-w-lg">
        Looking for where to buy or sell a car? Explore our vast inventory of
        cars for sale or rent at unbeatable prices. Start your journey with us
        today and find the perfect vehicle for your needs
      </p>

      <div className="flex flex-row items-center gap-3">
        <button className="self-start md:self-auto bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition-colors whitespace-nowrap">
          View All
        </button>
        <p className="underline ">Explore Cars Rentals</p>
      </div>
      <div>
        <Image
          src="/images/hero.png"
          alt="Hero Image"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

export default Hero;
