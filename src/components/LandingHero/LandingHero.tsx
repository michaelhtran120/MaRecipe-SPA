import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./LandingHero.css";
import logoWhite from "../../assets/images/Logo-white.svg";
import videoMp4 from "../../assets/videos/recipe-video.mp4";
import videoOgv from "../../assets/videos/recipe-video.ogv";

const LandingHero: React.FC = (): JSX.Element => {
    return (
        <>
            <Container id='hero' fluid>
                {/* Hero section video background */}
                <div id='video-container'>
                    <div id='video-overlay' />
                    <video poster='./media/poster.jpg' autoPlay muted loop>
                        <source src={videoOgv} type='video/ogv' />
                        <source src={videoMp4} type='video/mp4' />
                    </video>
                </div>
                {/* Hero section logo and text content */}
                <Row className='p-md-5 d-flex justify-content-center'>
                    <Col md={10} className='text-center text-light py-3 py-sm-5'>
                        <img className='pt-2 pt-sm-0' src={logoWhite} alt='white logo' />
                        <h1 className='mt-4'>Macro Recipe Application</h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LandingHero;
