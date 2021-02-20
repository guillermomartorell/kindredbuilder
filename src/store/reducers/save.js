import * as actionTypes from "../actions/actionTypes";

const initialState = {
  saves: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_KINDRED_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SAVE_KINDRED_SUCCESS:
      const newSave = {
        ...action.saveData,
        id: action.saveId,
      };
      return {
        ...state,
        loading: true,
        saves: state.saves.concat(newSave),
      };
    case actionTypes.SAVE_KINDRED_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
