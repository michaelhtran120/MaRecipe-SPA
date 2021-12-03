import { AnyMxRecord } from "dns";

export interface CurrentUser {
    accessToken: string;
    firstName: string;
    lastName: string;
    id: string;
    recipes: string[];
}

export interface Recipe {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    ingredients: {
        id: string;
        name: string;
        quantity: number;
        proteins: number;
        carbs: number;
        fats: number;
    }[];
    instructions: string[];
    servings: number;
    featured: boolean;
}

export type RecipeAction = {
    type: string;
    payload: any;
};

export type UserAction = {
    type: string;
    payload: any;
};
