import React from 'react';

const PhotosShimmer = () => {
  return (
    <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-square h-[250px] sm:h-full w-full bg-gray-300 animate-pulse rounded-lg"
        >
        </div>
      ))}
    </div>
  );
};

export default PhotosShimmer;