import React, { SyntheticEvent, useState } from "react";
import infoIcon from "../../assets/images/info-circle.svg";
import styles from "./EditRecipeForm.module.css";
import { Button, Col, Form, FormGroup, FormText, Input, Label, Row, Collapse } from "reactstrap";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { actionCreators, State } from "../../redux/index";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Recipe, Ingredients, Instructions } from "../../redux/actions/index";
import { useNavigate } from "react-router";

type Props = {
    toggleEditRecipeModal: () => void;
    recipe: Recipe;
};

const EditRecipeForm = ({ toggleEditRecipeModal, recipe }: Props) => {
    // Grab state from redux store
    const { user } = useSelector((state: State) => state);

    // Combine dispatch and action creators to have redux methods look like functions.
    const dispatch = useDispatch();
    const { postRecipe } = bindActionCreators(actionCreators, dispatch);

    // React Router to navigate to a different page.
    const navigate = useNavigate();

    // Local state management
    const [isIngredientOpen, setIsIngredientOpen] = useState<boolean>(false);
    const [isInstructionOpen, setIsInstructionOpen] = useState<boolean>(false);
    const [recipeName, setRecipeName] = useState<string>(recipe.name);
    const [description, setDescription] = useState<string>(recipe.description);
    const [imageLink, setImageLink] = useState<string>(recipe.imageUrl);
    const [ingredientList, setIngredientList] = useState<Ingredients[]>(recipe.ingredients);
    const [instructions, setInstructions] = useState<Instructions[]>(recipe.instructions);
    const [servings, setServings] = useState<string>(recipe.servings);
    const [favorite, setFavorite] = useState<boolean>(recipe.favorite);

    const toggleIngredientOpen = () => {
        setIsIngredientOpen(!isIngredientOpen);
    };
    const toggleInstructionOpen = () => {
        setIsInstructionOpen(!isInstructionOpen);
    };

    // Methods to add ingredient/instructions inputs
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

    // Methods to handle delete ingredient/instructions inputs
    const handleDeleteIngredient = (ingredientId: string) => {
        setIngredientList(ingredientList.filter((aIngredient) => aIngredient.id !== ingredientId));
    };
    const handleDeleteInstruction = (stepId: string) => {
        setInstructions(instructions.filter((aInstruction) => aInstruction.id !== stepId));
    };

    // Method to handle input change for all inputs
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

    // Method to handle form submit
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        recipe.name = recipeName;
        recipe.imageUrl = imageLink;
        recipe.description = description;
        recipe.ingredients = ingredientList;
        recipe.instructions = instructions;
        recipe.servings = servings;
        recipe.favorite = favorite;

        let newUserRecipeArray = user.userInfo.user.recipes.filter((aRecipe: Recipe) => aRecipe.id !== recipe.id);
        newUserRecipeArray = [recipe, ...newUserRecipeArray];
        console.log(newUserRecipeArray);
        // Call redux method/action to send HTTP request and update redux store.
        postRecipe(newUserRecipeArray, user.userInfo, toggleEditRecipeModal);
        // Call navigate here to redirect back to the recipe page to refresh recipe data after update.
        navigate(`/dashboard/${recipe.id}`);
    };
    return (
        <div>
            <Form onSubmit={handleSubmit} className='p-md-5 pt-0'>
                <Row className='justify-content-start'>
                    <Col md={6}>
                        <FormGroup>
                            <Label className={`${styles.formLabel}`} for='recipeName'>
                                Recipe Name
                                <OverlayTrigger key='right' placement='right' overlay={<Tooltip id='recipe-name-tooltip'>Max 50 characters</Tooltip>}>
                                    <Image className='ms-2 info-icon' src={infoIcon} />
                                </OverlayTrigger>
                            </Label>
                            <Input
                                id='recipeName'
                                value={recipeName}
                                name='recipeName'
                                placeholder='Recipe Name'
                                type='text'
                                onChange={(event) => {
                                    handleInputChange(event);
                                }}
                                maxLength={50}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='imageLink' className={`${styles.formLabel}`}>
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
                            <Label for='description' className={`${styles.formLabel} align-items-center d-flex`}>
                                Description
                                <OverlayTrigger
                                    key='right'
                                    placement='right'
                                    overlay={<Tooltip id='description-tooltip'>Max 200 characters</Tooltip>}
                                >
                                    <Image className='ms-2 info-icon' src={infoIcon} />
                                </OverlayTrigger>
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
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <Label className={`${styles.formLabel}`}>Image Preview</Label>
                        <hr />
                        {imageLink ? (
                            <>
                                <Image src={imageLink} id='image-preview' alt='recipe preview' className={styles.previewImage} />
                            </>
                        ) : (
                            <div></div>
                        )}
                    </Col>
                </Row>
                <hr />
                <Row className='flex-row pb-3 px-2 justify-content-between'>
                    <Label className={`${styles.formLabel} col-5`}>
                        Ingredients
                        <OverlayTrigger
                            key='right'
                            placement='right'
                            overlay={<Tooltip id='recipe-name-tooltip'>Measurements are in grams for accuracy</Tooltip>}
                        >
                            <Image className='ms-2 info-icon' src={infoIcon} />
                        </OverlayTrigger>
                    </Label>
                    <Button size='sm' className='col-3' onClick={toggleIngredientOpen}>
                        {isIngredientOpen ? "Collapse" : "Expand"}
                    </Button>
                </Row>
                <Collapse isOpen={isIngredientOpen}>
                    <Row className='d-none d-md-flex'>
                        <Col sm={3}>
                            <Label>Name</Label>
                        </Col>
                        <Col sm={2}>
                            <Label>Quantity</Label>
                        </Col>
                        <Col sm={2}>
                            <Label>Protein</Label>
                        </Col>
                        <Col sm={2}>
                            <Label>Carbs</Label>
                        </Col>
                        <Col sm={2}>
                            <Label>Fats</Label>
                        </Col>
                    </Row>
                    {ingredientList.map((ingredient) => {
                        return (
                            <FormGroup row key={ingredient.id} className='align-items-center'>
                                <Col xs={2} className='d-sm-none'>
                                    <Label>Name</Label>
                                </Col>
                                <Col xs={10} sm={3}>
                                    <Input
                                        type='text'
                                        placeholder='Name'
                                        value={ingredient.name}
                                        id={`${ingredient.id}-name`}
                                        name='name'
                                        data-id={ingredient.id}
                                        onChange={(event) => handleInputChange(event)}
                                        required
                                    />
                                </Col>
                                <Col xs={2} className='d-sm-none'>
                                    <Label>Quantity</Label>
                                </Col>
                                <Col xs={10} sm={2}>
                                    <Input
                                        type='number'
                                        placeholder='Qty in grams'
                                        value={ingredient.quantity}
                                        name='quantity'
                                        data-id={ingredient.id}
                                        onChange={(event) => handleInputChange(event)}
                                        min='0'
                                        required
                                    />
                                </Col>
                                <Col xs={2} className='d-sm-none'>
                                    <Label>Proteins</Label>
                                </Col>
                                <Col xs={10} sm={2}>
                                    <Input
                                        type='number'
                                        placeholder='Protein in grams'
                                        value={ingredient.proteins}
                                        name='proteins'
                                        data-id={ingredient.id}
                                        onChange={(event) => handleInputChange(event)}
                                        min='0'
                                        required
                                    />
                                </Col>
                                <Col xs={2} className='d-sm-none'>
                                    <Label>Carbs</Label>
                                </Col>
                                <Col xs={10} sm={2}>
                                    <Input
                                        type='number'
                                        placeholder='Carbs in grams'
                                        value={ingredient.carbs}
                                        name='carbs'
                                        data-id={ingredient.id}
                                        onChange={(event) => handleInputChange(event)}
                                        min='0'
                                        required
                                    />
                                </Col>
                                <Col xs={2} className='d-sm-none'>
                                    <Label>Fats</Label>
                                </Col>
                                <Col xs={10} sm={2}>
                                    <Input
                                        type='number'
                                        placeholder='Fats in grams'
                                        value={ingredient.fats}
                                        name='fats'
                                        data-id={ingredient.id}
                                        onChange={(event) => handleInputChange(event)}
                                        min='0'
                                        required
                                    />
                                </Col>
                                <Col sm={1} className='ps-sm-0'>
                                    <Button
                                        className={`${styles.deleteBtn} mt-3 mt-sm-0`}
                                        color='danger'
                                        outline
                                        onClick={() => handleDeleteIngredient(ingredient.id)}
                                    >
                                        X
                                    </Button>
                                </Col>
                            </FormGroup>
                        );
                    })}
                    <Button color='secondary' onClick={handleAddIngredient}>
                        Add Ingredient
                    </Button>
                </Collapse>
                <hr />
                <Row className='flex-row pb-3 px-2 justify-content-between'>
                    <Label className={`${styles.formLabel} col-5`}>Instructions</Label>
                    <Button size='sm' className='col-3' onClick={toggleInstructionOpen}>
                        {isInstructionOpen ? "Collapse" : "Expand"}
                    </Button>
                </Row>
                <Collapse isOpen={isInstructionOpen}>
                    {instructions.map((aInstruction) => {
                        return (
                            <FormGroup row key={aInstruction.id}>
                                <Col xs={10} sm={11}>
                                    <Input
                                        type='text'
                                        placeholder='Add instruction details....'
                                        value={aInstruction.instruction}
                                        id={`${aInstruction.id}-text`}
                                        name='instruction'
                                        onChange={(event) => handleInputChange(event)}
                                        data-id={aInstruction.id}
                                        required
                                    />
                                </Col>
                                <Col xs={2} sm={1}>
                                    <Button
                                        className={`${styles.deleteBtn}`}
                                        color='danger'
                                        outline
                                        onClick={() => handleDeleteInstruction(aInstruction.id)}
                                    >
                                        X
                                    </Button>
                                </Col>
                            </FormGroup>
                        );
                    })}
                    <Button color='secondary' onClick={handleAddInstruction}>
                        Add Instruction
                    </Button>
                </Collapse>
                <hr />
                <FormGroup>
                    <Col xs={12} md={6} lg={4}>
                        <Label for='servings'>
                            Serving Quantity
                            <OverlayTrigger
                                key='right'
                                placement='right'
                                overlay={
                                    <Tooltip id='recipe-name-tooltip'>Servings the recipe makes for accurate macros and calorie calculation</Tooltip>
                                }
                            >
                                <Image className='ms-2 info-icon' src={infoIcon} />
                            </OverlayTrigger>
                        </Label>
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
                        <Input type='checkbox' name='favorite' defaultChecked={favorite} onChange={(event) => handleInputChange(event)} />
                    </Label>
                </FormGroup>
                <hr />
                <Button type='submit' color='primary' className={styles.saveBtn}>
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};
export default EditRecipeForm;
