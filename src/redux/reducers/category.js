const initState = {
  categories: [],
  allCategories: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: payload.categories,
      };
    case "SET_ALL_CATEGORIES":
      return {
        ...state,
        allCategories: payload.categories,
      };
    default:
      return state;
  }
};
