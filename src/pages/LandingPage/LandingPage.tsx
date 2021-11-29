import React, { useState } from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LandingHero from "../../components/LandingHero/LandingHero";
import LandingFeaturesSection from "../../components/LandingFeaturesSection/LandingFeaturesSection";
import LoginModal from "../../components/LogInModal/LoginModal";

interface Props {
    handleLogIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isUserLoggedIn: boolean;
}

const LandingPage: React.FC<Props> = ({ handleLogIn, isUserLoggedIn }): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

    const toggleLoginModal = (): void => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };
    return (
        <div>
            <LandingNavbar toggleLoginModal={toggleLoginModal} isUserLoggedIn={isUserLoggedIn} />
            <LandingHero />
            <LandingFeaturesSection />
            <LoginModal open={isLoginModalOpen} toggleLoginModal={toggleLoginModal} handleLogIn={handleLogIn} />
        </div>
    );
};

export default LandingPage;
