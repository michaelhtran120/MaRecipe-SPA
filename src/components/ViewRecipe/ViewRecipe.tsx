import React from "react";
import { Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import { Recipe, Ingredients, Instructions } from "../../redux/actions";

const ViewRecipe = () => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const recipeData = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0];
    console.log(recipeData);
    return (
        <Container className='p-3 p-md-5 text-center'>
            <h1>{recipeData.name}</h1>
            <p>{recipeData.description}</p>
            <Image src={recipeData.imageUrl} />
            <p>Summary Per Serving - Cals: Macros:</p>
            <h2>Recipe Ingredients</h2>
            <ul>
                {recipeData.ingredients.map((aIngredient: Ingredients) => (
                    <li key={aIngredient.id} className='text-start'>
                        {aIngredient.name} - {`${aIngredient.quantity} grams`}
                    </li>
                ))}
            </ul>
            <h2>Recipe Instructions</h2>
            <ol>
                {recipeData.instructions.map((aInstruction: Instructions) => (
                    <li className='text-start' key={aInstruction.id}>
                        {aInstruction.instruction}
                    </li>
                ))}
            </ol>
            <Row></Row>
        </Container>
    );
};

export default ViewRecipe;
