import React, { useState } from "react";
import { Button, Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import Image from "react-bootstrap/Image";
import { v4 as uuidv4 } from "uuid";

interface Ingredient {
    id: string;
    name: string;
    quantity: string;
    proteins: string;
    carbs: string;
    fats: string;
}

interface Instruction {
    id: string;
    text: string;
}

export const FormComponent: React.FC = () => {
    const [recipeName, setRecipeName] = useState<string>("");
    const [imageFile, setImageFile] = useState<any>(null);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([
        {
            id: uuidv4(),
            name: "",
            quantity: "",
            proteins: "",
            carbs: "",
            fats: ""
        }
    ]);
    const [instructions, setInstructions] = useState<Instruction[]>([
        {
            id: uuidv4(),
            text: ""
        }
    ]);

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
                text: ""
            }
        ]);
    };

    const handleDeleteIngredient = (ingredientId: string) => {
        setIngredientList(ingredientList.filter((aIngredient) => aIngredient.id !== ingredientId));
    };

    const handleDeleteInstruction = (stepId: string) => {
        setInstructions(instructions.filter((aStep) => aStep.id !== stepId));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "recipeName":
                setRecipeName(e.target.value);
                break;
            case "imageFile":
                if (!e.target.files) return;
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onload = function (event) {
                    // The file's text will be printed here
                    if (!event.target) return;
                    setImageFile(event.target.result);
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
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
            case "text":
                const updatedInstructions = instructions.map((aStep) => {
                    if (aStep.id === e.target.dataset.id) {
                        return {
                            ...aStep,
                            [e.target.name]: e.target.value
                        };
                    } else {
                        return aStep;
                    }
                });
                setInstructions(updatedInstructions);
                break;
            default:
                return;
        }
    };

    return (
        <div>
            <Form className='p-5'>
                <h1 className='text-start'>New Recipe</h1>
                <FormGroup row className='justify-content-start'>
                    <Col md={6}>
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
                        <Label for='imageFile' className='mt-3'>
                            Image File
                        </Label>
                        <Input
                            id='imageFile'
                            name='imageFile'
                            type='file'
                            accept='.png, .jpg, .jpeg'
                            onChange={(event) => {
                                handleInputChange(event);
                            }}
                        />
                        <FormText>Choose a cover photo for your recipe!</FormText>
                    </Col>
                    <Col sm={6}>{imageFile ? <Image src={imageFile} id='image-preview' alt='recipe preview' height='200px' /> : <div></div>}</Col>
                </FormGroup>
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
                {instructions.map((step) => {
                    return (
                        <FormGroup row key={step.id}>
                            <Col sm={11}>
                                <Input
                                    type='text'
                                    placeholder='Add instruction details....'
                                    value={step.text}
                                    id={`${step.id}-text`}
                                    name='text'
                                    onChange={(event) => handleInputChange(event)}
                                    data-id={step.id}
                                />
                            </Col>
                            <Col sm={1}>
                                <Button color='danger' outline onClick={() => handleDeleteInstruction(step.id)}>
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
                <Button color='primary'>Add Recipe</Button>
            </Form>
        </div>
    );
};
