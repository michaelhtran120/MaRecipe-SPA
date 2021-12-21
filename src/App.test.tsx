import React from "react";
import { shallow } from "enzyme";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import App from "./App";

const MockApp = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};

describe("App", () => {
    test("renders correctly", () => {
        shallow(<MockApp />);
    });
});

describe("Log in functionality", () => {
    beforeEach(() => {
        render(<MockApp />);
        const navLogInBtn = screen.getByTestId("navLogInBtn");
        fireEvent.click(navLogInBtn);
    });
    afterEach(cleanup);
    test("User can log in", async () => {
        const emailInput = screen.getByPlaceholderText(/enter email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const logInBtn = screen.getByTestId("modalLoginBtn");
        fireEvent.change(emailInput, { target: { value: "admin@admin.com" } });
        fireEvent.change(passwordInput, { target: { value: "admin1" } });
        fireEvent.click(logInBtn);

        const dashboardText = await screen.findByRole("heading", { name: /your favorite recipes/i });
        const userProfileButton = await screen.getByRole("button", { name: /michael tran/i });
        expect(dashboardText).toBeInTheDocument();
        expect(userProfileButton).toBeInTheDocument();
    });

    test("Invalid user", async () => {});
});

// describe("Sign Up Functionality", () => {
//     beforeEach(() => {
//         render(<MockApp />);
//     });
//     afterEach(cleanup);
//     test("User can sign up", async () => {
//         const navSignUpBtn = screen.getByTestId("navSignUpBtn");
//         fireEvent.click(navSignUpBtn);
//         const firstNameInput = screen.getByPlaceholderText("First Name");
//         const lastNameInput = screen.getByPlaceholderText("Last Name");
//         const emailInput = screen.getByPlaceholderText(/enter email/i);
//         const passwordInput = screen.getByPlaceholderText(/password/i);
//         const modalSignUpBtn = screen.getByTestId("modalSignUpBtn");

//         fireEvent.change(firstNameInput, { target: { value: "testFn" } });
//         fireEvent.change(lastNameInput, { target: { value: "testLn" } });
//         fireEvent.change(emailInput, { target: { value: "test@test.com" } });
//         fireEvent.change(passwordInput, { target: { value: "test123" } });
//         fireEvent.click(modalSignUpBtn);

//         const dashboardText = await screen.findByRole("heading", { name: /your favorite recipes/i });
//         const userProfileButton = await screen.getByRole("button", { name: /testFn testLn/i });

//         expect(dashboardText).toBeInTheDocument();
//     });
// });
