export interface CurrentUser {
    accessToken: string;
    firstName: string;
    lastName: string;
    id: string;
}

export type UserAction = {
    type: string;
    payload: CurrentUser;
};

export interface Recipe {
    id: string;
    title: string;
    imageUrl: string;
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
}

export type RecipeAction = {
    type: string;
    payload: any;
};
