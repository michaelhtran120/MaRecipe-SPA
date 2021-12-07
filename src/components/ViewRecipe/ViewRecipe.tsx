import React from "react";
import { Container, Image, Row } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import { Recipe } from "../../redux/actions";

const ViewRecipe = () => {
    const { recipeId } = useParams();
    const user = useSelector((state: State) => state.user);
    const recipeData = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id === recipeId)[0];
    console.log(recipeData);
    return (
        <Container className='p-3 p-md-5'>
            <h1>Title {recipeId}</h1>
            <p>Description</p>
            <Image />
            <p>Summary Per Serving - Cals: Macros:</p>
            <ul>
                <li></li>
            </ul>
            <Row></Row>
        </Container>
    );
};

export default ViewRecipe;
