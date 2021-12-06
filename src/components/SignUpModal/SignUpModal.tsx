import React, { SyntheticEvent, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";

interface Props {
    open: boolean;
    toggleSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SignUpModal = ({ open, toggleSignUpModal }: Props): JSX.Element => {
    const dispatch = useDispatch();
    // Using logInSuccess action creator to update user state with user sign up data.
    const { logInSuccess } = bindActionCreators(actionCreators, dispatch);

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
                    recipes: []
                })
            });
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            const user = await response.json();
            logInSuccess(user);
            localStorage.setItem("pw", signUpCredentials.password);
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
