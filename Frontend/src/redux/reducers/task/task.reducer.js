import {
  GET_LIST,
  GET_ONE_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
  GET_ONE_LIST_LOADING,
  GET_ONE_LIST_ERROR,
  LOADING_SUCCESS,
  SUCCESS,
  RESET_SUCCESS,
} from "../../actionTypes/task.actionType";

const INITIAL_STATE = {
  list: null,
  listOne: null,
  isLoadingList: false,
  isLoadingListOne: false,
  errorList: "",
  isLoadingSuccess: false,
  success: null,
};

const state = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_LOADING:
      return {
        isLoadingList: true,
        errorList: "",
      };
      case GET_ONE_LIST_LOADING:
      return {
        isLoadingListOne: true,
        errorList: "",
      };
    case GET_LIST:
      return {
        list: action.payload,
        isLoadingList: false,
        errorList: "",
      };
    case GET_ONE_LIST:
      return {
        listOne: action.payload,
        isLoadingListOne: false,
        errorList: "",
      };
    case GET_LIST_ERROR:
      return {
        ...state,
        isLoadingList: false,
        errorList: action.payload,
      };
      case GET_ONE_LIST_ERROR:
      return {
        ...state,
        isLoadingListOne: false,
        errorList: action.payload,
      };
    case LOADING_SUCCESS:
      return {
        isLoadingSuccess: true,
      };
    case SUCCESS:
      return {
        isLoadingSuccess: false,
        success: action.payload,
      };
    case RESET_SUCCESS:
      return {
        isLoadingSuccess: false,
        success: null,
      };
    default:
      return state;
  }
};

export default state;
