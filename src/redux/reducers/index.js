import { combineReducers } from "redux";
import taskReducer from "./task/task.reducer";

const rootReducers = combineReducers({
  taskReducer,
});

export default rootReducers;
