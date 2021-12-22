import { Recipe, UserInfo } from "../actions";

const API_URL = "http://localhost:3004/";
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

export const logInAPICall = (email: string, password: string) => {
    return fetch(API_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
};

export const signUpAPICall = (credentials: { firstName: string; lastName: string; email: string; password: string }) => {
    return fetch(API_URL + "register", {
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
};

// Same API call for adding/editing/deleting recipe
export const postRecipeAPICall = (recipeArray: Recipe[], user: UserInfo["userInfo"]) => {
    return fetch(API_URL + `users/${user.user.id}`, {
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
};
