import React from 'react';
import DashBoard from "../images/welcome.jpg";
import { Card } from 'react-bootstrap';


const Home = () => {
  return (
    <Card>
      <Card.Header className="home-text-center p-1">
      <div className="big-font-container">
          <span className="big-font">لوحة التحكم</span>
        </div>
      </Card.Header>
      <Card.Body className="d-flex justify-content-center align-items-center">
        <img src={DashBoard} alt="Icon" className="dashboard-img img-fluid" />
      </Card.Body>
    </Card>
  );
};

export default Home;
