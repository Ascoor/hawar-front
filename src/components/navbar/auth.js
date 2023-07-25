import React, { useEffect } from "react";
import { Nav, Navbar, Dropdown, NavDropdown,Container } from "react-bootstrap";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useAuth from "../auth/AuthUser";
import Logo from "../../images/logo2.png";
import Home from "../home";
import Members from "../members/members";
import ProfileUpdateComponent from "../auth/profile";
import Footer from "../Tools/Footer";

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
          background: "linear-gradient(#0b1626, #031e49, #040f21)",
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
      <Nav.Link as={Link} to="/" style={{ fontFamily: "ArabicFont", color: "#fff" }}>
        الرئيسية
      </Nav.Link>
      <Nav.Link as={Link} to="/members" style={{ fontFamily: "ArabicFont", color: "#fff" }}>
        الأعضاء
      </Nav.Link>
     
                            <NavDropdown title="الإعدادات" id="settings-dropdown">
                                <NavDropdown.Item as={Link} to="/member-lookup">
              بيانات العضوية
                                </NavDropdown.Item>
                   
                            </NavDropdown>
    </Nav>

            <Nav>
              <Dropdown>
                <Dropdown.Toggle
                  id="user-dropdown"
                  variant="light"
                  className="d-flex align-items-center"
                  style={{
                    fontFamily: "ArabicFont",
                    color: "#092247",
                    background: "#fff",
                  }}
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

      {/* Add a wrapper div for centering the content */}
      <div style={{ padding: "85px 6px", minHeight: "calc(100vh - 132px)" }}>
           
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route
              path="/profile/:userId"
              element={<ProfileUpdateComponent userId={userId} />}
              />
          </Routes>
   
            </div>
   
            <Footer />
  
    </>
  );
};

export default Auth;
