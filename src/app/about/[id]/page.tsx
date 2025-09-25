import { IProduct } from "@/types";
import { Metadata } from "next";
import { memo } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 * 60 },
  });
  const product: IProduct = await res.json();

  return {
    title: `${product.title} | Product Details`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.thumbnail }],
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products?limit=50", {
    next: { revalidate: 60 * 5 },
  });
  const data = await res.json();
  return data.products.map((p: IProduct) => ({ id: p.id.toString() }));
}

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 * 5 },
  });

  if (!res.ok) throw new Error("Ma'lumotni yuklashda xatolik!");

  const product: IProduct = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex-1 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[500px] object-center rounded-xl"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-2xl font-semibold text-red-500">${product.price}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Details);
