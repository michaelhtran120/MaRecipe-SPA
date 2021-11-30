import React, { SyntheticEvent, useEffect, useState } from "react";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import LandingHero from "../../components/LandingHero/LandingHero";
import LandingFeaturesSection from "../../components/LandingFeaturesSection/LandingFeaturesSection";
import LoginModal from "../../components/LogInModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { v4 as uuidv4 } from "uuid";

interface Props {
    handleLogInSubmit: (event: SyntheticEvent) => void;
    handleLogInInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isUserLoggedIn: boolean;
    email: string;
    password: string;
}

// interface Credentials {
//     signUp: {
//         email: string;
//         password: string;
//         firstName: string;
//         lastName: string;
//     };
// }

const LandingPage: React.FC<Props> = ({ email, password, handleLogInSubmit, isUserLoggedIn, handleLogInInput }): JSX.Element => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

    const [signUpCredentials, setSignUpCredentials] = useState({
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const toggleLoginModal = (): void => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };
    const toggleSignUpModal = (): void => {
        setIsSignUpModalOpen(!isSignUpModalOpen);
    };

    const handleSignUpSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("submit");
        await fetch("http://localhost:3004/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: uuidv4(),
                firstName: signUpCredentials.firstName,
                lastName: signUpCredentials.lastName,
                email: signUpCredentials.email,
                password: signUpCredentials.password
            })
        });
    };

    const handleSignUpInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignUpCredentials({ ...signUpCredentials, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        console.log(signUpCredentials);
    }, [signUpCredentials]);
    return (
        <div>
            <LandingNavbar toggleLoginModal={toggleLoginModal} toggleSignUpModal={toggleSignUpModal} isUserLoggedIn={isUserLoggedIn} />
            <LandingHero />
            <LandingFeaturesSection />
            <LoginModal
                email={email}
                password={password}
                open={isLoginModalOpen}
                toggleLoginModal={toggleLoginModal}
                handleLogInSubmit={handleLogInSubmit}
                handleLogInInput={handleLogInInput}
            />
            <SignUpModal
                open={isSignUpModalOpen}
                handleSignUpSubmit={handleSignUpSubmit}
                handleSignUpInput={handleSignUpInput}
                signUpCredentials={signUpCredentials}
                toggleSignUpModal={toggleSignUpModal}
            />
        </div>
    );
};

export default LandingPage;
