import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";
import NavbarComponent from "./NavbarComponent";

type Props = {
    toggleLoginModal?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    toggleSignUpModal?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    page: string;
};

const MockNavbar = ({ page, toggleLoginModal, toggleSignUpModal }: Props): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavbarComponent page={page} toggleLoginModal={jest.fn()} toggleSignUpModal={jest.fn()} />
            </BrowserRouter>
        </Provider>
    );
};

describe("Landing Page Navbar", () => {
    beforeEach(() => {
        render(<MockNavbar page='landing' />);
    });

    test("Navbar renders properly", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(3);
    });
});
