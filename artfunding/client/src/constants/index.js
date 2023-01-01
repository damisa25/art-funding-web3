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
    name: "dashboard",
    imgUrl: dashboard,
    path: "/",
  },
  {
    name: "campaign",
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
    name: "profile",
    imgUrl: profile,
    path: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    path: "/logout",
    disabled: true,
  },
];
