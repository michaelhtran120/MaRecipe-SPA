import React from "react";
import "./UserRecipes.css";
import { Button, Card, Container, Row, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import { Recipe } from "../../redux/actions";
import { useNavigate } from "react-router";

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
        <Card className='recipe-card p-0'>
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

const UserRecipes = () => {
    const { user } = useSelector((state: State) => state);
    const userRecipes = user.userInfo.user.recipes;
    return (
        <div>
            <Container className='fluid'>
                <Row className='featured-row'>
                    {userRecipes.map((aRecipe: Recipe) => (
                        <RecipeCard title={aRecipe.name} url={aRecipe.imageUrl} description={aRecipe.description} key={aRecipe.id} data={aRecipe} />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default UserRecipes;
