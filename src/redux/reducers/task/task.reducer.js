import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/task.actionType";

const INITIAL_STATE = {
  list: null,
  isLoadingList: false,
  errorList: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_LOADING:
      return {
        list: null,
        isLoadingList: true,
        errorList: "",
      };
    case GET_LIST:
      return {
        list: action.payload,
        isLoadingList: false,
        errorList: "",
      };
    case GET_LIST_ERROR:
      return {
        ...state,
        isLoadingList: false,
        errorList: action.payload,
      };
    default:
      return state;
  }
};
