import React, { useState, useEffect } from "react";
import { Button, Container, Image, Row, Modal, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import { Recipe, Ingredients, Instructions } from "../../redux/actions";
import EditRecipeForm from "../EditRecipeForm/EditRecipeForm";

const ViewRecipe = () => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const [recipeData, setRecipeData] = useState<Recipe>(user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0]);

    // useEffect(() => {
    //     setRecipeData(user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0]);
    //     console.log(recipeData);
    // }, [user]);

    const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState<boolean>(false);

    const toggleEditRecipeModal = () => {
        setIsEditRecipeModalOpen(!isEditRecipeModalOpen);
    };

    return (
        <>
            <Container className='p-3 p-md-5 recipe-view'>
                <h1>{recipeData.name}</h1>
                <p>{recipeData.description}</p>
                <Row className='justify-content-end '>
                    <Col md={6}>
                        <Image style={{ width: "100%" }} src={recipeData.imageUrl} />
                        <p className='mt-2 lead'>
                            Recipe makes {recipeData.servings} {parseInt(recipeData.servings) > 1 ? "servings" : "serving"}.
                        </p>
                        <p className='mt-4 mb-0 lead'>Per Serving</p>
                        <p className='m-0'>Cals:</p>
                        <p>Macros:</p>
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

                <Row></Row>
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
