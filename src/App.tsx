import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleLogIn = (): void => {
        console.log("logged in");
        setIsUserLoggedIn(true);
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    };

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<LandingPage handleLogIn={handleLogIn} isUserLoggedIn={isUserLoggedIn} />} />
                <Route path='dashboard' element={isUserLoggedIn ? <DashboardPage /> : <h1 className='p-3'>Forbidden 404 RAWR</h1>} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    );
}

export default App;
