import { Dispatch } from "redux";
import { CurrentUser, Recipe } from "../actions";
import { ActionType } from "../actionTypes";

//LOGIN ACTION CREATORS
const API_URL = "http://localhost:3004/";

export const logIn = (credentials: { email: string; password: string }) => {
    return async (dispatch: Dispatch) => {
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
            localStorage.setItem("pw", credentials.password);
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

export const postRecipe = (recipeArray: Recipe[], user: CurrentUser) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(API_URL + `users/${user.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    password: "admin1",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    recipes: recipeArray
                })
            });
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addRecipe = (recipeArray: Recipe[]) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.ADD_RECIPE,
            payload: recipeArray
        });
    };
};
