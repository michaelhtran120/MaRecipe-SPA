import React from "react";
import "./FeaturedRecipes.css";
import { Button, Card, Container, Row, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { State } from "../../redux";

interface Recipe {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    ingredients: {
        id: string;
        name: string;
        quantity: number;
        proteins: number;
        carbs: number;
        fats: number;
    }[];
    instructions: string[];
    servings: number;
    featured: boolean;
}
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
        <Card className='recipe-card'>
            <Image className='recipe-image' src={url} fluid />

            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant='primary'>See Details</Button>
            </Card.Body>
        </Card>
    );
};

const FeaturedRecipes = () => {
    const recipeState = useSelector((state: State) => state.recipes);
    const featuredRecipes = recipeState.recipes.filter((recipe: Recipe) => recipe.featured);
    return (
        <div>
            <Container className='fluid'>
                <Row className='featured-row'>
                    {recipeState.loading === false && recipeState.recipes.length > 0 ? (
                        <>
                            {featuredRecipes.map((aRecipe: Recipe) => (
                                <RecipeCard title={aRecipe.title} url={aRecipe.imageUrl} description={aRecipe.description} key={aRecipe.id} />
                            ))}
                            <Card className='recipe-card'>
                                <Card.Body className='text-center'>See More</Card.Body>
                            </Card>
                        </>
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default FeaturedRecipes;
