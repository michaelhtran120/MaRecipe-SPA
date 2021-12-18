import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import { useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";

const MockLandingPage = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        </Provider>
    );
};

describe("LandingPage functionality", () => {
    test("Landing Page login button triggers login modal", () => {
        render(<MockLandingPage />);
        const loginBtn = screen.getByRole("button", { name: /log in/i });
        fireEvent.click(loginBtn);
        const loginModal = screen.getByTestId("loginModal");
        expect(loginModal).toBeInTheDocument();
    });
    test("Landing Page sign up button triggers signup modal", () => {
        render(<MockLandingPage />);
        const signupBtn = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(signupBtn);
        const loginModal = screen.getByTestId("loginModal");
        expect(loginModal).toBeInTheDocument();
    });
});
