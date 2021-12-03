import React from "react";
import "./LandingNavbar.css";
import logo from "../../assets/images/Logo.jpg";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../redux";
interface Props {
    toggleLoginModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    toggleSignUpModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LandingNavbar: React.FC<Props> = ({ toggleSignUpModal, toggleLoginModal }): JSX.Element => {
    const user = useSelector((state: State) => state.user);

    return (
        <Navbar sticky='top' bg='white' expand='sm'>
            <Container fluid>
                <Navbar.Brand className='ps-3' href='#home'>
                    <img src={logo} alt='MaRecipe Logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-nav' />
                <Navbar.Collapse id='navbar-nav'>
                    <Nav className='me-auto'>
                        {/* <Nav.Link href='#home'>Home</Nav.Link>
                        <Nav.Link href='#link'>Link</Nav.Link> */}
                    </Nav>
                    {!user.userInfo ? (
                        <Nav className='justify-content-end align-items-end'>
                            <Button variant='outline-primary' className=' mt-sm-0 ms-3 me-sm-2 my-2 my-sm-0' onClick={toggleSignUpModal}>
                                Sign Up
                            </Button>
                            <Button variant='outline-primary' className=' mt-sm-0' onClick={toggleLoginModal}>
                                Log In
                            </Button>
                        </Nav>
                    ) : (
                        <Link to='/dashboard'>Dashboard</Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default LandingNavbar;
