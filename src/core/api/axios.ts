import axios from "axios";

const apikey = process.env.REACT_APP_ICON_API;
const opt: string = `Bearer ${apikey}`;

export const axInstance = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    crossdomain: true,
    authorization: opt,
  },
});
