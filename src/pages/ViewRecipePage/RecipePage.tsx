import React, { useState } from "react";
import "./RecipePage.css";
import { Button, Container, Image, Row, Modal, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators, State } from "../../redux";
import { bindActionCreators } from "redux";
import { Recipe, Ingredients, Instructions } from "../../redux/actions";
import EditRecipeForm from "../../components/EditRecipeForm/EditRecipeForm";
import macroCalc from "../../helper/macroCalc";
import calorieCalc from "../../helper/calorieCalc";

const DisplayRecipe = ({ recipeData }: { recipeData: Recipe }) => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deleteRecipe } = bindActionCreators(actionCreators, dispatch);
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

    const handleDelete = (): void => {
        const filterRecipes = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id !== recipeId);
        deleteRecipe(filterRecipes, user.userInfo, navigate("/dashboard"));
    };
    return (
        <>
            <Container className='p-3 p-md-5 pt-md-2 recipe-view'>
                <span className='dashboard-btn mt-3' onClick={() => navigate("/dashboard")}>
                    &larr; Back To Dashboard
                </span>
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
                <Row className='justify-content-between'>
                    <Col>
                        <Button onClick={toggleEditRecipeModal}>Edit Recipe</Button>
                    </Col>
                    <Col>
                        <Button variant='secondary' onClick={() => handleDelete()} className='delete-btn'>
                            Delete Recipe
                        </Button>
                    </Col>
                </Row>
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


const RecipePage = () => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const [recipeData, setRecipeData] = useState<Recipe>(user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0]);

    return <>{recipeData ? <DisplayRecipe recipeData={recipeData} /> : <h1>No Recipe</h1>}</>;
};

export default RecipePage;


