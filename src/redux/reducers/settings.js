const initState = {
  toggleLoader: false,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "TOGGLE_LOADER":
      return {
        ...state,
        toggleLoader: payload.toggle,
      };
    default:
      return state;
  }
};
