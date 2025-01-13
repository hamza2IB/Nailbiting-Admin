'use client'
import React from 'react';

const OtpInput = ({ values, setFieldValue, error }) => {
  return (
    <div className="flex flex-1 space-x-2 ">
      {[0, 1, 2, 3, 4].map((index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={values.otp[index]}
          onChange={(e) => {
            const newOtp = [...values.otp];
            newOtp[index] = e.target.value.replace(/[^0-9]/g, "");
            setFieldValue("otp", newOtp);
            if (e.target.value && index < 4) {
              document.getElementById(`otp-${index + 1}`).focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !values.otp[index] && index > 0) {
              const newOtp = [...values.otp];
              newOtp[index - 1] = "";
              setFieldValue("otp", newOtp);
              document.getElementById(`otp-${index - 1}`).focus();
            }
          }}
          id={`otp-${index}`}
          className={`w-10 h-16 flex-1 sm:w-20 sm:h-20 text-center text-[#199A8E] text-[40px] border-2 ${
            values.otp[index] === "" && Object.keys(error).includes('otp') ? "border-red-500" : "border-[#199A8E]"
          } rounded-[8px] focus:outline-none`}
        />
      ))}
    </div>
  );
};

export default OtpInput;