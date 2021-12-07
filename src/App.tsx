import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./redux";

import { State } from "./redux";

function App() {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(!(localStorage.getItem("user") === null));

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsUserLoggedIn(true);
            console.log(user);
        } else {
            setIsUserLoggedIn(false);
            console.log(user);
        }
    }, [user]);

    useEffect(() => {
        if (isUserLoggedIn) {
            const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");
            // console.log(localStorageUser);
            // console.log(localStorageUser.user);
            dispatch(actionCreators.logInSuccess(localStorageUser));
        }
    }, [isUserLoggedIn, dispatch]);

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
