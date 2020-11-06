import cookie from "react-cookies";

const initState = {
  user: cookie.load("user") | null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload.user,
      };
    default:
      return state;
  }
};
