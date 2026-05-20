import React from "react";
import CarCards from "./CarCards";

const TopPicks = () => {
  const cars = [
    {
      id: 1,
      name: "2022 Tesla Model 3",
      price: "$42,000",
      mileage: "15,000 miles",
      description:
        "Electric sedan with autopilot, full self-driving capability, and a sleek design. Perfect for eco-conscious drivers.",
      image: "/images/car1.png",
      featured: true,
    },
    {
      id: 2,
      name: "Rolls-Royce Ghost 2023",
      price: "$345,000",
      mileage: "5,000 miles",
      description:
        "2023 Rolls-Royce Ghost delivers luxury, V12 power, and advanced tech for a premium driving experience.",
      image: "/images/car2.png",
      featured: false,
    },
    {
      id: 3,
      name: "2021 BMW X5",
      price: "$55,000",
      mileage: "25,000 miles",
      description:
        "Electric sedan with autopilot, full self-driving capability, and a sleek design. Perfect for eco-conscious drivers.",
      image: "/images/car3.png",
      featured: false,
    },
  ];
  return (
    <div className="container  mx-auto">
      <div className="">
        <div className="flex py-6 flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 text-center md:text-left items-center md:items-start">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Top Picks for Cars <br />
            on <span className="text-[#1E90FF] ">Sale</span>
          </h2>

          <p className="text-gray-500 text-sm max-w-xs leading-relaxed mx-auto md:mx-0">
            Discover our best deals on cars for sale. Handpicked just for you,
            these cars come with excellent pricing and top quality.
          </p>

          <button className="bg-[#1E90FF] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1E90FF] transition-colors whitespace-nowrap mx-auto md:mx-0">
            View All
          </button>
        </div>

        <div className="flex px-4 flex-col md:flex-row gap-6">
          {cars.map((car) => (
            <CarCards key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
