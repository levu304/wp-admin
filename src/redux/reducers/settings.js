const initState = {
  toggleLoader: false,
  languages: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "TOGGLE_LOADER":
      return {
        ...state,
        toggleLoader: payload.toggle,
      };
    case "SET_LANGUAGES":
      return {
        ...state,
        languages: payload.languages,
      };
    default:
      return state;
  }
};
