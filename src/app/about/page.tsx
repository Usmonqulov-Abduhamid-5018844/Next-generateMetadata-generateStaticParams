import { IProduct } from "@/types";
import Link from "next/link";
import { memo } from "react";

const About = async () => {
  const respons = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 60 * 5 },
  });
  const data = await respons.json();

  return (
    <section className="container mx-auto mt-16 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.products?.map((item: IProduct) => (
          <div
            key={item.id}
            className="group bg-white border border-gray-100 rounded-2xl
                       shadow-md hover:shadow-xl transition-transform duration-300
                       hover:-translate-y-2 overflow-hidden"
          >
            <div className="h-[370px] w-full overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-center
                           group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h2>
              <p className="text-lg font-bold text-red-500">{item.price} $</p>
              <p
                title={item.description}
                className="text-gray-600 text-sm flex leading-relaxed line-clamp-3"
              >
                {item.description}
              </p>
             <Link href={`about/${item.id}`}>
              <button
                className="mt-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
                           text-white py-2 px-4 text-sm font-medium
                           hover:from-indigo-600 hover:to-purple-600 transition"
              >
                View Details
              </button>
             </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(About);
