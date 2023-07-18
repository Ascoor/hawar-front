import React, { useEffect } from "react";
import { Nav, Navbar, Dropdown, Container } from "react-bootstrap";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useAuth from "../auth/AuthUser";
import Logo from "../../images/logo2.png";
import Home from "../home";
import Members from "../members/members.component";
import ProfileUpdateComponent from "../auth/profile";

const Auth = () => {
  const { token, logout } = useAuth();
  const userId = useAuth().user.id;
  const navigate = useNavigate();

  useEffect(() => {
    const loadingDelay = setTimeout(() => {}, 1000);
    return () => clearTimeout(loadingDelay);
  }, [navigate]);

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const getUserName = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user ? user.name : "";
  };

  return (
    <>
      <Navbar
        className="justify-content-center"
        style={{
          background: "linear-gradient(#092247,#092247,#092247)",
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
              <Nav.Link as={Link} to="/">
                الرئيسية
              </Nav.Link>
              <Nav.Link as={Link} to="/members">
                الأعضاء
              </Nav.Link>
            </Nav>
            <Nav>
              <Dropdown>
                <Dropdown.Toggle
                  id="user-dropdown"
                  variant="light"
                  className="d-flex align-items-center"
                >
                  <FaUser className="me-2" />
                  {getUserName()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="menu-profile"
                    as={Link}
                    to={`/profile/${userId}`}
                  >
                    الملف الشخصى
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-logout" onClick={logoutUser}>
                    تسجيل الخروج
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />

          <Route
            path="/profile/:userId"
            element={<ProfileUpdateComponent userId={userId} />}
          />
        </Routes>
      </Container>

      <footer
        style={{
          background: "linear-gradient(#092247,#092247,#092247)",
          color: "#ffffff",
          padding: "20px",
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <p>Ask-ar.com All rights reserved &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default Auth;
