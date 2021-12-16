export type CurrentUser = {
    accessToken: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    id: string;
    recipes: Recipe[];
}

export type Recipe = {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    ingredients: Ingredients[];
    instructions: Instructions[];
    servings: string;
    favorite: boolean;
}

export type Ingredients = {
    id: string;
    name: string;
    quantity: string;
    proteins: string;
    carbs: string;
    fats: string;
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

export type UserInfo = {
    userInfo: {
        accessToken: string;
        user: CurrentUser;
    };
}
