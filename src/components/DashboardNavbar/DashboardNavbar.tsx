import React from "react";
import "./DashboardNavbar.css";
import logo from "../../assets/images/logo.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

interface Props {
    handleLogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DashboardNavbar = ({ handleLogOut }: Props): JSX.Element => {
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
                        <NavDropdown title={<img src={userIcon} alt='user profile' />} id='dashboard-nav-dropdown'>
                            <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;
