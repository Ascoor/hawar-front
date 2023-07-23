import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <h5>Contact Information</h5>
            {/* Add contact information here */}
          </Col>
          <Col xs={12} md={6} lg={4}>
            <h5>Links</h5>
            {/* Add footer links here */}
          </Col>
          <Col xs={12} md={12} lg={4}>

            <h6>Copyrtights {currentYear} &copy; Hawar Sport Club</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
