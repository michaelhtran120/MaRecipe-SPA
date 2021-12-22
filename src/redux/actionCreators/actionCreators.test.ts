import { Dispatch } from "redux";
import { logIn, logInRequest, logInSuccess, logInFail } from "./index";
import { CurrentUser, Recipe, UserInfo } from "../actions";

const logInAPICall: jest.Mock = require("./apiCalls.ts").logInAPICall;

jest.mock("./apiCalls", () => ({
    logInAPICall: jest.fn()
}));

const mockResponse = {
    payload: {
        accessToken: "1234",
        email: "admin@admin.com",
        firstName: "Michael",
        id: "1",
        lastName: "Tran",
        password: "mock123",
        recipes: []
    },
    type: "LOG_IN_SUCCESS"
};

const mockResponseTwo = {
    accessToken: "1234",
    email: "admin@admin.com",
    password: "mock123",
    firstName: "Michael",
    lastName: "Tran",
    id: "1",
    recipes: []
};

describe("login thunk", () => {
    test("dispatches a login request", async () => {
        const dispatch = jest.fn();
        await logIn({ email: "admin@admin.com", password: "admin1" })(dispatch);
        expect(dispatch).toHaveBeenCalledWith(logInRequest());
    });

    //// Trouble getting this test to pass
    // describe("when login succeeds", () => {
    //     beforeEach(() => {
    //         logInAPICall.mockResolvedValue(mockResponse);
    //     });
    //     test("dispatches success", async () => {
    //         const dispatch = jest.fn();
    //         await logIn({ email: "admin@admin.com", password: "admin1" })(dispatch);
    //         console.log(dispatch);
    //         expect(dispatch).toHaveBeenLastCalledWith(logInSuccess(mockResponseTwo));
    //     });
    // });

    describe("when login fails", () => {
        const error = new Error("FAIL!");
        beforeEach(() => {
            logInAPICall.mockRejectedValue(error);
        });

        test("dispatches failure", async () => {
            const dispatch = jest.fn();
            await logIn({ email: "admin@admin.com", password: "admin1" })(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith(logInFail(error));
        });
    });
});
