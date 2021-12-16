import React from "react";
import { Col, Container, Row } from "reactstrap";

const LandingFeaturesSection = (): JSX.Element => {
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
                <Row className='p-5 d-flex justify-content-center'>
                    <Col className='text-center'>
                        <h2>Easily track your macros</h2>
                        <p className='lead'>MaRecipe does the macro calculations for you.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingFeaturesSection;
