import React from 'react';

const UserDetailShimmer = () => {
  return (
    <div className="bg-white rounded-lg shadow mb-[10px]">
      <div className="p-6 animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-6 max-w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 max-w-56 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 max-w-80 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailShimmer;