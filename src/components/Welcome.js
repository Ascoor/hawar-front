import React, { useState } from 'react';
import './Tools/landingpage.css';
import Logo from '../images/logo2.png';
import { Nav, Navbar, Container } from 'react-bootstrap';
import BgVideo from '../videos/cover.mp4';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Tools/Footer';
import { useSpring, animated } from '@react-spring/web';

const Welcome = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [showJoinButton, setShowJoinButton] = useState(true); // State to track if the "Join Now" button should be shown

  const handleJoinNow = () => {
    setShowJoinButton(false); // Hide the "Join Now" button
    navigate('/guest'); // Navigate to the "/guest" route when the button is clicked
  };

  const logoFlagAnimation = useSpring({
    from: { top: '-100%', opacity: 0 },
    to: { top: showJoinButton ? '50%' : '-100%', opacity: showJoinButton ? 1 : 0 },
    config: { duration: 1000 },
  });

  return (
    <>
      <div className="Welcome">
        <video src={BgVideo} autoPlay muted loop className="video-bg" />
        <div className="bg-overlay"></div>
        <Navbar
          className="justify-content-center"
          style={{
            background: 'linear-gradient(#092247, #092247, #092247)',
            direction: 'rtl',
          }}
          expand="md"
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="ms-left me-0">
              {/* Apply the logoFlagAnimation to the logo */}
              <animated.img
                src={Logo}
                width="75"
                height="75"
                className="d-inline-block align-center"
                alt="React Bootstrap logo"
                style={logoFlagAnimation}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto mb-2 mb-md-0"></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="text-welcome">
          {/* Your welcome text goes here */}
        </div>
        {/* Conditionally render the "Join Now" button */}
        {showJoinButton && (
          <div className="join-button-container" onClick={handleJoinNow}>
            <div className="home-btn">Join Now</div>
          </div>
        )}
      </div>
      <div className="wrapper">
        {/* Your main content goes here */}
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
