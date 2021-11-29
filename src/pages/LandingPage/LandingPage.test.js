import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import { useNavigate } from "react-router";

describe("LandingPage functionality", () => {
    test("Landing Page login button triggers login modal", () => {
        render(<LandingPage />);
        const loginBtn = screen.getByRole("button", { name: /log in/i });
        fireEvent.click(loginBtn);
        const loginModal = screen.getByTestId("loginModal");
        expect(loginModal).toBeInTheDocument();
    });
});
