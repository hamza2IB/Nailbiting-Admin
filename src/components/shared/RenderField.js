import { Field } from "formik";

const RenderField = ({ id, label, name, type, placeholder, error, className }) => (
  <div className={`relative ${className}`}>
    <label htmlFor={id} className={`block mb-[6px] text-sm text-[#344054] ${label ? '' : 'hidden'}`}>
      {label}
    </label>
    
    <Field
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full px-[14px] py-[10px] border rounded-[8px] placeholder:text-[#667085]  ${
        error ? "border-red-500" : "border-[#D0D5DD]"
      } focus:outline-none`}
    />
    {error && <p className="text-xs text-red-500 absolute -bottom-[20px] left-0">{error}</p>}
  </div>
);

export default RenderField;