import React from "react";
import './Tools/landingpage.css'
import Logo from "../images/logo2.png";
import { Nav, Navbar,Container } from "react-bootstrap";
import BgVideo from '../videos/cover.mp4';
import { Link, Routes, Route } from "react-router-dom";
import Guest from "./navbar/guest";
import { RiGradienterFill } from "react-icons/ri";

const Welcome = () => {
  return (
    <>
      <div className="Welcome">
        <video src={BgVideo} autoPlay muted loop class="video-bg" />
        <div className="bg-overlay"></div>
        <Navbar
          className="justify-content-center"
          style={{
            background: "linear-gradient(#092247, #092247, #092247)",
            direction: "rtl",
          }}
          expand="md"
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="ms-left me-0">
              <img
                src={Logo}
                width="75"
                height="75"
                className="d-inline-block align-center"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto mb-2 mb-md-0">
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="home-text">
      
        </div>
    {/* Use the Link component instead of <a> tag */}
    <Link to="/guest">
          <div className="home-btn">Join Now</div>
        </Link>
      </div>

   
    </>
  );
};

export default Welcome;