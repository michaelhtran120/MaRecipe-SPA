import LandingHero from "./LandingHero";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";

const MockLandingHero = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LandingHero />
            </BrowserRouter>
        </Provider>
    );
};

describe("Landing Hero components", () => {
    beforeEach(() => {
        render(<MockLandingHero />);
    });

    test("Landing video background renders", () => {
        const video = screen.getByTestId("parallaxVideo");
        expect(video).toBeInTheDocument();
    });
});
