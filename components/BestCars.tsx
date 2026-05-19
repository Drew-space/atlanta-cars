import React from "react";
import BestCarCards from "./BestCarCards";

const BestCars = () => {
  const cars = [
    {
      id: 1,
      name: "Mercedes-Benz-C-Class",
      price: "$42,000",
      mileage: "15,000 miles",

      image: "/images/car4.jpg",
      featured: true,
    },
    {
      id: 2,
      name: "2022 Audi Q7",
      price: "$345,000",
      mileage: "5,000 miles",

      image: "/images/car5.webp",
      featured: false,
    },
    {
      id: 3,
      name: "2021 Ford Mustang",
      price: "$55,000",
      mileage: "25,000 miles",

      image: "/images/car6.jpg",
      featured: false,
    },
  ];
  return (
    <div className="bg-black py-20 rounded-4xl mt-4 mx-1 md:mx-auto max-w-6xl">
      <div className="px-6 md:px-20 pt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Top Picks for Cars <br />
            on <span className="text-yellow-500">Sale</span>
          </h2>
          <p className="text-white text-sm max-w-xs leading-relaxed">
            Discover our best deals on cars for sale. Handpicked just for you,
            these cars come with excellent pricing and top quality.
          </p>
          <button className="self-start md:self-auto bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition-colors whitespace-nowrap">
            View All
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {cars.map((car) => (
            <BestCarCards key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestCars;
