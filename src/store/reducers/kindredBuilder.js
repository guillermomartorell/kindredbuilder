import * as actionTypes from "../actions/actionTypes";

const initialState = {
  attributes: null,
  availablePoints: 7,
  error: false,
  // loading: false,
};

const ATTRIBUTES_PRICES = {
    str: 1,
    dex: 1,
    sta: 1,
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ATTRIBUTE:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.attributeName]: state.attributes[action.attributeName] + 1,
        },
        availablePoints: state.availablePoints - ATTRIBUTES_PRICES[action.attributeName]
      };
    case actionTypes.REMOVE_ATTRIBUTE:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.attributeName]: state.attributes[action.attributeName] - 1,
        },
        availablePoints: state.availablePoints + ATTRIBUTES_PRICES[action.attributeName]
      };
      case actionTypes.SET_ATTRIBUTES:
        return {
          ...state, 
          attributes: action.attributes,
          error: false
        }
      case actionTypes.FETCH_ATTRIBUTES_FAILED:
        return { 
          ...state,
          error: true
        }
    default:
      return state;
  }
};

export default reducer;
