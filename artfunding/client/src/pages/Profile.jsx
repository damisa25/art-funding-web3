import { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayEvents } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { address, contract, getUserEvents } = useStateContext();

  const fetchEvents = async () => {
    setIsLoading(true);
    const data = await getUserEvents();
    setEvents(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchEvents();
  }, [address, contract]);
  return (
    <DisplayEvents title="My Artworks" isLoading={isLoading} events={events} />
  );
};

export default Profile;
