import React, { useState, useEffect } from "react";
import { Button, Container, Image, Row, Modal, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State } from "../../redux";
import { Recipe, Ingredients, Instructions } from "../../redux/actions";
import EditRecipeForm from "../EditRecipeForm/EditRecipeForm";
import macroCalc from "../../helper/macroCalc";
import calorieCalc from "../../helper/calorieCalc";

const ViewRecipe = () => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState<Recipe>(user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0]);

    const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState<boolean>(false);

    const toggleEditRecipeModal = () => {
        setIsEditRecipeModalOpen(!isEditRecipeModalOpen);
    };

    // Return carbs, proteins, fats from each ingredient in the recipe.
    const carbsFromIngredients = recipeData.ingredients.map((ingredient) => ingredient.carbs);
    const proteinsFromIngredients = recipeData.ingredients.map((ingredient) => ingredient.proteins);
    const fatsFromIngredients = recipeData.ingredients.map((ingredient) => ingredient.fats);

    // macroCalc returns an object of carbs, proteins and fats key values
    const recipeMacros = macroCalc(carbsFromIngredients, proteinsFromIngredients, fatsFromIngredients);

    return (
        <>
            <Container className='p-3 p-md-5 pt-md-2 recipe-view'>
                <Button onClick={() => navigate("/dashboard")}>&larr; Dashboard</Button>
                <h1 className='mt-4'>{recipeData.name}</h1>
                <p>{recipeData.description}</p>
                <hr />
                <Row className='justify-content-end '>
                    <Col md={6}>
                        <Image style={{ width: "100%" }} src={recipeData.imageUrl} />
                        <p className='mt-2 lead'>
                            Recipe makes {recipeData.servings} {parseInt(recipeData.servings) > 1 ? "servings" : "serving"}.
                        </p>
                        <p className='mt-4 mb-0 lead'>Per Serving</p>
                        <p className='m-0'>
                            Calories:{" "}
                            {calorieCalc(recipeMacros.totalCarbs, recipeMacros.totalProteins, recipeMacros.totalFats) /
                                parseFloat(recipeData.servings)}
                        </p>
                        <span>Carbohydrates: {recipeMacros.totalCarbs / parseFloat(recipeData.servings)} grams</span>
                        <br />
                        <span>Proteins: {recipeMacros.totalProteins / parseFloat(recipeData.servings)} grams</span>
                        <br />
                        <span>Fats: {recipeMacros.totalFats / parseFloat(recipeData.servings)} grams</span>
                    </Col>
                    <hr className='d-md-none' />
                    <Col md={6}>
                        <h2>Recipe Ingredients</h2>
                        <ul>
                            {recipeData.ingredients.map((aIngredient: Ingredients) => (
                                <li key={aIngredient.id} className='text-start'>
                                    {aIngredient.name} - {`${aIngredient.quantity} grams`}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <hr className='d-none d-md-block' />
                <h2>Recipe Instructions</h2>
                <ol>
                    {recipeData.instructions.map((aInstruction: Instructions) => (
                        <li className='text-start' key={aInstruction.id}>
                            {aInstruction.instruction}
                        </li>
                    ))}
                </ol>
                <Button onClick={toggleEditRecipeModal}>Edit Recipe</Button>

                {/* <Button style={{ position: "absolute", top: 90, left: 125 }}>Return to Dashboard</Button> */}
            </Container>

            <Modal show={isEditRecipeModalOpen} fullscreen onHide={toggleEditRecipeModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='ps-5'>Edit Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditRecipeForm toggleEditRecipeModal={toggleEditRecipeModal} recipe={recipeData} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ViewRecipe;

// useEffect(() => {
//     setRecipeData(user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0]);
//     console.log(recipeData);
// }, [user]);
