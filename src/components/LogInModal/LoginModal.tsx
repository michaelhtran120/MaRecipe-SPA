import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux/index";
import { useNavigate } from "react-router-dom";

type Credentials = {
    userCredentials: {
        email: string;
        password: string;
    };
};

type Props = {
    open: boolean;
    toggleLoginModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoginModal = ({ open, toggleLoginModal }: Props): JSX.Element => {
    // Get state from redux store
    const user = useSelector((state: State) => state.user);

    // Combine dispatch and action creators to have redux methods look like functions.
    const dispatch = useDispatch();
    const { logIn } = bindActionCreators(actionCreators, dispatch);

    // React Router to navigate to a different page.
    const navigate = useNavigate();

    // Local state
    const [credentials, setCredentials] = useState<Credentials["userCredentials"]>({
        email: "",
        password: ""
    });

    const isComponentMounted = useRef(false);

    const handleLogInInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // redirect the user to the dashboard after log in is successful.
    useEffect(() => {
        if (!isComponentMounted.current) {
            isComponentMounted.current = true;
        } else if (user.userInfo) {
            navigate("dashboard");
        }
    }, [user, navigate]);

    // Method to handle user log in.
    const handleLogInSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        // fire redux action
        logIn(credentials);
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
