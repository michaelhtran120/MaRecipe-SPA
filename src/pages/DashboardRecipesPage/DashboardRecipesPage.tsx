import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import FeaturedRecipes from "../../components/FeaturedRecipes/FeaturedRecipes";

const DashboardRecipesPage = () => {
    return (
        <Container className='pt-3'>
            <Row>
                <h2 className='ps-4'>Featured Recipes</h2>
                <FeaturedRecipes />
            </Row>
            <Row className='mt-5'>
                <h2 className='ps-4'>Your Recipes</h2>
            </Row>
        </Container>
    );
};

export default DashboardRecipesPage;
