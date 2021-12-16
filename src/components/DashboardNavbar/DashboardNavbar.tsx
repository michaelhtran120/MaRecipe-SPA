import React, { useState } from "react";
import "./DashboardNavbar.css";
import logo from "../../assets/images/logo.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux/index";

type Props = {
    toggleLoginModal?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    toggleSignUpModal?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    page: string;
};

const DashboardNavbar = ({ page, toggleLoginModal, toggleSignUpModal }: Props): JSX.Element => {
    // grab state from redux store
    const { user } = useSelector((state: State) => state);

    // Combine dispatch and action creators to have redux methods look like functions.
    const dispatch = useDispatch();
    const { logOut } = bindActionCreators(actionCreators, dispatch);

    const navigate = useNavigate();

    // Local state
    //// Conditionally render navbar UI.
    const [isWindowSmall, setIsWindowSmall] = useState<boolean>(false);

    // Resize event listener to help conditionally render navbar UI
    window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
            setIsWindowSmall(true);
        } else {
            setIsWindowSmall(false);
        }
    });

    // Method to handle log out
    const handleLogOut = () => {
        // redirect user back to landing page
        navigate("/");
        // call redux action method
        logOut();
        // remove user data from localstorage
        localStorage.clear();
    };

    const navigateToDashboard = (): void => {
        //redirect user to dashboard
        navigate("/dashboard");
    };

    return (
        <Navbar sticky='top' bg='light' variant='light' expand='md' className={page === "landing" && !user.userInfo ? "py-3" : "py-2"}>
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand className='ps-3'>
                        <img src={logo} alt='MaRecipe Logo' />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='navbar-nav' />
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
                    <Navbar.Collapse className='ps-3 ps-md-0' id='navbar-nav'>
                        <Nav className='ms-auto'>
                            {isWindowSmall ? (
                                <>
                                    {page === "dashboard" ? (
                                        <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
                                    ) : (
                                        <>
                                            <Nav.Link onClick={navigateToDashboard}>Dashboard</Nav.Link>
                                            <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
                                        </>
                                    )}
                                </>
                            ) : (
                                <NavDropdown
                                    title={
                                        <>
                                            {user.userInfo.user.firstName} {user.userInfo.user.lastName}
                                            <img className='ms-2' src={userIcon} alt='user profile' />
                                        </>
                                    }
                                    id='dashboard-nav-dropdown'
                                >
                                    {page === "dashboard" ? (
                                        <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                                    ) : (
                                        <>
                                            <NavDropdown.Item onClick={navigateToDashboard}>Dashboard</NavDropdown.Item>
                                            <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                                        </>
                                    )}
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;
