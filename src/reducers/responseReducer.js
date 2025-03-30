const initialState = {
  success: false,
  error: false,
  message: "",
};

const actionTypes = {
  SET_SUCCESS: "SET_SUCCESS",
  SET_ERROR: "SET_ERROR",
  RESET_RESPONSE: "RESET_RESPONSE",
};

function responseReducer(state, action) {
  switch (action.type) {
    case "SET_SUCCESS":
      return { success: true, error: false, message: action.payload };

    case "SET_ERROR":
      return { success: false, error: true, message: action.payload };

    case "RESET_RESPONSE":
      return initialState;

    default:
      return state;
  }
}

export { initialState, responseReducer, actionTypes };
