const initState = {
  statuses: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_POST_STATUSES":
      return {
        ...state,
        statuses: payload.statuses,
      };
    default:
      return state;
  }
};
