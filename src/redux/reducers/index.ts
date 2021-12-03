import { combineReducers } from "redux";
import userLoginReducer from "./userLoginReducer";
import recipeReducer from "./recipesReducer";

const reducers = combineReducers({
    user: userLoginReducer,
    recipes: recipeReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;
