import * as actionTypes from "./actionTypes";
import axios from "../../axios-saved";

export const addAttributes = name => {
  return {
    type: actionTypes.ADD_ATTRIBUTE,
    attributeName: name,
  };
};

export const removeAttributes = name => {
  return {
    type: actionTypes.REMOVE_ATTRIBUTE,
    attributeName: name,
  };
};

export const setAttributeValue = (name, value) => {
  // console.log(name, value)
  return {
    type: actionTypes.SET_ATTRIBUTES_VALUE,
    attributeName: name,
    attributeValue: value,
  };
};

export const setAttributes = attributes => {
  return {
    type: actionTypes.SET_ATTRIBUTES,
    attributes: attributes,
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
