import React from "react";
import "./UserFavoriteRecipes.css";
import { Button, Card, Container, Row, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { State } from "../../redux";
import { Recipe } from "../../redux/actions";

// interface Recipe {
//     id: string;
//     title: string;
//     imageUrl: string;
//     description: string;
//     ingredients: {
//         id: string;
//         name: string;
//         quantity: number;
//         proteins: number;
//         carbs: number;
//         fats: number;
//     }[];
//     instructions: string[];
//     servings: number;
//     favorite: boolean;
// }
const RecipeCard = ({
    title,
    url,
    description
}: {
    title: Recipe["title"];
    url: Recipe["imageUrl"];
    description: Recipe["description"];
}): JSX.Element => {
    return (
        <Card className='user-recipe-card'>
            <Image className='recipe-image' src={url} fluid />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant='primary'>See Details</Button>
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
                        <RecipeCard title={aRecipe.title} url={aRecipe.imageUrl} description={aRecipe.description} key={aRecipe.id} />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default UserFavoriteRecipes;
