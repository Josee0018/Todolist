import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  LOADING_SUCCESS,
  SUCCESS,
  RESET_SUCCESS,
  GET_ONE_LIST,
  GET_ONE_LIST_LOADING,
  GET_ONE_LIST_ERROR
} from "../../actionTypes/task.actionType";
const axios = require("axios").default;

export const getTasks = () => async (dispatch) => {
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    let res = await axios.get("http://localhost:8080/api/tasks");
    let data = await res.data;
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
export const getOneTask = (formData) => async (dispatch) => {
  dispatch({
    type: GET_ONE_LIST_LOADING,
  });
  try {
    // console.log(formData);
    let res = await axios.get(`http://localhost:8080/api/tasks/${formData._id}`);
    let data = await res.data;
    console.log(data);
    dispatch({
      type: GET_ONE_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ONE_LIST_ERROR,
      payload: error,
    });
  }
};
export const getOneTask2 = (formData) => async (dispatch) => {
console.log('en');

}



export const resetSuccess = (formData) => async (dispatch) => {
  dispatch({
    type: RESET_SUCCESS,
  });
};
export const createTask = (formData) => async (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  try {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      data: JSON.stringify(formData),
    };
    const res = await axios("http://localhost:8080/api/tasks", options);
    const data = await res.data;

    dispatch({
      type: SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.statusText || "Ocurrió un error");
  }
};

export const updateTask = (formData, id) => async (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  try {
    let options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      data: JSON.stringify(formData),
    };
    const res = await axios(`http://localhost:8080/api/tasks/${id}`, options);
    const data = await res.data;

    dispatch({
      type: SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err.statusText || "Ocurrió un error");
  }
};
