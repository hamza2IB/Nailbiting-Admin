"use client";
import Image from "next/image";

export default function NewsShimmer() {
  return (
    <div className="py-[18px] px-8 bg-white border relative rounded-[10px] animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between w-full">
          <div className="w-full max-w-40">
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <Image
            className="cursor-pointer"
            src="/svgs/auth/threedots.svg"
            alt="Loading"
            width={18}
            height={18}
          />
        </div>
        <div className="h-2 bg-gray-200 rounded w-full mt-1"></div>
        <div className="h-2 bg-gray-200 rounded w-full mt-1"></div>
        <div className="h-2 bg-gray-200 rounded w-full mt-1"></div>
      </div>
    </div>
  );
}
