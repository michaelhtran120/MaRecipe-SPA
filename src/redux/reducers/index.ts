import { combineReducers } from "redux";
import userReducer from "./userReducer";

const reducers = combineReducers({
    user: userReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;
