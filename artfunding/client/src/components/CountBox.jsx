import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="font-poppins flex flex-col items-center w-full">
      <h4 className="font-bold text-[30px] text-[#f0c38e] p-3 bg-[#312c51] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-normal text-[16px] text-[#f0f1da] px-3 py-2 bg-[#48426d] rounded-b-[10px] w-full text-center truncate">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
