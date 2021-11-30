import React, { SyntheticEvent, useState } from "react";
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
    logIn: () => void;
    email: string;
    password: string;
}

const LandingPage = ({ email, password, handleLogInSubmit, isUserLoggedIn, handleLogInInput, logIn }: Props): JSX.Element => {
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
        if (isLoginModalOpen) {
            setIsLoginModalOpen(!isLoginModalOpen);
        }
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleSignUpModal = (): void => {
        setIsSignUpModalOpen(!isSignUpModalOpen);
    };

    const handleSignUpSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        await fetch("http://localhost:3004/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id: uuidv4(),
                firstName: signUpCredentials.firstName,
                lastName: signUpCredentials.lastName,
                email: signUpCredentials.email,
                password: signUpCredentials.password
            })
        })
            .then((res) => {
                console.log(res);
                if (res.status === 400) {
                    alert("Invalid credentials - email taken or password too short");
                } else if (res.status === 201) {
                    alert("Account Created Successfully");
                    logIn();
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSignUpInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignUpCredentials({ ...signUpCredentials, [e.target.name]: e.target.value });
    };

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
