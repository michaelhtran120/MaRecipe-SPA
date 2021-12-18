import { Dispatch } from "redux";
import { CurrentUser, Recipe, UserInfo } from "../actions";
import { ActionType } from "../actionTypes";

const sampleRecipe = {
    id: "2c7bd673-9a2a-4cfe-bb83-e1bf295486dc",
    name: "SAMPLE RECIPE",
    imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    description: "This is a sample recipe",
    ingredients: [
        {
            id: "ing1",
            name: "SAMPLE INGREDIENT 1",
            quantity: "10",
            proteins: "10",
            carbs: "10",
            fats: "10"
        },
        {
            id: "ing2",
            name: "SAMPLE INGREDIENT 2",
            quantity: "10",
            proteins: "10",
            carbs: "10",
            fats: "10"
        }
    ],
    servings: "1",
    instructions: [
        {
            id: "62115b15-f9bc-4f95-802e-6a6d7210cc12",
            instruction: "SAMPLE INSTRUCTION 1"
        },
        {
            id: "7c27ffc6-2ab6-4098-8cdb-6ed455ed2126",
            instruction: "SAMPLE INSTRUCTION 2"
        }
    ],
    favorite: true
};

const API_URL = "http://localhost:3004/";

export const signUp = (credentials: { firstName: string; lastName: string; email: string; password: string }) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await fetch("http://localhost:3004/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                    email: credentials.email,
                    password: credentials.password,
                    recipes: [sampleRecipe]
                })
            });
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
            const response = await fetch(API_URL + "login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });
            if (response.status === 400) {
                const body = await response.json();
                if (body === "Incorrect password" || body === "Cannot find user") {
                    throw new Error("Invalid credentials");
                }
                console.log(body);
                throw new Error(body);
            }
            const user = await response.json();
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
