import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  attributes: null,
  availablePoints: 7,
  error: false,
};

const ATTRIBUTES_PRICES = {
  str: 1,
  dex: 1,
  sta: 1,
};

const addAttribute = (state, action) => {
  const updatedAttribute = {
    [action.attributeName]: state.attributes[action.attributeName] + 1,
  };
  const updatedAttributes = updateObject(state.attributes, updatedAttribute);
  const updatedState = {
    attributes: updatedAttributes,
    availablePoints:
      state.availablePoints - ATTRIBUTES_PRICES[action.attributeName],
  };
  return updateObject(state, updatedState);
};

const removeAttribute = (state, action) => {
  const updatedAtt = {
    [action.attributeName]: state.attributes[action.attributeName] - 1,
  };
  const updatedAtts = updateObject(state.attributes, updatedAtt);
  const updatedSt = {
    attributes: updatedAtts,
    availablePoints:
      state.availablePoints - ATTRIBUTES_PRICES[action.attributeName],
  };
  return updateObject(state, updatedSt);
};

const setAttributes = (state, action) => {
  return updateObject(state, {
    attributes: action.attributes,
    availablePoints: 7,
    error: false,
  });
};

const fetchAttributesFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ATTRIBUTE:
      return addAttribute(state, action);
    case actionTypes.REMOVE_ATTRIBUTE:
      return removeAttribute(state, action);
    case actionTypes.SET_ATTRIBUTES:
      return setAttributes(state, action);
    case actionTypes.FETCH_ATTRIBUTES_FAILED:
      return fetchAttributesFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
