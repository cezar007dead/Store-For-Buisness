import axios from "axios";
var mainUrl = "https://api.exchangeratesapi.io/latest";

let getByType = CurrencyType => {
  const config = {
    url: `${mainUrl}?base=${CurrencyType}`,
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

export { getByType };
