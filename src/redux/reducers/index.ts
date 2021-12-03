import { combineReducers } from "redux";
import userReducer from "./userReducer";
import recipeReducer from "./recipesReducer";

const reducers = combineReducers({
    user: userReducer,
    recipes: recipeReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;
