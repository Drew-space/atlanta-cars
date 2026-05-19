import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Car = {
  name: string;
  price: string;
  mileage: string;

  image: string;
  featured: boolean;
};

export default function BestCarCards({ car }: { car: Car }) {
  return (
    <div className="group  text-white p-2 cursor-pointer rounded-4xl shadow-lg w-90 h-97 flex flex-col justify-between transition-all duration-300  bg-white">
      {/* TOP ROW */}

      <div className="relative w-full h-45  pb-2 pt-6 px-6  rounded-2xl overflow-hidden  group-hover:bg-[#04995b] mt-4">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover  transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className=" mt-3 rounded-4xl py-6 px-6 w-full bg-[#04995b] ">
        <div className="flex justify-between items-center">
          <h3 className="tracking-tighter  group-hover:text-white transition-colors duration-300 ">
            {car.name}
          </h3>

          {/* ICON CIRCLE */}
          <div className=" rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 bg-white ">
            <ArrowUpRight className=" transition-colors duration-300  text-green-500" />
          </div>
        </div>

        {/* PRICE + MILEAGE */}
        <div className="flex justify-between items-center mt-3 w-full text-sm">
          <p className="transition-colors duration-300 group-hover:text-white ">
            <span className=" text-white ">Price</span> : {car.price}
          </p>

          <p className="transition-colors duration-300 group-hover:text-white ">
            <span className="text-white ">Mileage</span> : {car.mileage}
          </p>
        </div>
      </div>
    </div>
  );
}
