import React, { useState } from 'react';
import './Tools/landingpage.css';
import Logo from '../images/logo2.png';
import { Nav, Navbar, Container } from 'react-bootstrap';
import BgVideo from '../videos/Cover.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import Footer from './Tools/Footer'; // Import the Footer component
import Guest from '../components/navbar/guest';
import AuthUser from '../components/auth/AuthUser';

const Welcome = () => {
  const navigate = useNavigate(); // Get the navigate function
  const { isAuthenticated } = AuthUser();
  const [showJoinButton, setShowJoinButton] = useState(!isAuthenticated); // State to track if the "Join Now" button should be shown

  const handleJoinNow = () => {
    setShowJoinButton(false); // Hide the "Join Now" button
    // Navigate to the "/guest" route when the button is clicked
    navigate('/guest', { replace: true }); // Use replace to remove the Welcome component from the navigation history
  };

  const logoFlagAnimation = useSpring({
    from: { top: '-100%', opacity: 0 },
    to: { top: showJoinButton ? '50%' : '-100%', opacity: showJoinButton ? 1 : 0 },
    config: { duration: 1000 },
  });

  if (!showJoinButton) {
    return <Guest />; // Hide the Welcome component and render the Guest component
  }

  return (
    <>
      <div className="landingpage">
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
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto mb-2 mb-md-0"></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <video src={BgVideo} autoPlay muted loop className="video-bg" />
        <div className="bg-overlay"></div>

        <div className="home-text">
  
        </div>
        {showJoinButton && (
          <div className="join-button-container" onClick={handleJoinNow}>
            <div className="home-btn">Join Now</div>
          </div>
        )}
      </div>

      <Footer /> {/* Add the Footer component here */}
    </>
  );
};

export default Welcome;
