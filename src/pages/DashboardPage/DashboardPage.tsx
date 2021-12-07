import React, { useState } from "react";
import "./DashboardPage.css";
import { Modal } from "react-bootstrap";
import { Button } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import DashboardHomePage from "../DashboardHomePage/DashboardHomePage";
import ViewRecipe from "../../components/ViewRecipe/ViewRecipe";

const DashboardPage = () => {
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsAddRecipeModalOpen(!isAddRecipeModalOpen);
    };

    return (
        <div>
            <DashboardNavbar />
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <DashboardHomePage />{" "}
                            <Modal show={isAddRecipeModalOpen} fullscreen onHide={toggleModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title className='ps-5'>Add New Recipe</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddRecipeForm toggleAddRecipeModal={toggleModal} />
                                </Modal.Body>
                            </Modal>
                            <Button id='add-recipe-btn' onClick={toggleModal}>
                                +
                            </Button>
                        </>
                    }
                />
                <Route path='/:recipeId' element={<ViewRecipe />} />
            </Routes>
        </div>
    );
};

export default DashboardPage;
