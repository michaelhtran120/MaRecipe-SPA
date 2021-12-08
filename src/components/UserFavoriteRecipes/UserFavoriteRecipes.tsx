import React from "react";
import "./UserFavoriteRecipes.css";
import { Button, Card, Container, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import { Recipe } from "../../redux/actions";

const RecipeCard = ({
    title,
    url,
    description,
    data
}: {
    title: Recipe["name"];
    url: Recipe["imageUrl"];
    description: Recipe["description"];
    data: Recipe;
}): JSX.Element => {
    const navigate = useNavigate();
    const handleClick = (data: Recipe) => {
        navigate(`/dashboard/${data.id}`, { state: data });
    };

    return (
        <Card className='user-recipe-card'>
            <Image className='recipe-image' src={url} fluid />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button
                    variant='primary'
                    onClick={() => {
                        handleClick(data);
                    }}
                >
                    See Details
                </Button>
            </Card.Body>
        </Card>
    );
};

const UserFavoriteRecipes = () => {
    const { user } = useSelector((state: State) => state);
    const allRecipes = user.userInfo.user.recipes;

    const getFavoriteRecipes = (): Recipe[] => {
        let favoriteRecipes: Recipe[] = allRecipes.filter((aRecipe: Recipe) => aRecipe.favorite === true);
        return favoriteRecipes;
    };

    return (
        <div>
            <Container className='fluid'>
                <Row className='user-row'>
                    {getFavoriteRecipes().map((aRecipe: Recipe) => (
                        <RecipeCard title={aRecipe.name} url={aRecipe.imageUrl} description={aRecipe.description} key={aRecipe.id} data={aRecipe} />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default UserFavoriteRecipes;
