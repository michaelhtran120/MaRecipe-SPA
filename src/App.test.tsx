import React from "react";
import { shallow } from "enzyme";
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
