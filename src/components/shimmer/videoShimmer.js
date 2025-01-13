// admin/src/components/shimmer/videoShimmer.js
import React from "react";

const Shimmer = () => (
  <div className="relative overflow-x-auto rounded-md">
    <table className="min-w-[700px] w-full border-collapse text-sm">
      <thead>
        <tr className="border-b bg-white border-gray-200 text-left">
          <th className="px-6 py-4 font-medium w-10">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          </th>
          <th className="px-6 py-4 font-medium w-10">
            <div className="h-4 bg-gray-200 rounded w-10 mb-2"></div>
          </th>
          <th className="px-6 py-4 font-medium w-10">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          </th>
          <th className="px-6 py-4 font-medium text-right w-10">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {Array.from({ length: 5 }).map(
          (
            _,
            index // Adjust the number of rows as needed
          ) => (
            <tr key={index} className="border-b border-gray-200 bg-white">
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

export default Shimmer;
