import { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xBeEcB14C1F150EABc89c54C90E61F377Cd80281e"
  );
  const { mutateAsync: createEvent } = useContractWrite(
    contract,
    "createEvent"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishEvent = async (form) => {
    try {
      const data = await createEvent([
        address,
        form.title,
        form.desc,
        form.target,
        form.image,
      ]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getEvents = async () => {
    const events = await contract.call("getEvents");
    const parseEvents = events.map((d, i) => {
      return {
        owner: d.owner,
        title: d.title,
        desc: d.desc,
        target: ethers.utils.formatEther(d.target.toString()),
        amountCollected: ethers.utils.formatEther(d.amountCollected.toString()),
        image: d.image,
        pId: i,
      };
    });
    return parseEvents;
  };

  const getUserEvents = async () => {
    const allEvents = await getEvents();
    const filteredEvents = allEvents.filter((d) => d.owner === address);

    return filteredEvents;
  };

  const getOwnerEvents = async (owner) => {
    const allEvents = await getEvents();
    const filteredEvents = allEvents.filter((d) => d.owner === owner);

    return filteredEvents;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateEvent", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    console.log(donations);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createEvent: publishEvent,
        getEvents,
        getUserEvents,
        donate,
        getDonations,
        getOwnerEvents,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
