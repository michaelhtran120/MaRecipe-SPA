import React, { useEffect, useState } from "react";
import "./DashboardNavbar.css";
import logo from "../../assets/images/logo.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    handleLogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
    currentUser: {
        accessToken: string;
        firstName: string;
        lastName: string;
        id: string;
    };
}

const DashboardNavbar = ({ handleLogOut, currentUser }: Props): JSX.Element => {
    const [isWindowSmall, setIsWindowSmall] = useState<boolean>(false);

    window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
            setIsWindowSmall(true);
        } else {
            setIsWindowSmall(false);
        }
    });

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsWindowSmall(true);
        } else {
            setIsWindowSmall(false);
        }
    }, []);

    return (
        <Navbar sticky='top' bg='light' variant='light' expand='md'>
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand className='ps-3'>
                        <img src={logo} alt='MaRecipe Logo' />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='navbar-nav' />
                <Navbar.Collapse className='ps-3 ps-md-0' id='navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='#' className='active'>
                            Recipes
                        </Nav.Link>
                        <Nav.Link href='#'>Community</Nav.Link>
                        <Nav.Link href='#'>Shopping List</Nav.Link>
                    </Nav>

                    <Nav>
                        {isWindowSmall ? (
                            <>
                                <Nav.Link>Profile</Nav.Link>
                                <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <NavDropdown
                                title={
                                    <>
                                        {currentUser.firstName} {currentUser.lastName}
                                        <img className='ps-1' src={userIcon} alt='user profile' />
                                    </>
                                }
                                id='dashboard-nav-dropdown'
                            >
                                <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;
