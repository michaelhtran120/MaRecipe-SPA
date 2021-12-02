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
