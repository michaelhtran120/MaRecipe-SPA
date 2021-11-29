import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface Props {
    open: boolean;
    toggleLoginModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleLogIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginModal: React.FC<Props> = ({ open, toggleLoginModal, handleLogIn }): JSX.Element => {
    return (
        <>
            <Modal data-testid='loginModal' show={open} onHide={toggleLoginModal} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Remember Me' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'>Close</Button>
                    <Button data-testid='modalLoginBtn' onClick={handleLogIn} variant='primary'>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LoginModal;
