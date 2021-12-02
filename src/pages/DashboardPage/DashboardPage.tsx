import React, { useEffect, useState, useRef } from "react";
import "./DashboardPage.css";
import { Modal } from "react-bootstrap";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { State } from "../../redux/index";

import AddRecipeForm from "../../components/AddRecipeForm";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import DashboardRecipesPage from "../DashboardRecipesPage/DashboardRecipesPage";

const API_URL = "http://localhost:3004/";

const fetchRecipes = async () => {
    const response = await fetch(API_URL + "recipes");
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const recipes = await response.json();
    console.log(recipes);
};

const DashboardPage = () => {
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);

    const user = useSelector((state: State) => state.user);

    const toggleModal = (): void => {
        setIsAddRecipeModalOpen(!isAddRecipeModalOpen);
    };

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log("dashboard mounted");
            fetchRecipes().catch((error) => {
                console.log(error.message);
            });
        }
    });

    return (
        <div>
            <DashboardNavbar currentUser={user} />

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
