import React from "react";
import * as ReactDOM from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";
import LandingPage from "./LandingPage";

const MockLandingPage = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        </Provider>
    );
};

describe("Landing Page renders correctly", () => {
    beforeEach(() => {
        render(<MockLandingPage />);
    });

    test("Landing Page Elements", () => {
        const heroHeader = screen.getByRole("heading", { name: /macro recipe application/i });
        const buttons = screen.getAllByRole("button");
        expect(heroHeader).toBeInTheDocument();
        expect(buttons).toHaveLength(3);
    });
});

describe("Landing Page functionality", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<MockLandingPage />, container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });

    test("Landing Page log in button triggers login modal", () => {
        const loginBtn = screen.getByRole("button", { name: /log in/i });
        fireEvent.click(loginBtn);
        const loginModal = screen.getByTestId("loginModal");
        expect(loginModal).toBeInTheDocument();
    });

    test("Landing Page sign up button triggers signup modal", () => {
        const signupBtn = screen.getByRole("button", { name: /sign up/i });
        fireEvent.click(signupBtn);
        const signUpModal = screen.getByTestId("signUpModal");
        expect(signUpModal).toBeInTheDocument();
    });
});
