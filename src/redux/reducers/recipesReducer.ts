import { Recipe, AddRecipeAction } from "../actions/index";
import { ActionType } from "../actionTypes/index";

const initialState = {
    loading: false,
    error: "",
    recipes: []
};

const recipeReducer = (
    state: {
        loading: boolean;
        error: string;
        recipes: Recipe[];
    } = initialState,
    action: AddRecipeAction
) => {
    switch (action.type) {
        case ActionType.FETCH_RECIPES_REQUEST:
            return { ...state, loading: true };
        case ActionType.FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                recipes: action.payload
            };
        case ActionType.FETCH_RECIPES_FAIL:
            return { loading: false, recipes: [], error: action.payload };
        case ActionType.ADD_RECIPE:
            return { ...state, recipes: [...state.recipes, action.payload] };
        // case ActionType.DELETE_RECIPE:
        default:
            return state;
    }
};

export default recipeReducer;

// <Recipe[]>[]
