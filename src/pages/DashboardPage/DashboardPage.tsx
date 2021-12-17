import React from "react";
import "./DashboardPage.css";
import { Routes, Route } from "react-router-dom";
import DashboardNavbar from "../../components/NavbarComponent/NavbarComponent";
import Dashboard from "../../components/Dashboard/Dashboard";
import RecipePage from "../ViewRecipePage/RecipePage";

const DashboardPage = () => {
    return (
        <div>
            <DashboardNavbar page='dashboard' />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/:recipeId' element={<RecipePage />} />
            </Routes>
        </div>
    );
};

export default DashboardPage;
