import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

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
          <Col xs={12} md={12} lg={4} className="center-content">
            <h6>Copyrtights {currentYear} &copy; Hawar Sport Club</h6>
            <a href="https://www.facebook.com/hawarsportclub" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" className="facebook-icon" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
