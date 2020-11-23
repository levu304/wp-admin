const initState = {
  tags: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_TAGS":
      return {
        ...state,
        tags: payload.tags,
      };
    default:
      return state;
  }
};
