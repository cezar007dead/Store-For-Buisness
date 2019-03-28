import axios from "axios";
import * as global from "./serviceHelp";
var mainUrl = global.API_HOST_PREFIX + "/api/users";

let login = payload => {
  const config = {
    url: mainUrl + "/login",
    data: payload,
    method: "POST",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
let logout = () => {
  const config = {
    url: mainUrl + "/logout",
    method: "POST",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
let current = () => {
  const config = {
    url: mainUrl + "/current",
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let register = payload => {
  const config = {
    url: mainUrl + "/register",
    data: payload,
    method: "POST",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
export { login, logout, current, register };
