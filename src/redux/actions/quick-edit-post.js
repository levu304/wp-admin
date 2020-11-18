export const setQuickEditInitState = (initState) => ({
  type: "SET_QUICK_EDIT_INIT_STATE",
  payload: { initState },
});

export const setQuickEditId = (id) => ({
  type: "SET_QUICK_EDIT_ID",
  payload: { id },
});

export const setQuickEditSticky = (sticky) => ({
  type: "SET_QUICK_EDIT_STICKY",
  payload: { sticky },
});

export const setQuickEditDate = (date) => ({
  type: "SET_QUICK_EDIT_DATE",
  payload: { date },
});

export const setQuickEditTitle = (title) => ({
  type: "SET_QUICK_EDIT_TITLE",
  payload: { title },
});

export const setQuickEditAuthor = (author) => ({
  type: "SET_QUICK_EDIT_AUTHOR",
  payload: { author },
});

export const setQuickEditSlug = (slug) => ({
  type: "SET_QUICK_EDIT_SLUG",
  payload: { slug },
});

export const setQuickEditPassword = (password) => ({
  type: "SET_QUICK_EDIT_PASSWORD",
  payload: { password },
});

export const setQuickEditStatus = (status) => ({
  type: "SET_QUICK_EDIT_STATUS",
  payload: { status },
});

export const setQuickEditCommentStatus = (comment_status) => ({
  type: "SET_QUICK_EDIT_COMMENT_STATUS",
  payload: { comment_status },
});

export const setQuickEditPingStatus = (ping_status) => ({
  type: "SET_QUICK_EDIT_PING_STATUS",
  payload: { ping_status },
});

export const setQuickEditTags = (tags) => ({
  type: "SET_QUICK_EDIT_TAGS",
  payload: { tags },
});

export const setQuickEditCategoriesList = (quickEditCategoriesList) => ({
  type: "SET_QUICK_EDIT_CATEGORIES_LIST",
  payload: { quickEditCategoriesList },
});
