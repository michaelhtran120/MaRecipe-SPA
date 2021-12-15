import { Dispatch } from "redux";
import { CurrentUser, Recipe, UserInfo } from "../actions";
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
            dispatch(logInSuccess(user));
            localStorage.setItem("user", JSON.stringify(user));
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

export const postRecipe = (recipeArray: Recipe[], user: UserInfo["userInfo"], toggleModal: () => void) => {
    return async (dispatch: any) => {
        try {
            const response = await fetch(API_URL + `users/${user.user.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    email: user.user.email,
                    password: localStorage.getItem("pw"),
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                    recipes: recipeArray
                })
            });
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            dispatch(updateRecipes(recipeArray));
            alert("Your recipes have been updated/posted!");
            user.user.recipes = recipeArray;
            localStorage.setItem("user", JSON.stringify(user));
            toggleModal();
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };
};

export const deleteRecipe = (recipeArray: Recipe[], user: UserInfo["userInfo"], navigate: void) => {
    return async (dispatch: any) => {
        try {
            const response = await fetch(API_URL + `users/${user.user.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    email: user.user.email,
                    password: localStorage.getItem("pw"),
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                    recipes: recipeArray
                })
            });
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            dispatch(updateRecipes(recipeArray)).then(() => {
                alert("Recipe deleted successfully!");
                user.user.recipes = recipeArray;
                localStorage.setItem("user", JSON.stringify(user));
            });
        } catch (error) {
            alert("Network call failed, request unsuccessful");
            console.log(error);
        }
    };
};

const updateRecipes = (recipeArray: Recipe[]) => {
    return (dispatch: Dispatch) => {
        return new Promise<void>((resolve, reject) => {
            dispatch({
                type: ActionType.ADD_RECIPE,
                payload: recipeArray
            });

            resolve();
        });
    };
};
