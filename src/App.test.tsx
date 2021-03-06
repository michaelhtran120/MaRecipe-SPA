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
    });
    afterEach(cleanup);

    test("User can log in", async () => {
        const navLogInBtn = screen.getByTestId("navLogInBtn");
        fireEvent.click(navLogInBtn);
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
        fireEvent.click(userProfileButton);
        fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    });

    test("User2 can log in", async () => {
        const navLogInBtn = screen.getByTestId("navLogInBtn");
        fireEvent.click(navLogInBtn);
        const emailInput = screen.getByPlaceholderText(/enter email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const logInBtn = screen.getByTestId("modalLoginBtn");
        fireEvent.change(emailInput, { target: { value: "admin2@admin.com" } });
        fireEvent.change(passwordInput, { target: { value: "admin1" } });
        fireEvent.click(logInBtn);

        const dashboardText = await screen.findByRole("heading", { name: /your favorite recipes/i });
        const userProfileButton = await screen.getByRole("button", { name: /admin test2/i });
        expect(dashboardText).toBeInTheDocument();
        expect(userProfileButton).toBeInTheDocument();
        fireEvent.click(userProfileButton);
        fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    });
});
