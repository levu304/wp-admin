const initState = {
  roles: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_ROLES":
      return {
        ...state,
        roles: payload.roles,
      };
    default:
      return state;
  }
};
