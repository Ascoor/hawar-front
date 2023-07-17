import React from 'react';
import DashBoard from "../images/welcome.jpg";
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../assest/css/home.css';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col xs={12} lg={3} className="d-none d-lg-block">
                    {/* Content for screens larger than large (lg) */}
                </Col>
                <Col xs={12} lg={9} className="text-center">
                    {/* Content for all screen sizes */}
                    <Card>
                        <Card.Header className="home-text-center">
                            لوحة التحكم
                            <div className="court-setting-card-header">
                                <img src={DashBoard} alt="Icon" className="dashboard-img img-fluid" />
                            </div>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
