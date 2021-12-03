import { UserAction, CurrentUser } from "../actions/index";
import { ActionType } from "../actionTypes/index";

const initialState = {
    loading: false,
    error: "",
    userInfo: null
};

const userLoginReducer = (
    state: {
        loading: boolean;
        error: string;
        userInfo: CurrentUser | null;
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
        default:
            return state;
    }
};

export default userLoginReducer;
