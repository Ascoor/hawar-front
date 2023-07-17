import React, { useState, useEffect } from "react";
import { useTransition, useSpring, animated } from "@react-spring/web";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { RiLoginCircleLine, RiUserAddLine } from "react-icons/ri";
import { Collapse } from "bootstrap/dist/js/bootstrap.bundle";

import logo from "../../images/logo512.png";
import patternLogo from "../../images/welcome.jpg";
import patternLogoSmall from "../../images/logo2.png";

const Login = React.lazy(() => import("../auth/login"));
const Register = React.lazy(() => import("../auth/register"));

const Guest = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLogoAndButtons, setShowLogoAndButtons] = useState(true);
    const handleCloseForm = () => {
        setShowLoginForm(false);
        setShowRegisterForm(false);
        setShowLogoAndButtons(true);
    };


    const handleShowLoginForm = () => {
        setShowLoginForm(true);
        setShowRegisterForm(false);
        setShowLogoAndButtons(false);
    };

    const handleShowRegisterForm = () => {
        setShowLoginForm(false);
        setShowRegisterForm(true);
        setShowLogoAndButtons(false);
    };

    const formsTransition = useTransition(showLoginForm || showRegisterForm, {
        from: {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.8)",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 2,
        },
        enter: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 2,
        },
        leave: {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.8)",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 2,
        },
        config: { duration: 500 },
    });

    useEffect(() => {
        const mainNav = document.querySelector("#mainNav");

        if (mainNav) {
            const navbarCollapse = mainNav.querySelector(".navbar-collapse");

            if (navbarCollapse) {
                const collapse = new Collapse(navbarCollapse, {
                    toggle: false,
                });

                const navbarItems = navbarCollapse.querySelectorAll("a");

                // Closes responsive menu when a scroll trigger link is clicked
                for (let item of navbarItems) {
                    item.addEventListener("click", function (event) {
                        collapse.hide();
                    });
                }
            }

            // Collapse Navbar
            const collapseNavbar = () => {
                const scrollTop =
                    window.pageYOffset !== undefined
                        ? window.pageYOffset
                        : (
                            document.documentElement ||
                            document.body.parentNode ||
                            document.body
                        ).scrollTop;

                if (scrollTop > 100) {
                    mainNav.classList.add("navbar-shrink");
                } else {
                    mainNav.classList.remove("navbar-shrink");
                }
            };

            // Collapse now if page is not at top
            collapseNavbar();

            // Collapse the navbar when page is scrolled
            document.addEventListener("scroll", collapseNavbar);
        }
    }, []);

    const logoAnimation = useSpring({
        opacity: 1,
        transform: "translateY(0)",
        from: { opacity: 0, transform: "translateY(-100px)" },
        delay: 500,
    });

    return (
        <>
            <header
                className="masthead"
                style={{
                    backgroundImage: `url(${patternLogo})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: "100vh",
                }}
            >
                <div className="navbar navbar-light fixed-top" id="mainNav">
                    <div className="container">
                        <img src={logo} width="118" height="54" alt="Logo" />
                        <button
                            className="navbar-toggler navbar-toggler-right"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            value="Menu"
                        >
                            <i className="fa fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item nav-link"></li>
                                <li className="nav-item nav-link"></li>
                                <li className="nav-item nav-link"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                        paddingLeft: "10px",
                        height: "100%",
                    }}
                >
                    {showLogoAndButtons && (
                        <animated.div style={logoAnimation} className="logo-container">
                            <img
                                src={patternLogoSmall}
                                alt="Pattern Logo"
                                className="logo img-fluid"
                                style={{ width: "200px", height: "auto" }}
                            />
                        </animated.div>
                    )}
                    {showLogoAndButtons && (
                        <div className="mt-4 d-flex justify-content-center">
                            <Button
                                variant="success"
                                onClick={handleShowLoginForm}
                                style={{ marginRight: "10px" }}
                            >
                                <RiLoginCircleLine className="mr-1" />
                                دخول
                            </Button>
                            <Button variant="danger" onClick={handleShowRegisterForm}>
                                <RiUserAddLine className="mr-1" />
                                تسجيل اشتراك
                            </Button>
                        </div>
                    )}
                  
                    {formsTransition((styles, item) =>
                        item ? (
                            <animated.div
                                style={{ ...styles, width: "100%", marginTop: "20px" }}
                            >
                                <div className="d-flex justify-content-center">
                                    <Card style={{ zIndex: 2 }}>
                                        <React.Suspense
                                            fallback={<Spinner animation="grow" />} >
                                            {showLoginForm && (
                                                <Login
                                                    style={{ position: "relative", zIndex: 3 }}
                                                    handleCloseForm={handleCloseForm}
                                                />
                                            )}
                                            {showRegisterForm && (
                                                <Register
                                                    style={{ position: "relative", zIndex: 3 }}
                                                    handleCloseForm={handleCloseForm}
                                                />
                                            )}
                                        </React.Suspense>
                                    </Card>
                                </div>
                            </animated.div>
                        ) : null
                    )}
                </div>
            </header>




            <footer
                style={{
                    background: "linear-gradient(rgb(11 22 26), rgb(14 48 66), rgb(10 18 24))",
                    direction: "rtl",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px 0",
                }}
            >
                <Container>
                    <p style={{ margin: 0 }}>
                        &copy; {new Date().getFullYear()} Avocat All rights reserved
                    </p>
                </Container>
            </footer>
        </>
    );
};

export default Guest;
