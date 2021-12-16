import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserFavoriteRecipes from "../../components/UserFavoriteRecipes/UserFavoriteRecipes";
import UserRecipes from "../../components/UserRecipes/UserRecipes";
import { State } from "../../redux";
import { Recipe } from "../../redux/actions/index";

const DashboardHomePage = (): JSX.Element => {
    // Pull state from redux store
    const { user } = useSelector((state: State) => state);
    // Check if user has any recipes that are favorites and conditionally render the recipes or a statement showing that there are no favorites.

    // Filter through users recipes and retrieve all that are marked favorite.
    const favoriteRecipe: Recipe[] = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.favorite);

    return (
        <Container className='pt-3'>
            <Row className='mt-5'>
                <h2 className='ps-4'>Your Favorite Recipes</h2>
                {favoriteRecipe.length > 0 ? <UserFavoriteRecipes /> : <h3 className='ps-5'>No Favorite Recipes</h3>}
            </Row>
            <Row>
                <h2 className='ps-4 mt-5'>All Your Recipes</h2>
                {user.userInfo.user.recipes.length > 0 ? <UserRecipes /> : <h2>No Recipes added yet</h2>}
            </Row>
        </Container>
    );
};

export default DashboardHomePage;
