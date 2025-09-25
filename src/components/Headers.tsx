import Link from "next/link";
import { memo } from "react";

const Headers = () => {
  return (
    <div className="bg-blue-500">
      <div className="container flex gap-30 py-4 text-[20px] justify-center font-bold text-gray-300">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
      </div>
    </div>
  );
};

export default memo(Headers);
