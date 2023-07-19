import React from 'react';
import DashBoard from "../images/welcome.jpg";
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../assest/css/home.css';

const Home = () => {
    return (

        
      
                    <Card>
                        <Card.Header className="home-text-center p-1">
                            لوحة التحكم
                      
                        </Card.Header>
                        <Card.Body>

                                <img src={DashBoard} alt="Icon" className="dashboard-img img-fluid" />
                        </Card.Body>
                   
                    </Card>
        

    );
};

export default Home;
