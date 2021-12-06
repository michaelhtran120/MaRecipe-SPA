import { UserAction, CurrentUser } from "../actions/index";
import { ActionType } from "../actionTypes/index";

const initialState = {
    loading: false,
    error: "",
    userInfo: null
};

const userReducer = (
    state: {
        loading: boolean;
        error: string;
        userInfo: CurrentUser | any;
    } = initialState,
    action: UserAction
) => {
    switch (action.type) {
        case ActionType.LOG_IN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ActionType.LOG_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                userInfo: action.payload
            };
        case ActionType.LOG_IN_FAIL:
            return {
                loading: false,
                error: action.payload,
                userInfo: null
            };
        case ActionType.LOG_OUT:
            return {
                ...state,
                userInfo: null
            };
        case ActionType.ADD_RECIPE:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    user: {
                        ...state.userInfo.user,
                        recipes: action.payload
                    }
                }
            };
        default:
            return state;
    }
};

export default userReducer;
