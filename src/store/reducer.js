import * as actionTypes from "./actions";

const initialState = {
  attributes: {
    str: 1,
    sta: 1,
    dex: 1,

  },
  availablePoints: 7,
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

    default:
      return state;
  }
};

export default reducer;
