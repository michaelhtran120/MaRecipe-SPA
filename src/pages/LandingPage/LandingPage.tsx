import React, { useState } from "react";
import LandingHero from "../../components/LandingHero/LandingHero";
import LandingFeaturesSection from "../../components/LandingFeaturesSection/LandingFeaturesSection";
import LoginModal from "../../components/LogInModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import DashboardNavbar from "../../components/NavbarComponent/NavbarComponent";

const LandingPage = (): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

    const toggleLoginModal = (): void => {
        if (isLoginModalOpen) {
            setIsLoginModalOpen(!isLoginModalOpen);
        }
        setIsLoginModalOpen(!isLoginModalOpen);
    };
    const toggleSignUpModal = (): void => {
        setIsSignUpModalOpen(!isSignUpModalOpen);
    };

    return (
        <div>
            <DashboardNavbar page='landing' toggleLoginModal={toggleLoginModal} toggleSignUpModal={toggleSignUpModal} />
            <LandingHero />
            <LandingFeaturesSection />
            <LoginModal open={isLoginModalOpen} toggleLoginModal={toggleLoginModal} />
            <SignUpModal open={isSignUpModalOpen} toggleSignUpModal={toggleSignUpModal} />
        </div>
    );
};

export default LandingPage;
