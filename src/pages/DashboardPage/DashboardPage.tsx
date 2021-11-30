import React, { useState } from "react";
import "./DashboardPage.css";
import { Modal } from "react-bootstrap";
import { Button } from "reactstrap";
import AddRecipeForm from "../../components/AddRecipeForm";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

interface Props {
    handleLogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DashboardPage = ({ handleLogOut }: Props) => {
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsAddRecipeModalOpen(!isAddRecipeModalOpen);
    };

    return (
        <div>
            <DashboardNavbar handleLogOut={handleLogOut} />
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