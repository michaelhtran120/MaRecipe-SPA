import React, { SyntheticEvent, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";

interface Credentials {
    userCredentials: {
        email: string;
        password: string;
    };
    currentUser: {
        accessToken: string;
        firstName: string;
        lastName: string;
        id: string;
    };
}

const API_URL = "http://localhost:3004/";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<Credentials["userCredentials"]>({
        email: "",
        password: ""
    });
    const [currentUser, setCurrentUser] = useState<Credentials["currentUser"]>({
        accessToken: "",
        firstName: "",
        lastName: "",
        id: ""
    });
    const navigate = useNavigate();
    const handleLogInInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const logIn = (): void => {
        setIsUserLoggedIn(true);
        navigate("/dashboard");
    };

    const handleLogInSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(API_URL + "login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });
            if (response.status === 200) {
                const user = await response.json();
                setCurrentUser({
                    accessToken: user.accessToken,
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                    id: user.user.id
                });
                setTimeout(() => {
                    logIn();
                    setCredentials({
                        email: "",
                        password: ""
                    });
                }, 1000);
            } else if (response.status === 400) {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogOut = () => {
        setIsUserLoggedIn(false);
        alert("Logged Out");
        navigate("/");
    };

    return (
        <div className='App'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <LandingPage
                            email={credentials.email}
                            password={credentials.password}
                            handleLogInSubmit={handleLogInSubmit}
                            logIn={logIn}
                            isUserLoggedIn={isUserLoggedIn}
                            handleLogInInput={handleLogInInput}
                        />
                    }
                />
                <Route
                    path='dashboard/*'
                    element={
                        isUserLoggedIn ? (
                            <DashboardPage currentUser={currentUser} handleLogOut={handleLogOut} />
                        ) : (
                            <h1 className='p-3'>Forbidden 404 RAWR</h1>
                        )
                    }
                />
                <Route path='*' element={<h1>Page does not exist</h1>} />
            </Routes>
        </div>
    );
}

export default App;
