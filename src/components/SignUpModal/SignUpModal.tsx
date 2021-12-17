import React, { SyntheticEvent, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { actionCreators } from "../../redux/index";

interface Props {
    open: boolean;
    toggleSignUpModal: () => void;
}

const SignUpModal = ({ open, toggleSignUpModal }: Props): JSX.Element => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [signUpCredentials, setSignUpCredentials] = useState({
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    // Form control method
    const handleSignUpInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignUpCredentials({ ...signUpCredentials, [e.target.name]: e.target.value });
    };

    const handleSignUpSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        // Redux think action returns promise, if response contains accesstoken, close modal and navigate user to dashboard
        (async () => {
            const response = await dispatch(actionCreators.signUp(signUpCredentials) as any);
            if (response.accessToken) {
                toggleSignUpModal();
                alert('Account successfully created')
                navigate("/dashboard");
            } else {
                alert(response);
            }
        })();
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
