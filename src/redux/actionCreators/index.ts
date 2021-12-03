import { Dispatch } from "redux";
import { CurrentUser, RecipeAction, Recipe } from "../actions";
import { ActionType } from "../actionTypes";

//LOGIN ACTION CREATORS
const API_URL = "http://localhost:3004/";

export const logIn = (credentials: { email: string; password: string }) => {
    return async function (dispatch: Dispatch) {
        dispatch(logInRequest());
        try {
            const response = await fetch(API_URL + "login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            const user = await response.json();
            console.log(user);
            dispatch(logInSuccess(user));
        } catch (error) {
            console.log(error);
            dispatch(logInFail(error));
        }
    };
};

const logInRequest = () => {
    return {
        type: ActionType.LOG_IN_REQUEST
    };
};
export const logInSuccess = (user: CurrentUser) => {
    return {
        type: ActionType.LOG_IN_SUCCESS,
        payload: user
    };
};
const logInFail = (error: any) => {
    return {
        type: ActionType.LOG_IN_FAIL,
        payload: error
    };
};

export const logOut = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.LOG_OUT
        });
    };
};

//RECIPES ACTION CREATORS
export const fetchRecipes = () => {
    return async function (dispatch: Dispatch) {
        dispatch(fetchRecipeRequest());
        try {
            const response = await fetch(API_URL + "recipes");
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                alert(message);
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
