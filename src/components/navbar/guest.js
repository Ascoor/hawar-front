import React, { useState } from "react";
import { useTransition, useSpring, animated } from "@react-spring/web";
import { Card, Button, Spinner } from "react-bootstrap";
import { RiLoginCircleLine, RiUserAddLine } from "react-icons/ri";
import patternLogoSmall from "../../images/logo2.png";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const Guest = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleCloseForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleShowRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
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
  const logoAnimation = useSpring({
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2,
  });

  return (
    <div className="bg-container">
      <animated.div style={logoAnimation} className="centered-content">
        <img src={patternLogoSmall} alt="Pattern Logo" className="logo img-fluid" />
        <div className="btn-group mt-4">
          <Button variant="success" onClick={handleShowLoginForm} className="col-6 col-md-auto">
            <RiLoginCircleLine className="mr-1" />
            دخول
          </Button>
          <Button variant="danger" onClick={handleShowRegisterForm} className="col-6 col-md-auto">
            <RiUserAddLine className="mr-1" />
            تسجيل اشتراك
          </Button>
        </div>
      </animated.div>

      {formsTransition((styles, item) =>
        item ? (
          <animated.div style={{ ...styles, marginTop: "20px" }} className="centered-content">
            {/* Forms */}
            <div className="d-flex justify-content-center">
              <Card className="centered-card">
                {showLoginForm && (
                  <LoginForm style={{ position: "relative", zIndex: 3 }} handleCloseForm={handleCloseForm} />
                )}
                {showRegisterForm && (
                  <RegisterForm style={{ position: "relative", zIndex: 3 }} handleCloseForm={handleCloseForm} />
                )}
              </Card>
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default Guest;