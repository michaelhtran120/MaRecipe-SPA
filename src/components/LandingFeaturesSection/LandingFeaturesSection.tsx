import React from "react";
import "./LandingFeatureSection.css";
import { Col, Container, Row } from "reactstrap";

const LandingFeaturesSection: React.FC = (): JSX.Element => {
    return (
        <div>
            <Container id='features' className='bg-dark text-light p-md-5' fluid>
                <Row className='p-5 d-flex justify-content-center'>
                    <Col className='text-center'>
                        <h2>All your recipes in one place</h2>
                        <p className='lead'>Tired of having to remember recipes?</p>
                        <p className='lead'>With MaRecipe, keep all your favorite recipes in one place</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingFeaturesSection;
