import React from "react";

const FormField = ({
  label,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {label && (
        <span className="font-poppins font-medium text-[14px] leading-[22px] text-[#f0c38e] mb-[10px]">
          {label}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#312c51] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#312c51] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#312c51] bg-transparent font-poppins text-white text-[14px] placeholder:text-[#312c51] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
