import React from "react";
import Image from "next/image";
export function ExerciseCard({ title, description, image, icon, onDelete }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105">
      <div className="relative  w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[210px] sm:h-full w-full object-cover"
        />
        <Image
          src={icon}
          alt="Delete Icon"
          width={26}
          height={26}
          className="p-1 bg-white rounded-[6px] cursor-pointer absolute top-2 right-2"
          onClick={onDelete}
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
