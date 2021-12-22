import { Dispatch } from "redux";
import { CurrentUser, Recipe, UserInfo } from "../actions";
import { ActionType } from "../actionTypes";
import { logInAPICall, postRecipeAPICall, signUpAPICall } from "./apiCalls";

export const signUp = (credentials: { firstName: string; lastName: string; email: string; password: string }) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await signUpAPICall(credentials);
            if (response.status === 400) {
                const body = await response.json();
                console.log(body);
                throw new Error(body);
            }
            const logInCredentials = {
                email: credentials.email,
                password: credentials.password
            };
            // Using logIn action creator to update user state with user sign up data.
            return dispatch(logIn(logInCredentials));
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const logIn = (credentials: { email: string; password: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(logInRequest());
        try {
            const response = await logInAPICall(credentials.email, credentials.password);
            if (response.status === 400) {
                const body = await response.json();
                if (body === "Incorrect password" || body === "Cannot find user") {
                    throw new Error("Invalid credentials");
                }
                console.log(body);
                throw new Error(body);
            }
            console.log(response);
            const user = await response.json();
            console.log(user);
            dispatch(logInSuccess(user));
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("pw", credentials.password);
            return user;
        } catch (error) {
            dispatch(logInFail(error));
            return error;
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
            const response = await postRecipeAPICall(recipeArray, user);
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
            const response = await postRecipeAPICall(recipeArray, user);
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
