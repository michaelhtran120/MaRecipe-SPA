import React, { useEffect, useState } from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LandingHero from "../../components/LandingHero/LandingHero";
import LandingFeaturesSection from "../../components/LandingFeaturesSection/LandingFeaturesSection";
import LoginModal from "../../components/LogInModal/LoginModal";
import { useNavigate } from "react-router";

const LandingPage: React.FC = (): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    const navigate = useNavigate();

    const toggleLoginModal = (): void => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const handleLogin = (): void => {
        console.log("logged in");
        setIsUserLoggedIn(!isUserLoggedIn);
    };

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/dashboard");
        }
    }, [isUserLoggedIn]);

    return (
        <div>
            <LandingNavbar toggleLoginModal={toggleLoginModal} isUserLoggedIn={isUserLoggedIn} />
            <LandingHero />
            <LandingFeaturesSection />
            <LoginModal open={isLoginModalOpen} toggleLoginModal={toggleLoginModal} handleLogIn={handleLogin} />
        </div>
    );
};

export default LandingPage;
