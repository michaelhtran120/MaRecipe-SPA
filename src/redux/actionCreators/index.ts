import { Dispatch } from "redux";
import { CurrentUser, UserAction } from "../actions";
import { ActionType } from "../actionTypes";

export const logIn = (userInfo: CurrentUser) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.LOG_IN,
            payload: userInfo
        });
    };
};
export const logOut = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.LOG_OUT
        });
    };
};
