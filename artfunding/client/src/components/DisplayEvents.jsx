import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
import Loader from "./Loader";

const DisplayEvents = ({ title, isLoading, events }) => {
  const navigate = useNavigate();
  const handleNavigate = (event) => {
    navigate(`/events/${event.title}`, { state: event });
  };
  return (
    <div>
      <h1 className="font-poppins font-semibold text-[18px] text-[#312c51] text-left">
        {`${title} (${events.length})`}
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <Loader label="Data is loading" />}

        {!isLoading && events.length === 0 && (
          <p className="font-poppins font-semibold text-[14px] leading-[30px] text-[#48426d]">
            You have not create any artworks yet.
          </p>
        )}

        {!isLoading &&
          events.length > 0 &&
          events.map((d) => (
            <FundCard key={d.id} {...d} handleClick={() => handleNavigate(d)} />
          ))}
      </div>
    </div>
  );
};

export default DisplayEvents;
