import React from "react";

const EvaluationShimmer = () => {
    return (
      <div className="animate-pulse">
     <div className="overflow-x-auto">
     <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-t text-[#475467] text-xs">
              <th className="py-4 px-6 text-left font-normal">
                <div className="h-6 bg-gray-200 rounded min-w-20 w-1/4"></div>
              </th>
              <th className="py-4 px-6 text-left font-normal">
                <div className="h-6 bg-gray-200 rounded  min-w-20 w-1/4"></div>
              </th>
              <th className="py-4 px-6 text-left font-normal">
                <div className="h-6 bg-gray-200 rounded  min-w-20 w-1/4"></div>
              </th>
              <th className="py-4 px-6 text-left font-normal">
                <div className="h-6 bg-gray-200 rounded min-w-20 w-1/4"></div>
              </th>
              <th className="py-4 px-6 text-center ml-20 font-normal">
                <div className="h-6 bg-gray-200 rounded min-w-20 w-1/4"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b last:border-b-0 text-sm">
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded  min-w-20 w-1/4"></div>
                </td>
                <td className="py-4 px-6 flex justify-center items-center max-w-32">
                  <div className="h-4 bg-gray-200 rounded  min-w-20 w-1/4"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded  min-w-20 w-1/4"></div>
                </td>
                <td className="py-4 px-6 flex justify-center items-center max-w-28">
                  <div className="h-4 bg-gray-200 rounded min-w-20 w-1/4"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <div className="h-4 bg-gray-200 rounded min-w-20 w-1/4"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
      </div>
    );
};

export default EvaluationShimmer;