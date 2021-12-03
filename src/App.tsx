import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useSelector } from "react-redux";

import { State } from "./redux";

function App() {
    const user = useSelector((state: State) => state.user);

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='dashboard'
                    element={
                        user.userInfo ? (
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
