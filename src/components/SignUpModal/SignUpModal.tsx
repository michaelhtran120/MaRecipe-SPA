import React, { SyntheticEvent, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { actionCreators, useAppDispatch } from "../../redux/index";

interface Props {
    open: boolean;
    toggleSignUpModal: () => void;
}

const SignUpModal = ({ open, toggleSignUpModal }: Props): JSX.Element => {
    const dispatch = useAppDispatch();

    // React Router to navigate to a different page.
    const navigate = useNavigate();

    // Local state management for input fields
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
        // Redux think action returns promise, if response contains accesstoken, close modal and navigate user to dashboard.
        //Prior to this, the dashboard page would render before redux store received a valid user, which would render "forbidden page" for a split second then properly render the dashboard to user.
        (async () => {
            const response = await dispatch(actionCreators.signUp(signUpCredentials) as any);
            if (response.accessToken) {
                toggleSignUpModal();
                alert("Account successfully created");
                navigate("/dashboard");
            } else {
                alert(response);
            }
        })();
    };

    return (
        <>
            <Modal data-testid='signUpModal' show={open} onHide={toggleSignUpModal} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSignUpSubmit}>
                    <Modal.Body>
                        <Row>
                            <Form.Group as={Col} sm={6} controlId='firstName' className='mb-3'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    data-testid='input'
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
                                    data-testid='input'
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
                                data-testid='input'
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
                                data-testid='input'
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
                        <Button as='input' variant='secondary' type='button' onClick={toggleSignUpModal} value='Close' />
                        <Button as='input' type='submit' variant='primary' value='Sign Up' />
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default SignUpModal;
