import React, { useState } from "react";
import styles from "./RecipePage.module.css";
import { Button, Container, Image, Row, Modal, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreators, State } from "../../redux";
import { bindActionCreators } from "redux";
import { Recipe, Ingredients, Instructions } from "../../redux/actions";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import macroCalc from "../../helper/macroCalc";
import calorieCalc from "../../helper/calorieCalc";

const DisplayRecipe = ({ recipeData }: { recipeData: Recipe }) => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deleteRecipe } = bindActionCreators(actionCreators, dispatch);
    const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState<boolean>(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false);

    const toggleEditRecipeModal = () => {
        setIsEditRecipeModalOpen(!isEditRecipeModalOpen);
    };
    const toggleConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(!isConfirmDeleteModalOpen);
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
                <span className={`${styles.dashboardBtn} mt-3`} onClick={() => navigate("/dashboard")}>
                    &larr; Back To Dashboard
                </span>
                <h1 className='mt-4'>{recipeData.name}</h1>
                <p>{recipeData.description}</p>
                <hr />
                <Row className='justify-content-end '>
                    <Col md={6}>
                        <Image style={{ width: "100%" }} src={recipeData.imageUrl} />
                        <p className='mt-3'>
                            Recipe makes {recipeData.servings} {parseInt(recipeData.servings) > 1 ? "servings" : "serving"}. | Total Calories:{" "}
                            {calorieCalc(recipeMacros.totalCarbs, recipeMacros.totalProteins, recipeMacros.totalFats)}
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
                    <hr className='d-md-none my-3' />
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
                    <hr className='d-md-none' />
                </Row>
                <hr className='d-none d-md-block' />
                <h2>Cooking Instructions</h2>
                <ol>
                    {recipeData.instructions.map((aInstruction: Instructions) => (
                        <li className='text-start' key={aInstruction.id}>
                            {aInstruction.instruction}
                        </li>
                    ))}
                </ol>
                <hr />
                <Row className='justify-content-between'>
                    <Col xs={6} sm={4} md={3}>
                        <Button className={`${styles.editBtn} me-2`} onClick={toggleEditRecipeModal}>
                            Edit Recipe
                        </Button>
                    </Col>
                    <Col xs={6} sm={4} md={3}>
                        <Button variant='danger' onClick={() => toggleConfirmDeleteModal()} className={styles.btnDanger}>
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
                    <RecipeForm toggleFormModal={toggleEditRecipeModal} recipe={recipeData} />
                </Modal.Body>
            </Modal>

            <Modal show={isConfirmDeleteModalOpen} onHide={toggleConfirmDeleteModal}>
                <Modal.Body>
                    <p>Confirm recipe delete?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => toggleConfirmDeleteModal()}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDelete();
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const RecipePage = () => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    // const [recipeData, setRecipeData] = useState<Recipe>(user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0]);

    const recipeData = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0];

    return <>{recipeData ? <DisplayRecipe recipeData={recipeData} /> : <h1>No Recipe</h1>}</>;
};

export default RecipePage;
