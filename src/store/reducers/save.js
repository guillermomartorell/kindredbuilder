import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  saves: [],
  loading: false,
  saved: false,
};

const saveInit = (state, action) => {
  return updateObject(state, { saved: false });
};
const saveKindredStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const saveKindredSuccess = (state, action) => {
  const newSave = updateObject(action.saveData, { id: action.saveId });
  return updateObject(state, {
    loading: true,
    saved: true,
    saves: state.saves.concat(newSave),
  });
};
const saveKindredFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchSavesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchSavesSuccess = (state, action) => {
  return updateObject(state, { saves: action.saves, loading: false });
};

const fetchSavesFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_INIT:return saveInit(state, action);
    case actionTypes.SAVE_KINDRED_START:return saveKindredStart(state, action);
    case actionTypes.SAVE_KINDRED_SUCCESS:return saveKindredSuccess(state, action);
    case actionTypes.SAVE_KINDRED_FAILED:return saveKindredFailed(state, action);
    case actionTypes.FETCH_SAVES_START:return fetchSavesStart(state, action);
    case actionTypes.FETCH_SAVES_SUCCESS:return fetchSavesSuccess(state, action);
    case actionTypes.FETCH_SAVES_FAIL:return fetchSavesFailed(state, action);
    default:return state;
  }
};

export default reducer;
