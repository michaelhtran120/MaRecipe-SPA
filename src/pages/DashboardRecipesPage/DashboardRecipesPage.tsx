import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import FeaturedRecipes from "../../components/FeaturedRecipes/FeaturedRecipes";
import UserRecipes from "../../components/UserRecipes/UserRecipes";

const DashboardRecipesPage = () => {
    const { recipes } = useSelector((state: State) => state);
    return (
        <Container className='pt-3'>
            {recipes.loading === false && recipes.recipes.length > 0 ? (
                <>
                    <Row>
                        <h2 className='ps-4'>Featured Recipes</h2>
                        <FeaturedRecipes />
                    </Row>
                    <Row className='mt-5'>
                        <h2 className='ps-4'>Your Recipes</h2>
                        <UserRecipes />
                    </Row>
                </>
            ) : (
                <p>Data loading, please wait...</p>
            )}
        </Container>
    );
};

export default DashboardRecipesPage;
