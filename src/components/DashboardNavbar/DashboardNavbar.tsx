import React from "react";
import logo from "../../assets/images/Logo-white.svg";
import "./DashboardNavbar.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardNavbar: React.FC = (): JSX.Element => {
    return (
        <Navbar sticky='top' bg='dark' variant='dark' expand='md'>
            <Container>
                <Navbar.Brand className='ps-3' href='/'>
                    <img src={logo} alt='MaRecipe Logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-nav' />
                <Navbar.Collapse id='navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='#'>Recipes</Nav.Link>
                        <Nav.Link href='#'>Community</Nav.Link>
                        <Nav.Link href='#'>Shopping List</Nav.Link>
                    </Nav>
                    <Nav>
                        <Link to='#'>Profile</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;
