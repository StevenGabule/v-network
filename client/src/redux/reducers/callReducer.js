import { GLOBAL_TYPES } from "../actions/globalTypes";

const initialState = null;

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.CALL:
      return action.payload;
    default:
      return state;
  }
}

export default callReducer;