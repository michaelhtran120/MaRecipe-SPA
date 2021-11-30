import React, { SyntheticEvent } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

interface Props {
    open: boolean;
    toggleSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleSignUpSubmit: (event: SyntheticEvent) => void;
    handleSignUpInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signUpCredentials: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    };
}

const SignUpModal = ({ open, signUpCredentials, toggleSignUpModal, handleSignUpSubmit, handleSignUpInput }: Props): JSX.Element => {
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
