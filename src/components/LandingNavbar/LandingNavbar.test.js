import React from "react";
import { render, screen } from "@testing-library/react";
import LandingNavbar from "./LandingNavbar";

describe("LandingNavbar component check", () => {
    test("renders landing page logo image", () => {
        render(<LandingNavbar />);
        const logo = screen.getByRole("img", { name: /marecipe logo/i });
        expect(logo).toBeInTheDocument();
    });

    test("renders log in and sign up button", () => {
        render(<LandingNavbar />);
        const signUpBtn = screen.getByRole("button", { name: /sign up/i });
        const logInBtn = screen.getByRole("button", { name: /log in/i });
        expect(signUpBtn).toBeInTheDocument();
        expect(logInBtn).toBeInTheDocument();
    });
});
