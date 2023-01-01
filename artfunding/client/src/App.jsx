import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Profile, CreateEvent, EventDetails } from "./pages";
import { Navbar, Sidebar } from "./components";

const App = () => {
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#48426d90] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
