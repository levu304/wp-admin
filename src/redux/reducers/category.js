const initState = {
  categories: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: payload.categories,
      };
    default:
      return state;
  }
};
