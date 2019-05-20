export default (state, action) => {
  switch (action.type) {
    case "currency":
      return {
        currency: action.payload
      };

    default:
      return state;
  }
};
