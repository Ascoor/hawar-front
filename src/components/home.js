import React from 'react';
import DashBoard from "../images/welcome.jpg";
import { Card, Container, Row, Col } from 'react-bootstrap';

import '../assest/css/home.css';




const Home = () => {










    return (

        <Container>
            <Row>
                <Col sm={6} md={4} lg={3} className="d-none d-lg-block">
                    {/* This content will be hidden on screens smaller than large */}
                </Col>
                <Col sm={6} md={8} lg={9} className="text-center">
                    {/* This content will be centered horizontally on all screen sizes */}
                </Col>
            </Row>


            <Row>
                <Col>
                    <Card>
                        <Card.Header className="home-text-center">
                            لوحة التحكم
                            <div className="court-setting-card-header">
                                <img src={DashBoard} alt="Icon" className="dashboard-img" />
                            </div>
                        </Card.Header>
                    </Card>
                    </Col>
                    </Row>

        </Container>
    );
};

export default Home;
