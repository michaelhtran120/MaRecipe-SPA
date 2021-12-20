import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";
import RecipeForm from "./RecipeForm";
import { Recipe } from "../../redux/actions/index";

const toggleFormModal = jest.fn();

type Props = {
    recipe?: Recipe[];
};

const MockRecipeForm = (recipe: Props): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RecipeForm toggleFormModal={toggleFormModal} />
            </BrowserRouter>
        </Provider>
    );
};

describe("New Recipe Form", () => {
    beforeEach(() => {
        render(<MockRecipeForm />);
    });

    test("New Recipe Form inputs renders correctly", () => {
        const inputs = screen.getAllByTestId("input");
        expect(inputs).toHaveLength(10);
    });

    test("Recipe Form add ingredient button works", () => {
        const addIngBtn = screen.getByRole("button", { name: /Add Ingredient/i });
        fireEvent.click(addIngBtn);
        const inputs = screen.getAllByTestId("input");
        expect(inputs).toHaveLength(15);
    });

    test("Recipe Form add instruction button works", () => {
        const addInsBtn = screen.getByRole("button", { name: /Add Instruction/i });
        fireEvent.click(addInsBtn);
        const inputs = screen.getAllByTestId("input");
        expect(inputs).toHaveLength(11);
    });
});
