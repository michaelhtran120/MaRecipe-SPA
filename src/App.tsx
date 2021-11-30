import React, { SyntheticEvent, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import axios from "axios";

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

    const handleLogInInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    // const fetchUser = () => {
    //     axios
    //         .get("http://localhost:3004/users")
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    const handleLogInSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("logged in");
        setIsUserLoggedIn(true);
        // fetchUser();
        // setTimeout(() => {
        //     navigate("/dashboard");
        // }, 1000);
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
                            isUserLoggedIn={isUserLoggedIn}
                            handleLogInInput={handleLogInInput}
                        />
                    }
                />
                <Route path='dashboard' element={isUserLoggedIn ? <DashboardPage /> : <h1 className='p-3'>Forbidden 404 RAWR</h1>} />
                <Route path='*' element={<h1>Page does not exist</h1>} />
            </Routes>
        </div>
    );
}

export default App;
