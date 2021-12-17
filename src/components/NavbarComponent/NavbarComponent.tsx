import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import styles from "./NavbarComponent.module.css";
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

const NavbarComponent = ({ page, toggleLoginModal, toggleSignUpModal }: Props): JSX.Element => {
    // grab state from redux store
    const { user } = useSelector((state: State) => state);

    // Combine dispatch and action creators to have redux methods look like functions.
    const dispatch = useDispatch();
    const { logOut } = bindActionCreators(actionCreators, dispatch);

    const navigate = useNavigate();

    // Local state
    //// Conditionally render navbar UI.
    //// Check if user on mobile.
    const mobileScreen = window.innerWidth < 768;
    const [isWindowSmall, setIsWindowSmall] = useState<boolean>(mobileScreen);

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
        // call redux action method
        logOut();
        // remove user data from localstorage
        localStorage.clear();
        // redirect user back to landing page
        navigate("/");
    };

    const navigateToDashboard = (): void => {
        //redirect user to dashboard
        navigate("/dashboard");
    };

    return (
        <Navbar
            sticky='top'
            bg='light'
            variant='light'
            expand='md'
            className={`${page === "landing" && !user.userInfo ? "py-3" : "py-2"} ${styles.nav}`}
        >
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand className={"ps-3"}>
                        <img className={styles.navbarBrandImg} src={logo} alt='MaRecipe Logo' />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='navbar-nav' />

                {/* Conditionally render navbar ui depending if redux store has a user logged in */}

                {!user.userInfo ? (
                    <Navbar.Collapse className='ps-3 ps-md-0 justify-content-end' id='navbar-nav'>
                        <Nav className=' justify-content-center align-items-center align-items-md-end'>
                            <Button variant='outline-primary' className='mt-3 mt-md-0 me-md-3 mb-3 mb-md-0' onClick={toggleSignUpModal}>
                                Sign Up
                            </Button>
                            <Button variant='outline-primary' className=' mt-md-0' onClick={toggleLoginModal}>
                                Log In
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                ) : (
                    <Navbar.Collapse className='ps-3 ps-md-0' id='navbar-nav'>
                        <Nav className='ms-auto align-items-center'>
                            {/* Conditionally render a different UI when screen goes to xs / mobile size */}
                            {isWindowSmall ? (
                                <>
                                    {/* Conditionally render depending if navbar is residing on dashboard or landing page */}
                                    {page === "dashboard" ? (
                                        <Nav.Link className={`${styles.dropDownItem}`} onClick={handleLogOut}>
                                            Log Out
                                        </Nav.Link>
                                    ) : (
                                        <>
                                            <Nav.Link className={`${styles.dropDownItem}`} onClick={navigateToDashboard}>
                                                Dashboard
                                            </Nav.Link>
                                            <Nav.Link className={`${styles.dropDownItem}`} onClick={handleLogOut}>
                                                Log Out
                                            </Nav.Link>
                                        </>
                                    )}
                                </>
                            ) : (
                                <NavDropdown
                                    title={
                                        <>
                                            {user.userInfo.user.firstName} {user.userInfo.user.lastName}
                                            <img className={`${styles.navbarDropImg} ms-2`} src={userIcon} alt='user profile' />
                                        </>
                                    }
                                    id='dashboard-nav-dropdown'
                                >
                                    {/* Conditionally render depending if navbar is residing on dashboard or landing page */}
                                    {page === "dashboard" ? (
                                        <NavDropdown.Item className={`${styles.dropDownItem}`} onClick={handleLogOut}>
                                            Log Out
                                        </NavDropdown.Item>
                                    ) : (
                                        <>
                                            <NavDropdown.Item className={`${styles.dropDownItem}`} onClick={navigateToDashboard}>
                                                Dashboard
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className={`${styles.dropDownItem} mt-3`} onClick={handleLogOut}>
                                                Log Out
                                            </NavDropdown.Item>
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

export default NavbarComponent;
