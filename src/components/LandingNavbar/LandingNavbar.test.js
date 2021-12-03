import React from "react";
import { render, screen } from "@testing-library/react";
import LandingNavbar from "./LandingNavbar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";

const MockLandingNavbar = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LandingNavbar />
            </BrowserRouter>
        </Provider>
    );
};

describe("LandingNavbar component check", () => {
    test("renders landing page logo image", () => {
        render(<MockLandingNavbar />);
        const logo = screen.getByRole("img", { name: /marecipe logo/i });
        expect(logo).toBeInTheDocument();
    });

    test("renders log in and sign up button", () => {
        render(<MockLandingNavbar />);
        const signUpBtn = screen.getByRole("button", { name: /sign up/i });
        const logInBtn = screen.getByRole("button", { name: /log in/i });
        expect(signUpBtn).toBeInTheDocument();
        expect(logInBtn).toBeInTheDocument();
    });
});
