import React, { SyntheticEvent, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";

const sampleRecipe = {
    id: "2c7bd673-9a2a-4cfe-bb83-e1bf295486dc",
    name: "SAMPLE RECIPE",
    imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    description: "This is a sample recipe",
    ingredients: [
        {
            id: "ing1",
            name: "SAMPLE INGREDIENT 1",
            quantity: "10",
            proteins: "10",
            carbs: "10",
            fats: "10"
        },
        {
            id: "ing2",
            name: "SAMPLE INGREDIENT 2",
            quantity: "10",
            proteins: "10",
            carbs: "10",
            fats: "10"
        }
    ],
    servings: "1",
    instructions: [
        {
            id: "62115b15-f9bc-4f95-802e-6a6d7210cc12",
            instruction: "SAMPLE INSTRUCTION 1"
        },
        {
            id: "7c27ffc6-2ab6-4098-8cdb-6ed455ed2126",
            instruction: "SAMPLE INSTRUCTION 2"
        }
    ],
    favorite: true
};

interface Props {
    open: boolean;
    toggleSignUpModal: () => void;
}

const SignUpModal = ({ open, toggleSignUpModal }: Props): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Using logInSuccess action creator to update user state with user sign up data.
    const { logIn } = bindActionCreators(actionCreators, dispatch);

    const [signUpCredentials, setSignUpCredentials] = useState({
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const handleSignUpInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignUpCredentials({ ...signUpCredentials, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3004/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    firstName: signUpCredentials.firstName,
                    lastName: signUpCredentials.lastName,
                    email: signUpCredentials.email,
                    password: signUpCredentials.password,
                    recipes: [sampleRecipe]
                })
            });
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            const user = await response.json();
            console.log(user);
            const logInCredentials = {
                email: signUpCredentials.email,
                password: signUpCredentials.password
            };
            logIn(logInCredentials);
            localStorage.setItem("pw", signUpCredentials.password);
            toggleSignUpModal();
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal show={open} onHide={toggleSignUpModal} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSignUpSubmit}>
                    <Modal.Body>
                        <Row>
                            <Form.Group as={Col} sm={6} controlId='firstName' className='mb-3'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='firstName'
                                    value={signUpCredentials.firstName}
                                    placeholder='First Name'
                                    onChange={handleSignUpInput}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId='lastName' className='mb-3' as={Col} sm={6}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='lastName'
                                    value={signUpCredentials.lastName}
                                    placeholder='Last Name'
                                    onChange={handleSignUpInput}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group controlId='email' className='mb-3'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                value={signUpCredentials.email}
                                placeholder='Enter email'
                                onChange={handleSignUpInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='password' className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={signUpCredentials.password}
                                placeholder='Password'
                                onChange={handleSignUpInput}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={toggleSignUpModal}>
                            Close
                        </Button>
                        <Button data-testid='modalLoginBtn' type='submit' variant='primary'>
                            Sign Up
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default SignUpModal;
