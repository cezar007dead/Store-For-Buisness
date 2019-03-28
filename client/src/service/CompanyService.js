import axios from "axios";
import * as global from "./serviceHelp";
var mainUrl = global.API_HOST_PREFIX + "/api/company";

let add = payload => {
  const config = {
    url: mainUrl,
    method: "POST",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let getByUserId = id => {
  const config = {
    url: mainUrl + "/user/" + id,
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let getById = id => {
  const config = {
    url: mainUrl + "/" + id,
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
export { add, getByUserId, getById };
