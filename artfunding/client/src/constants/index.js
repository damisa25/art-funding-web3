import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: dashboard,
    path: "/",
  },
  {
    name: "Artwork",
    imgUrl: createCampaign,
    path: "/create-event",
  },
  //   {
  //     name: "payment",
  //     imgUrl: payment,
  //     path: "/",
  //     disabled: true,
  //   },
  //   {
  //     name: "withdraw",
  //     imgUrl: withdraw,
  //     path: "/",
  //     disabled: true,
  //   },
  {
    name: "Profile",
    imgUrl: profile,
    path: "/profile",
  },
  {
    name: "Logout",
    imgUrl: logout,
    path: "/logout",
    disabled: true,
  },
];
