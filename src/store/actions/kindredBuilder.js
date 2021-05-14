import * as actionTypes from "./actionTypes";
import axios from "../../axios-saved";

export const setAttributes = attributes => {
  return {
    type: actionTypes.SET_ATTRIBUTES,
    attributes: attributes,
  };
};

export const setAttributeValue = (name, value) => {

  return {
    type: actionTypes.SET_ATTRIBUTES_VALUE,
    attributeName: name,
    attributeValue: value,
  };
};

export const fetchAttributesFailed = () => {
  return {
    type: actionTypes.FETCH_ATTRIBUTES_FAILED,
  };
};

export const initAttributes = () => {
  return dispatch => {
    axios
      .get("https://react-kindred-default-rtdb.firebaseio.com/attributes.json")
      .then(response => {
        dispatch(setAttributes(response.data));
      })
      .catch(error => {
        dispatch(fetchAttributesFailed());
      });
  };
};
