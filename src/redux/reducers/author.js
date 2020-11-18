const initState = {
  authors: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_AUTHORS":
      return {
        ...state,
        authors: payload.authors,
      };
    default:
      return state;
  }
};
