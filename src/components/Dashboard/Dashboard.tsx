import React, { useState } from "react";
import { Container, Row, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserRecipes from "../UserRecipes/UserRecipes";
import { State } from "../../redux";
import { Recipe } from "../../redux/actions/index";
import RecipeForm from "../../components/RecipeForm/RecipeForm";

const Dashboard = (): JSX.Element => {
    // Pull state from redux store
    const { user } = useSelector((state: State) => state);

    // Local State
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);

    // Toggle add recipe modal
    const toggleModal = (): void => {
        setIsAddRecipeModalOpen(!isAddRecipeModalOpen);
    };

    // Filter through users recipes and retrieve all that are marked favorite.
    const allRecipes: Recipe[] = user.userInfo.user.recipes;
    const favoriteRecipe: Recipe[] = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.favorite);

    return (
        <>
            <Container className='pt-3'>
                <Row className='mt-5'>
                    <h2 className=' text-center'>Your Favorite Recipes</h2>
                    {favoriteRecipe.length > 0 ? <UserRecipes recipes={favoriteRecipe} /> : <h3 className='ps-5'>No Favorite Recipes</h3>}
                </Row>
                <Row>
                    <h2 className='text-center mt-5'>All Your Recipes</h2>
                    {user.userInfo.user.recipes.length > 0 ? <UserRecipes recipes={allRecipes} /> : <h2>No Recipes added yet</h2>}
                </Row>
            </Container>
            <Modal show={isAddRecipeModalOpen} fullscreen onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='ps-5'>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeForm toggleFormModal={toggleModal} />
                </Modal.Body>
            </Modal>
            <Button id='add-recipe-btn' onClick={toggleModal}>
                +
            </Button>
        </>
    );
};

export default Dashboard;
