import * as actionTypes from "./actionTypes";
import axios from "../../axios-saved";

export const saveKindredSuccess = (id, saveData) => {
  return {
    type: actionTypes.SAVE_KINDRED_SUCCESS,
    saveId: id,
    saveData: saveData,
  };
};

export const saveKindredFailed = error => {
  return {
    type: actionTypes.SAVE_KINDRED_FAILED,
    error: error,
  };
};
export const saveKindredStart = () => {
  return {
    type: actionTypes.SAVE_KINDRED_START,
  };
};
export const saveKindred = saveData => {
  return dispatch => {
    dispatch(saveKindredStart());
    axios
      .post("/saves.json", saveData)
      .then(response => {
        console.log(response.data);
        dispatch(saveKindredSuccess(response.data.name, saveData));
      })
      .catch(error => {
        dispatch(saveKindredFailed(error));
      });
  };
};
