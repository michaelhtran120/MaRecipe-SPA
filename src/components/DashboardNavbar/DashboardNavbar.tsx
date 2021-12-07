import React, { useEffect, useState } from "react";
import "./DashboardNavbar.css";
import logo from "../../assets/images/logo.svg";
import userIcon from "../../assets/images/user-icon.svg";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux/index";

const DashboardNavbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const { logOut } = bindActionCreators(actionCreators, dispatch);
    const { user } = useSelector((state: State) => state);

    const [isWindowSmall, setIsWindowSmall] = useState<boolean>(false);

    const navigate = useNavigate();

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

    const handleLogOut = () => {
        navigate("/");
        logOut();
        localStorage.clear();
    };

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
                    <Nav className='ms-auto'>
                        {isWindowSmall ? (
                            <>
                                <Nav.Link>Profile</Nav.Link>
                                <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
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
