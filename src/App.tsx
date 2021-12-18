import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators, State } from "./redux";

function App() {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(!(localStorage.getItem("user") === null));

    // If user refreshes page, check if there is user data in local
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [user]);
    // If there is user data in local storage, grab that data and dispatch action creator to store the local storage data into redux store.
    useEffect(() => {
        if (isUserLoggedIn) {
            // Argument of type 'string | null' is not assignable to parameter of type 'string'.
            const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");
            dispatch(actionCreators.logInSuccess(localStorageUser));
        }
    }, [isUserLoggedIn, dispatch]);

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='dashboard/*'
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
