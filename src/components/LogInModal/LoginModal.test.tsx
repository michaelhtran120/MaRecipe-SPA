import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";
import LoginModal from "./LoginModal";

const toggleLogInModal = jest.fn();

const MockLogInModalComponent = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LoginModal open={true} toggleLoginModal={toggleLogInModal} />
            </BrowserRouter>
        </Provider>
    );
};

describe("Sign Up Modal", () => {
    test("Renders sign up form correctly", () => {
        const component = render(<MockLogInModalComponent />);
        const inputs = component.getAllByTestId("input");
        const buttons = component.getAllByRole("button");
        expect(inputs).toHaveLength(2);
        expect(buttons).toHaveLength(3);
    });
});
