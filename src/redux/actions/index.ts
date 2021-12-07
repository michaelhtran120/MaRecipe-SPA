export interface CurrentUser {
    accessToken: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    id: string;
    recipes: Recipe[];
}

export interface Recipe {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    ingredients: Ingredients[];
    instructions: Instructions[];
    servings: number;
    favorite: boolean;
}

export type Ingredients = {
    id: string;
    name: string;
    quantity: number;
    proteins: number;
    carbs: number;
    fats: number;
};

export type Instructions = {
    id: string;
    instruction: string;
};

export type AddRecipeAction = {
    type: string;
    payload: Recipe[];
};

export type UserAction = {
    type: string;
    payload: any;
};

export interface UserInfo {
    userInfo: {
        accessToken: string;
        user: CurrentUser;
    };
}
