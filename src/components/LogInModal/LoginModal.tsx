import React, { SyntheticEvent } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
    open: boolean;
    toggleLoginModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogInSubmit: (event: SyntheticEvent) => void;
    handleLogInInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    password: string;
}

const LoginModal = ({ open, email, password, toggleLoginModal, handleLogInSubmit, handleLogInInput }: Props): JSX.Element => {
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
                            <Form.Control type='email' name='email' value={email} placeholder='Enter email' onChange={handleLogInInput} required />
                        </Form.Group>
                        <Form.Group controlId='password' className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={password}
                                placeholder='Password'
                                onChange={handleLogInInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formCheckbox'>
                            <Form.Check type='checkbox' label='Remember Me' />
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
