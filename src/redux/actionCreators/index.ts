import { Dispatch } from "redux";
import { CurrentUser, UserAction, RecipeAction, Recipe } from "../actions";
import { ActionType } from "../actionTypes";

export const logIn = (userInfo: CurrentUser) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.LOG_IN,
            payload: userInfo
        });
    };
};
export const logOut = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.LOG_OUT
        });
    };
};

const API_URL = "http://localhost:3004/";

// export async function fetchRecipes() {
//     const response = await fetch(API_URL + "recipes");
//     dispatch({ type: ActionType.FETCH_RECIPES, payload: response });
// }

export const fetchRecipes = () => {
    return async function (dispatch: Dispatch) {
        dispatch(fetchRecipeRequest());
        try {
            const response = await fetch(API_URL + "recipes");
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            const recipes = await response.json();
            dispatch(fetchRecipeSuccess(recipes));
        } catch (error) {
            console.log(error);
            dispatch(fetchRecipeFail(error));
        }
    };
};

const fetchRecipeRequest = () => {
    return {
        type: ActionType.FETCH_RECIPES_REQUEST
    };
};
const fetchRecipeSuccess = (recipes: Recipe[]) => {
    return {
        type: ActionType.FETCH_RECIPES_SUCCESS,
        payload: recipes
    };
};
const fetchRecipeFail = (error: any) => {
    return {
        type: ActionType.FETCH_RECIPES_FAIL,
        payload: error
    };
};

export const addRecipe = (recipe: Recipe) => {
    return (dispatch: Dispatch<RecipeAction>) => {
        dispatch({
            type: ActionType.ADD_RECIPE,
            payload: recipe
        });
    };
};
