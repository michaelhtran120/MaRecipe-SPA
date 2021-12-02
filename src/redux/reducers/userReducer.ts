import { UserAction, CurrentUser } from "../actions/index";
import { ActionType } from "../actionTypes/index";

const initialState = {
    accessToken: "",
    firstName: "",
    lastName: "",
    id: ""
};

const userReducer = (state: CurrentUser = initialState, action: UserAction) => {
    switch (action.type) {
        case ActionType.LOG_IN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                id: action.payload.id
            };
        case ActionType.LOG_OUT:
            return {
                ...state,
                accessToken: "",
                firstName: "",
                lastName: "",
                id: ""
            };
        default:
            return state;
    }
};

export default userReducer;
