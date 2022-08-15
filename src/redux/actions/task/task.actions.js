import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/task.actionType";

export const getTasks = () => async (dispatch) => {
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const data = JSON.parse(localStorage.getItem("tasks"));
    dispatch({
      type: GET_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_ERROR,
      payload: error,
    });
  }
};
