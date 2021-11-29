import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='dashboard' element={<DashboardPage />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    );
}

export default App;
