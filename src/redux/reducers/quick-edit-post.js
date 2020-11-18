const initState = {
  id: null,
  title: "",
  slug: "",
  password: "",
  status: "",
  comment_status: "",
  ping_status: "",
  tags: "",
  author: "",
  date: new Date(),
  sticky: false,
  quickEditCategoriesList: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_QUICK_EDIT_ID":
      return {
        ...state,
        id: payload.id,
      };
    case "SET_QUICK_EDIT_STICKY":
      return {
        ...state,
        sticky: payload.sticky,
      };
    case "SET_QUICK_EDIT_DATE":
      return {
        ...state,
        date: payload.date,
      };
    case "SET_QUICK_EDIT_TITLE":
      return {
        ...state,
        title: payload.title,
      };
    case "SET_QUICK_EDIT_AUTHOR":
      return {
        ...state,
        author: payload.author,
      };
    case "SET_QUICK_EDIT_SLUG":
      return {
        ...state,
        slug: payload.slug,
      };
    case "SET_QUICK_EDIT_PASSWORD":
      return {
        ...state,
        password: payload.password,
      };
    case "SET_QUICK_EDIT_STATUS":
      return {
        ...state,
        status: payload.status,
      };
    case "SET_QUICK_EDIT_COMMENT_STATUS":
      return {
        ...state,
        comment_status: payload.comment_status,
      };
    case "SET_QUICK_EDIT_PING_STATUS":
      return {
        ...state,
        ping_status: payload.ping_status,
      };
    case "SET_QUICK_EDIT_TAGS":
      return {
        ...state,
        tags: payload.tags,
      };
    case "SET_QUICK_EDIT_CATEGORIES_LIST":
      return {
        ...state,
        quickEditCategoriesList: payload.quickEditCategoriesList,
      };
    case "SET_QUICK_EDIT_INIT_STATE":
      return {
        ...state,
        ...payload.initState,
      };
    default:
      return state;
  }
};
