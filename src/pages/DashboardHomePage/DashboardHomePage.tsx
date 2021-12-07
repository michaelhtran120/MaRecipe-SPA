import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserFavoriteRecipes from "../../components/UserFavoriteRecipes/UserFavoriteRecipes";
import UserRecipes from "../../components/UserRecipes/UserRecipes";
import { State } from "../../redux";

const DashboardHomePage = () => {
    const { user } = useSelector((state: State) => state);
    return (
        <Container className='pt-3'>
            <Row className='mt-5'>
                <h2 className='ps-4'>Your Favorites</h2>
                {user.userInfo.user.recipes.length > 0 ? <UserFavoriteRecipes /> : <h2>No Favorites</h2>}
            </Row>
            <Row>
                <h2 className='ps-4'>Your Recipes</h2>
                {user.userInfo.user.recipes.length > 0 ? <UserRecipes /> : <h2>No Recipes added yet</h2>}
            </Row>
        </Container>
    );
};

export default DashboardHomePage;
