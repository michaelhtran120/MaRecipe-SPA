import React from "react";

import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/index";
import UserRecipes from "./UserRecipes";

const sampleRecipeArr = [
    {
        id: "2c7bd673-9a2a-4cfe-bb83-e1bf295486dc",
        name: "SAMPLE RECIPE Update Test",
        imageUrl:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        description: "This is a sample recipe TESTE",
        ingredients: [
            {
                id: "ing1",
                name: "SAMPLE INGREDIENT 1",
                quantity: "10",
                proteins: "10",
                carbs: "10",
                fats: "10"
            },
            {
                id: "ing2",
                name: "SAMPLE INGREDIENT 2",
                quantity: "10",
                proteins: "10",
                carbs: "10",
                fats: "10"
            }
        ],
        servings: "1",
        instructions: [
            {
                id: "62115b15-f9bc-4f95-802e-6a6d7210cc12",
                instruction: "SAMPLE INSTRUCTION 1"
            },
            {
                id: "7c27ffc6-2ab6-4098-8cdb-6ed455ed2126",
                instruction: "SAMPLE INSTRUCTION 2"
            }
        ],
        favorite: true
    },
    {
        id: "2c7bd673-9a2a-4cfe-bb83-e1bf295486d4",
        name: "SAMPLE RECIPE Update Test",
        imageUrl:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        description: "This is a sample recipe TESTE",
        ingredients: [
            {
                id: "ing1",
                name: "SAMPLE INGREDIENT 1",
                quantity: "10",
                proteins: "10",
                carbs: "10",
                fats: "10"
            },
            {
                id: "ing2",
                name: "SAMPLE INGREDIENT 2",
                quantity: "10",
                proteins: "10",
                carbs: "10",
                fats: "10"
            }
        ],
        servings: "1",
        instructions: [
            {
                id: "62115b15-f9bc-4f95-802e-6a6d7210cc12",
                instruction: "SAMPLE INSTRUCTION 1"
            },
            {
                id: "7c27ffc6-2ab6-4098-8cdb-6ed455ed2126",
                instruction: "SAMPLE INSTRUCTION 2"
            }
        ],
        favorite: true
    }
];

const MockRecipeCard = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserRecipes recipes={sampleRecipeArr} />
            </BrowserRouter>
        </Provider>
    );
};

describe("Recipe Card", () => {
    beforeEach(() => {
        render(<MockRecipeCard />);
    });

    afterEach(cleanup);

    test("Recipe Card renders", () => {
        const cards = screen.getAllByTestId("recipeCard");
        expect(cards).toHaveLength(2);
    });
});
