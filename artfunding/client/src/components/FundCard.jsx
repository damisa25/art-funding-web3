import React from "react";
import { clown } from "../assets";
const FundCard = ({
  owner,
  title,
  desc,
  target,
  amountCollected,
  image,
  handleClick,
}) => {
  return (
    <div class="font-poppins sm:w-[288px] w-full rounded-[15px] bg-[#312c51]">
      {/* <div class="flex-none w-56 relative"> */}
      <img
        src={image}
        alt={`${image}_${title}`}
        class="w-full h-[188px] object-contain rounded-lg bg-[#b6b4c4]"
        loading="lazy"
      />
      {/* </div> */}
      <form class="flex-auto p-6">
        <div class="flex flex-wrap">
          <h1 class="flex-auto font-semibold text-[24px] text-[#f0c38e] truncate">
            {title}
          </h1>

          <button
            class="flex-none flex items-center justify-center w-9 h-9 rounded-full text-[#db6f5e] bg-violet-50"
            type="button"
            aria-label="Like"
          >
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
          {/* <div class="text-sm font-medium text-slate-400">In stock</div> */}
        </div>
        <h1 class="flex-auto font-normal mt-2 text-[14px] text-[#808191] truncate">
          {desc}
        </h1>
        {/* <div className="flex flex-col"> */}
        <div class="w-full flex-none mt-2 order-1 text-2xl font-bold text-[#f1aa9b]">
          {amountCollected}
        </div>
        <p className="text-[12px] text-[#808191] truncate">
          Raised of target {target}
        </p>
        {/* </div> */}
        <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div class="space-x-2 flex items-center text-sm font-bold truncate">
            <div className="w-9 h-9 rounded-full flex justify-center items-center bg-[#c9bfb4]">
              <img
                src={clown}
                alt="user"
                className="w-[60%] h-[60%] object-contain"
              ></img>
            </div>
            <p className="flex-1 font-normal text-[12px] text-[#808191] truncate">
              by <span className="text-[#b2b3bd] truncate">{owner}</span>
            </p>
          </div>
        </div>
        <div class="flex space-x-4 mb-5 text-sm font-medium">
          <div class="flex-auto flex space-x-4">
            <button
              class="w-full h-10 px-6 font-semibold rounded-full bg-[#f0c38e] text-[#312c51]"
              type="submit"
              onClick={handleClick}
            >
              Read more
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FundCard;
