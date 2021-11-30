import React from "react";
import "./DashboardNavbar.css";
import logo from "../../assets/images/logo.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardNavbar: React.FC = (): JSX.Element => {
    return (
        <Navbar sticky='top' bg='light' variant='light' expand='md'>
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
                        <Link to='#'>
                            <img src={userIcon} alt='user profile' />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;
