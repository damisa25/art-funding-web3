import { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayEvents } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { address, contract, getEvents } = useStateContext();

  const fetchEvents = async () => {
    setIsLoading(true);
    const data = await getEvents();
    setEvents(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchEvents();
  }, [address, contract]);
  return (
    <>
      <DisplayEvents
        title="All Artworks"
        isLoading={isLoading}
        events={events}
      />
    </>
  );
};

export default Home;
