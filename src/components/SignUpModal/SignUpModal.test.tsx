import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";
import SignUpModal from "./SignUpModal";

const toggleSignUpModal = jest.fn();

const MockSignUpModalComponent = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SignUpModal open={true} toggleSignUpModal={toggleSignUpModal} />
            </BrowserRouter>
        </Provider>
    );
};

describe("Sign Up Modal", () => {
    test("Renders sign up form correctly", () => {
        const component = render(<MockSignUpModalComponent />);
        const inputs = component.getAllByTestId("input");
        const buttons = component.getAllByRole("button");
        expect(inputs).toHaveLength(4);
        expect(buttons).toHaveLength(3);
    });
});
