import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import { Modal } from "react-bootstrap";
import { Button } from "reactstrap";
import { actionCreators, State } from "../../redux/index";
import { useDispatch, useSelector } from "react-redux";

import AddRecipeForm from "../../components/AddRecipeForm";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import DashboardRecipesPage from "../DashboardRecipesPage/DashboardRecipesPage";

// const API_URL = "http://localhost:3004/";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state: State) => state.recipes.recipes);

    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsAddRecipeModalOpen(!isAddRecipeModalOpen);
    };

    useEffect(() => {
        dispatch(actionCreators.fetchRecipes());
    }, [dispatch]);

    return (
        <div>
            <DashboardNavbar />

            <DashboardRecipesPage />

            <Modal show={isAddRecipeModalOpen} fullscreen onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='ps-5'>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddRecipeForm />
                </Modal.Body>
            </Modal>
            <Button id='add-recipe-btn' onClick={toggleModal}>
                +
            </Button>
        </div>
    );
};

export default DashboardPage;
