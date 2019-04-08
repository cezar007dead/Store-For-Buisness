export default (state, action) => {
  debugger;
  switch (action.type) {
    case "currency":
      return {
        currency: action.payload
      };

    default:
      return state;
  }
};
