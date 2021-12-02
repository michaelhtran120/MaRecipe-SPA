import React, { SyntheticEvent, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./redux";

interface Credentials {
    userCredentials: {
        email: string;
        password: string;
    };
}

const API_URL = "http://localhost:3004/";

function App() {
    const dispatch = useDispatch();
    const { logIn } = bindActionCreators(actionCreators, dispatch);
    const user = useSelector((state: State) => state.user);

    const [credentials, setCredentials] = useState<Credentials["userCredentials"]>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogInInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
                logIn({
                    accessToken: user.accessToken,
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                    id: user.user.id
                });
                setTimeout(() => {
                    navigate("/dashboard");
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
                            isUserLoggedIn={user.id.length}
                            handleLogInInput={handleLogInInput}
                        />
                    }
                />
                <Route
                    path='dashboard'
                    element={
                        user.id.length ? (
                            <DashboardPage />
                        ) : (
                            <div className='p-5'>
                                <h1>Forbidden 404 RAWR</h1>
                                <Link to='/'>Back To Landing</Link>
                            </div>
                        )
                    }
                />
                <Route
                    path='*'
                    element={
                        <div className='p-5'>
                            <h1>Page does not exist</h1>
                            <Link to='/'>Back To Landing</Link>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
