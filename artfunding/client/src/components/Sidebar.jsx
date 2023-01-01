import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useState } from "react";
import { navlinks } from "../constants/index";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#48426d]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2"></img>
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`p-[8px] ${
            isActive !== name ? "grayscale" : "grayscale-0"
          }`}
        ></img>
      )}
    </div>
  );
};
const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-center items-center flex-col sticky top-5 h-[93vh]">
      <Link to={"/"}>
        <Icon styles="w-[52px] h-[52px] bg-[#f0c38e]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#312c51] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.path);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
