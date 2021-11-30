import React, { SyntheticEvent, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";

interface Credentials {
    userCredentials: {
        email: string;
        password: string;
    };
}

// const API_URL = "http://localhost:3004/users/";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<Credentials["userCredentials"]>({
        email: "",
        password: ""
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
        console.log("logged in");
        await fetch("http://localhost:3004/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(() => {
                        logIn();
                        setCredentials({
                            email: "",
                            password: ""
                        });
                    }, 1000);
                }
            })
            .catch((err) => console.log(err.message));
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
                    path='dashboard'
                    element={isUserLoggedIn ? <DashboardPage handleLogOut={handleLogOut} /> : <h1 className='p-3'>Forbidden 404 RAWR</h1>}
                />
                <Route path='*' element={<h1>Page does not exist</h1>} />
            </Routes>
        </div>
    );
}

export default App;
