import * as service from "../../service/CurrencyService";

export const getCurrencyAction = data => {
  return { type: "currency", payload: data };
};

export const getCurrencyActionAsnc = currencyType => {
  debugger;
  return dispach => {
    debugger;
    let currencyData = JSON.parse(localStorage.getItem("currencyData"));
    let date = localStorage.getItem("date");

    if (currencyData !== null) {
      if (Date.now() - date <= 43200000) {
        dispach(getCurrencyAction(currencyData));
      } else {
        service
          .getByType(currencyType)
          .then(response => {
            localStorage.setItem("date", Date.now());
            localStorage.setItem("currencyData", JSON.stringify(response.data));

            dispach(getCurrencyAction(response.data));
          })
          .catch();
      }
    } else {
      service
        .getByType(currencyType)
        .then(response => {
          localStorage.setItem("date", Date.now());
          localStorage.setItem("currencyData", JSON.stringify(response.data));

          dispach(getCurrencyAction(response.data));
        })
        .catch();
    }
  };
};
