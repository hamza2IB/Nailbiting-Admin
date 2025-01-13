"use client";
export default function UsersShimmer() {
  return (
    <div>

      <div className="md:w-full w-[100%] max-h-[600px] overflow-auto mt-0">
      <table className="w-full border-collapse">
        <thead className="bg-white">
          <tr className="border-b text-[#475467] text-sm">
            <th className="px-4 py-4 text-left rounded-tl-2xl">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </th>
            <th className="px-4 py-4 text-left min-w-[100px] font-normal">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </th>
            <th className="px-4 py-4 text-left min-w-[100px] font-normal">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </th>
            <th className="px-4 py-4 text-left min-w-[100px] font-normal">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </th>
            <th className="px-4 py-4 text-left min-w-[150px] font-normal">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </th>
            <th className="px-4 py-4 text-center min-w-[150px] font-normal rounded-tr-2xl">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className={"bg-white border-b"}>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2 min-w-[200px]">
                  <div className="animate-pulse bg-gray-200 h-10 w-10 rounded-full"></div>
                  <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="flex justify-center gap-2">
                  <div className="animate-pulse bg-gray-200 h-5 w-5 rounded"></div>
                  <div className="animate-pulse bg-gray-200 h-5 w-5 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}