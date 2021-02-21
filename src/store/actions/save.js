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

export const saveInit = () => {
  return {
    type: actionTypes.SAVE_INIT,
  };
};

export const fetchSaveSuccess = saves => {
  return {
    type: actionTypes.FETCH_SAVES_SUCCESS,
    saves: saves,
  };
};

export const fetchSaveFailed = error => {
  return {
    type: actionTypes.FETCH_SAVES_FAIL,
    error: error,
  };
};

export const fetchSaveStart = () => {
  return {
    type: actionTypes.FETCH_SAVES_START,
  };
};
export const fetchSaves = () => {
  return dispatch => {
    dispatch(fetchSaveStart());
    axios
      .get("/saves.json")
      .then(res => {
        const fetchedSaves = [];
        for (let key in res.data) {
          fetchedSaves.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchSaveSuccess(fetchedSaves));
      })
      .catch(err => {
        dispatch(fetchSaveFailed(err));
      });
  };
};
