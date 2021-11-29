import React from "react";
import "./LandingNavbar.css";
import logo from "../../assets/images/Logo.jpg";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

const LandingNavbar: React.FC = () => {
    return (
        <Navbar bg='white' expand='sm'>
            <Container fluid>
                <Navbar.Brand className='ps-3' href='#home'>
                    <img src={logo} alt='MaRecipe Logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {/* <Nav.Link href='#home'>Home</Nav.Link>
                        <Nav.Link href='#link'>Link</Nav.Link> */}
                    </Nav>
                    <Nav>
                        <Button variant='primary' className='me-2'>
                            Sign Up
                        </Button>
                        <Button variant='primary'>Log In</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default LandingNavbar;
