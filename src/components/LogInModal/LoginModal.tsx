import React, { SyntheticEvent, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { actionCreators, useAppDispatch } from "../../redux/index";
import { useNavigate } from "react-router-dom";

type Credentials = {
    email: string;
    password: string;
};

type Props = {
    open: boolean;
    toggleLoginModal: () => void;
};

const LoginModal = ({ open, toggleLoginModal }: Props): JSX.Element => {
    const dispatch = useAppDispatch();

    // React Router to navigate to a different page.
    const navigate = useNavigate();

    // Local state
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: ""
    });

    const handleLogInInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogInSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        // Redux think action returns promise, if response contains accesstoken, close modal and navigate user to dashboard
        //Prior to this, the dashboard page would render before redux store received a valid user, which would render "forbidden page" for a split second then properly render the dashboard to user.
        (async () => {
            const response = await dispatch(actionCreators.logIn(credentials) as any);
            if (response.accessToken) {
                toggleLoginModal();
                navigate("/dashboard");
            } else {
                alert(response);
            }
        })();
    };

    return (
        <>
            <Modal data-testid='loginModal' show={open} onHide={toggleLoginModal} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleLogInSubmit}>
                    <Modal.Body>
                        <Form.Group controlId='email' className='mb-3'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                data-testid='input'
                                type='email'
                                name='email'
                                value={credentials.email}
                                placeholder='Enter email'
                                onChange={handleLogInInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='password' className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                data-testid='input'
                                type='password'
                                name='password'
                                value={credentials.password}
                                placeholder='Password'
                                onChange={handleLogInInput}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={toggleLoginModal}>
                            Close
                        </Button>
                        <Button data-testid='modalLoginBtn' type='submit' variant='primary'>
                            Log In
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default LoginModal;
