import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={12} className="center-content">
            <h6>Copyrtights {currentYear} &copy; Hawar Sport Club</h6>
          </Col>
          <Col xs={12} md={12} className="center-content">

        <div className="footer-icons">
          {/* أضف رموز Facebook و Instagram و Twitter هنا */}
          <a href="https://www.facebook.com/HSC.Mansoura" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" className="facebook-icon p-auto m-auto " />
          </a>
          <a href="https://www.instagram.com/YOUR_INSTAGRAM_PAGE" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" className="instagram-icon p-auto m-auto " />
          </a>
          <a href="https://twitter.com/YOUR_TWITTER_PAGE" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" className="twitter-icon p-auto m-auto " />
          </a>
        </div>
        </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
