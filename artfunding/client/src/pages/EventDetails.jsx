import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { useState } from "react";
import { calculateBarPercentage } from "../utils";
import { CountBox, CustomButton, Loader } from "../components";
import { clown } from "../assets";
import { useEffect } from "react";
import { saveAs } from "file-saver";

const EventDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, getOwnerEvents } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  const fetchEvents = async () => {
    const data = await getOwnerEvents(state.owner);
    setUserEvents(data);
  };

  useEffect(() => {
    if (contract) {
      fetchEvents();
      fetchDonators();
    }
  }, [contract, address]);

  const handleDonate = async () => {
    if (address) {
      setIsLoading(true);
      await donate(state.pId, amount);
      saveAs(state.image, `${state.title}.png`);
      navigate("/");
      setIsLoading(false);
    } else alert("Please connect your wallet.");
  };
  return (
    <div>
      {isLoading && <Loader label="Transaction is in progress" />}
      <div className="w-full flex md:flex-row flex-col my-10 gap-[30px]">
        <div className="flex-1 flex-col">
          {/* <div className="bg-[808080]"> */}
          <img
            src={state.image}
            alt="event_image"
            className="w-full h-[410px] object-contain rounded-xl bg-[#b6b4c4]"
          />
          <div className="relative w-full h-[5px] bg-[#fcf1da] mt-2 rounded-[8px]">
            <div
              className="absolute h-full bg-[#48426d] rounded-[8px]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full justify-between gap-[30px]">
        <CountBox
          title={`Raised of ${state.target}`}
          value={state.amountCollected}
        />
        <CountBox title={`Total Downloader`} value={donators.length} />
        {/* <CountBox title={`Total Likes`} value={donators.length} /> */}
      </div>

      {/* <div className="w-full bg-[#48426d] rounded-[10px] p-3"> */}
      <div className="mt-[60px] flex lg:flex-row flex-col gap-9">
        <div className="flex-[2] flex flex-col gap-[40px] font-poppins">
          <div>
            <h4 className="font-semibold text-[18px] text-[#312c51] uppercase">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center gap-[14px]">
              <div className="w-[52px] h-[52px] rounded-full flex justify-center items-center bg-[#c9bfb4] cursor-pointer">
                <img
                  src={clown}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                ></img>
              </div>
              <div className="font-poppins">
                <h4 className="font-semibold text-[16px] text-[#48426d] break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-normal text-[12px] text-gray-600">{`(${
                  userEvents?.length ?? 0
                } Artworks)`}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-[#312c51] uppercase">
              Story
            </h4>
            <div className="mt-[20px] bg-[#312c51] p-4 text-center rounded-[10px]">
              <p className="font-normal text-[18px] text-[#ecd7ab] leading-[26px] italic">
                {`'' ${state.desc} . . .''`}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-[#312c51] uppercase">
              Downloader
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((d, i) => (
                  <div
                    key={`${d.donator}-${i}`}
                    className="flex flex-row items-center gap-[14px]"
                  >
                    <div className="bg-[#c4ccff] rounded-[8px] p-2 max-w-[80px] text-center">
                      <p className="font-semibold text-[12px] text-[#312c51] leading-[22px]">{`ETH ${d.donation}`}</p>
                    </div>

                    <h4 className="font-semibold text-[14px] text-[#48426d] break-all">
                      {d.donator}
                    </h4>
                  </div>
                ))
              ) : (
                <p className="font-normal text-[16px] text-[#48426d] leading-[26px]">
                  {`No downloader yet, Be the first one!`}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 font-poppins">
          <h4 className="font-semibold text-[18px] text-[#312c51] uppercase">
            Support & Download
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#f0c28e] rounded-[10px]">
            <p className="font-medium text-[20px] leading-[30px] text-center text-[#48426d]">
              {"Fund (ETH) to download"}
            </p>
            <div className="mt-[30px]">
              <input
                type={"number"}
                placeholder="Enter amount of fund (ETH)"
                step={"0.01"}
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#48426d] bg-transparent text-[#48426d] text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#fcf1da] rounded-[10px] text-[#bb8a52]">
                <h4 className="font-semibold text-[14px] leading-[22px]">
                  Art is too important not to share.
                </h4>
                <p className="mt-[10px] font-normal text-[14px] leading-[22px] text-[#b98d5cc9]">
                  If you like it, support it.
                </p>
              </div>
              <CustomButton
                btnType={"button"}
                title="Fund Artwork"
                styles={"w-full bg-[#48426d] text-[#fcf1da]"}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default EventDetails;
