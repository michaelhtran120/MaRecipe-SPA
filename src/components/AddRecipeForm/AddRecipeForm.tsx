import React, { SyntheticEvent, useState } from "react";
import { Button, Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import Image from "react-bootstrap/Image";
import { v4 as uuidv4 } from "uuid";
import { actionCreators, State } from "../../redux/index";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Ingredients, Instructions } from "../../redux/actions/index";

type Props = {
    toggleAddRecipeModal: () => void;
};

const AddRecipeForm = ({ toggleAddRecipeModal }: Props) => {
    const { user } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const { postRecipe } = bindActionCreators(actionCreators, dispatch);
    const [recipeName, setRecipeName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageLink, setImageLink] = useState<string>("");
    const [ingredientList, setIngredientList] = useState<Ingredients[]>([
        {
            id: uuidv4(),
            name: "",
            quantity: "",
            proteins: "",
            carbs: "",
            fats: ""
        }
    ]);
    const [instructions, setInstructions] = useState<Instructions[]>([
        {
            id: uuidv4(),
            instruction: ""
        }
    ]);
    const [servings, setServings] = useState<string>("1");
    const [favorite, setFavorite] = useState<boolean>(false);
    const handleAddIngredient = () => {
        setIngredientList([
            ...ingredientList,
            {
                id: uuidv4(),
                name: "",
                quantity: "",
                proteins: "",
                carbs: "",
                fats: ""
            }
        ]);
    };
    const handleAddInstruction = () => {
        setInstructions([
            ...instructions,
            {
                id: uuidv4(),
                instruction: ""
            }
        ]);
    };
    const handleDeleteIngredient = (ingredientId: string) => {
        setIngredientList(ingredientList.filter((aIngredient) => aIngredient.id !== ingredientId));
    };
    const handleDeleteInstruction = (stepId: string) => {
        setInstructions(instructions.filter((aInstruction) => aInstruction.id !== stepId));
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "recipeName":
                setRecipeName(e.target.value);
                break;
            case "imageLink":
                setImageLink(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "name":
            case "quantity":
            case "proteins":
            case "carbs":
            case "fats":
                const updatedIngredientList = ingredientList.map((aIngredient) => {
                    if (aIngredient.id === e.target.dataset.id) {
                        return {
                            ...aIngredient,
                            [e.target.name]: e.target.value
                        };
                    } else {
                        return aIngredient;
                    }
                });
                setIngredientList(updatedIngredientList);
                break;
            case "instruction":
                const updatedInstructions = instructions.map((aInstruction) => {
                    if (aInstruction.id === e.target.dataset.id) {
                        return {
                            ...aInstruction,
                            [e.target.name]: e.target.value
                        };
                    } else {
                        return aInstruction;
                    }
                });
                setInstructions(updatedInstructions);
                break;
            case "servings":
                setServings(e.target.value);
                break;
            case "favorite":
                setFavorite(e.target.checked);
                break;
            default:
                return;
        }
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const newRecipe = {
            id: uuidv4(),
            name: recipeName,
            imageUrl: imageLink,
            description: description,
            ingredients: ingredientList,
            servings: servings,
            instructions: instructions,
            favorite: favorite
        };
        const newUserRecipeArray = [...user.userInfo.user.recipes, newRecipe];
        postRecipe(newUserRecipeArray, user.userInfo, toggleAddRecipeModal);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} className='p-5 pt-0'>
                <Row className='justify-content-start'>
                    <Col md={6}>
                        <FormGroup>
                            <Label for='recipeName'>Recipe Name</Label>
                            <Input
                                id='recipeName'
                                value={recipeName}
                                name='recipeName'
                                placeholder='Recipe Name'
                                type='text'
                                onChange={(event) => {
                                    handleInputChange(event);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='imageLink' className='mt-3'>
                                Image Link
                            </Label>
                            <Input
                                id='imageLink'
                                name='imageLink'
                                type='text'
                                value={imageLink}
                                onChange={(event) => {
                                    handleInputChange(event);
                                }}
                            />
                            <FormText>Provide a link to a cover photo for your recipe!</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for='description' className='mt-3'>
                                Description (Max 200 characters)
                            </Label>
                            <Input
                                id='description'
                                name='description'
                                type='textarea'
                                value={description}
                                onChange={(event) => {
                                    handleInputChange(event);
                                }}
                                style={{ height: "200px" }}
                                maxLength={200}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <Label>Image Preview</Label>
                        <hr />
                        {imageLink ? (
                            <>
                                <Image src={imageLink} id='image-preview' alt='recipe preview' style={{ maxWidth: "300px" }} />
                            </>
                        ) : (
                            <div></div>
                        )}
                    </Col>
                </Row>
                <hr />
                <h4>Ingredients</h4>
                <Row className='d-none d-md-flex'>
                    <Col sm={3}>
                        <Label>Ingredient name</Label>
                    </Col>
                    <Col sm={2}>
                        <Label>Quantity in grams</Label>
                    </Col>
                    <Col sm={2}>
                        <Label>Protein in grams</Label>
                    </Col>
                    <Col sm={2}>
                        <Label>Carbs in grams</Label>
                    </Col>
                    <Col sm={2}>
                        <Label>Fats in grams</Label>
                    </Col>
                </Row>
                <hr />
                {ingredientList.map((ingredient) => {
                    return (
                        <FormGroup row key={ingredient.id}>
                            <Col sm={3}>
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    value={ingredient.name}
                                    id={`${ingredient.id}-name`}
                                    name='name'
                                    data-id={ingredient.id}
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Col>
                            <Col sm={2}>
                                <Input
                                    type='number'
                                    placeholder='Qty in grams'
                                    value={ingredient.quantity}
                                    name='quantity'
                                    data-id={ingredient.id}
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Col>
                            <Col sm={2}>
                                <Input
                                    type='number'
                                    placeholder='Protein in grams'
                                    value={ingredient.proteins}
                                    name='proteins'
                                    data-id={ingredient.id}
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Col>
                            <Col sm={2}>
                                <Input
                                    type='number'
                                    placeholder='Carbs in grams'
                                    value={ingredient.carbs}
                                    name='carbs'
                                    data-id={ingredient.id}
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Col>
                            <Col sm={2}>
                                <Input
                                    type='number'
                                    placeholder='Fats in grams'
                                    value={ingredient.fats}
                                    name='fats'
                                    data-id={ingredient.id}
                                    onChange={(event) => handleInputChange(event)}
                                />
                            </Col>
                            <Col sm={1}>
                                <Button color='danger' outline onClick={() => handleDeleteIngredient(ingredient.id)}>
                                    X
                                </Button>
                            </Col>
                        </FormGroup>
                    );
                })}
                <Button color='primary' outline onClick={handleAddIngredient}>
                    Add Ingredient
                </Button>
                <hr />
                <h4>Cooking Instructions</h4>
                {instructions.map((aInstruction) => {
                    return (
                        <FormGroup row key={aInstruction.id}>
                            <Col sm={11}>
                                <Input
                                    type='text'
                                    placeholder='Add instruction details....'
                                    value={aInstruction.instruction}
                                    id={`${aInstruction.id}-text`}
                                    name='instruction'
                                    onChange={(event) => handleInputChange(event)}
                                    data-id={aInstruction.id}
                                />
                            </Col>
                            <Col sm={1}>
                                <Button color='danger' outline onClick={() => handleDeleteInstruction(aInstruction.id)}>
                                    X
                                </Button>
                            </Col>
                        </FormGroup>
                    );
                })}
                <Button color='primary' onClick={handleAddInstruction} outline>
                    Add Instruction
                </Button>
                <hr />
                <FormGroup>
                    <Col xs={12} md={6} lg={4}>
                        <Label for='servings'>Serving Quantity</Label>
                        <Input
                            id='servings'
                            value={servings}
                            name='servings'
                            placeholder='Servings..'
                            type='number'
                            onChange={(event) => {
                                handleInputChange(event);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        Favorite?
                        <Input type='checkbox' name='favorite' value='favorite' onChange={(event) => handleInputChange(event)} />
                    </Label>
                </FormGroup>
                <hr />
                <Button type='submit' color='primary'>
                    Add Recipe
                </Button>
            </Form>
        </div>
    );
};
export default AddRecipeForm;
