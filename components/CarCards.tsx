import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Car = {
  name: string;
  price: string;
  mileage: string;
  description: string;
  image: string;
  featured: boolean;
};

export default function CarCards({ car }: { car: Car }) {
  return (
    <div className="group  cursor-pointer rounded-4xl shadow-lg p-6 flex-1 h-full flex flex-col justify-between transition-all duration-300 hover:bg-green-500">
      <div className="">
        {/* TOP ROW */}
        <div className="flex justify-between items-center">
          <h3 className="tracking-tighter transition-colors duration-300 group-hover:text-white">
            {car.name}
          </h3>

          {/* ICON CIRCLE */}
          <div className="bg-green-500 rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 group-hover:bg-white">
            <ArrowUpRight className="text-white transition-colors duration-300 group-hover:text-green-500" />
          </div>
        </div>

        {/* PRICE + MILEAGE */}
        <div className="flex justify-between items-center mt-3 w-full text-sm">
          <p className="transition-colors duration-300 group-hover:text-white">
            <span className="text-muted-foreground group-hover:text-white">
              Price
            </span>{" "}
            : {car.price}
          </p>

          <p className="transition-colors duration-300 group-hover:text-white">
            <span className="text-muted-foreground group-hover:text-white">
              Mileage
            </span>{" "}
            : {car.mileage}
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 text-muted-foreground transition-colors duration-300 group-hover:text-white">
          {car.description}
        </p>

        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden  group-hover:bg-green-500 mt-4">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
