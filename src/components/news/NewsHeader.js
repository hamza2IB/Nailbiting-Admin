
export default function NewsHeader({ title, description }) {
  return (
    <div className="flex flex-wrap items-start justify-between">
      <div>
        <h1 className="text-[30px] font-semibold text-gray-900 mb-1">
          {title}
        </h1>

        <p className=" text-[#475467] mb-6">{description}</p>
      </div>
     
    </div>
  );
}
