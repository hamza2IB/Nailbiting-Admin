"use client";

import React from 'react';

const UserRightShimmer = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-[660px] overflow-hidden overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="bg-gray-300 h-8 w-48 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-10 w-10 rounded-full animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="p-5 ">
          {/* First Question */}
          <div className="space-y-4 py-6 pb-12">
            <div className="bg-gray-300 h-6 w-3/4 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse"></div>
            <div className="flex items-center gap-2 border-b pb-[18px]">
              <div className="bg-gray-300 h-4 w-1/4 rounded-md animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-1/12 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Second Question */}
          <div className="space-y-4 mb-6 pt-6">
            <div className="bg-gray-300 h-6 w-3/4 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-full rounded-md animate-pulse"></div>
            <div className="flex items-center gap-2 border-b pb-[18px]">
              <div className="bg-gray-300 h-4 w-1/4 rounded-md animate-pulse"></div>
              <div className="flex gap-2 ml-3">
                <div className="bg-gray-300 h-4 w-4 rounded-md animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-4 rounded-md animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-4 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-lg flex gap-4 overflow-hidden overflow-x-auto">
            <div className="bg-gray-300 h-80 w-full rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRightShimmer;