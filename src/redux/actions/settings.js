export const toggleLoader = (toggle) => ({
  type: "TOGGLE_LOADER",
  payload: { toggle },
});

export const setLanguages = (languages) => ({
  type: "SET_LANGUAGES",
  payload: { languages },
});
