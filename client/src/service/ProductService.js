import axios from "axios";
import * as global from "./serviceHelp";
var mainUrl = global.API_HOST_PREFIX + "/api/products";

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
let update = payload => {
  const config = {
    url: mainUrl,
    method: "PUT",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let getByPageIndexPageSizeType = (pageIndex, pageSize) => {
  const config = {
    url: mainUrl + "/" + pageIndex + "/" + pageSize,
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let getByPIndexSizeSearch = (pageIndex, pageSize, query) => {
  const config = {
    url: mainUrl + "/" + pageIndex + "/" + pageSize + "?query=" + query,
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

let getByUserId = userId => {
  const config = {
    url: mainUrl + "/userId/" + userId,
    method: "GET",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

let remove = id => {
  const config = {
    url: mainUrl + "/" + id,
    method: "DELETE",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};
export {
  add,
  update,
  getByPageIndexPageSizeType,
  getByPIndexSizeSearch,
  getById,
  getByUserId,
  remove
};
