import React, { useEffect } from "react";
import { Nav, Navbar, Dropdown, Container } from "react-bootstrap";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useAuth from "../auth/AuthUser";

import Home from "../home";
import Members from "../members/member.component";
import ProfileUpdateComponent from "../auth/profile";

const Auth = () => {
    const { token, logout } = useAuth();

    const userId = useAuth().user.id;
    const navigate = useNavigate();

    useEffect(() => {
        const loadingDelay = setTimeout(() => { }, 1000);

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
                    background:
                        "linear-gradient(rgb(4, 19, 41), rgb(22 57 75), rgb(10 47 67)",
                    direction: "rtl",
                }}
                expand="xl"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="ms-left me-0">
                        <img
                            src="/logo222.png"
                            width="120"
                            height="60"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="nav-link-auth">
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

            <div style={{ padding: "24px 16px", minHeight: "calc(100vh - 132px)" }}>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/members" element={<Members />} />
                        
                        <Route
                            path="/profile/:userId"
                            element={<ProfileUpdateComponent userId={userId} />}
                        />
                    </Routes>
                </Container>
            </div>

            <footer
                style={{
                    background: "#f8f9fa",
                    padding: "20px",
                    textAlign: "center",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                }}
            >
                <p>&copy; {new Date().getFullYear()} Avocat. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Auth;
