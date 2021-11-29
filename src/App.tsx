import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<LandingPage />}></Route>
                <Route path='dashboard' element={<DashboardPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
