import React, { useEffect, useState, useRef } from "react";
import "./DashboardPage.css";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Button } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import AddRecipeForm from "../../components/AddRecipeForm";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

interface Props {
    handleLogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
    currentUser: {
        accessToken: string;
        firstName: string;
        lastName: string;
        id: string;
    };
}

const DashboardPage = ({ handleLogOut, currentUser }: Props) => {
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsAddRecipeModalOpen(!isAddRecipeModalOpen);
    };

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log("dashboard mounted");
        }
    });

    return (
        <div>
            <DashboardNavbar handleLogOut={handleLogOut} />
            <Routes>
                <Route
                    path='/'
                    element={
                        <Container>
                            <Row>
                                <Col>
                                    <h1 className='p-5'>{`Hello ${currentUser.firstName} ${currentUser.lastName}`}</h1>
                                </Col>
                            </Row>
                        </Container>
                    }
                />
            </Routes>
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
