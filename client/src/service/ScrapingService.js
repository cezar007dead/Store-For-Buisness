import axios from "axios";
import * as global from "./serviceHelp";
var mainUrl = global.API_HOST_PREFIX + "/api/scraping";

let get = () => {
  const config = {
    url: mainUrl,
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
let getAliexpress = query => {
  const config = {
    url: mainUrl + "/aliexpress?query=" + query,
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

export { get, getAliexpress };
