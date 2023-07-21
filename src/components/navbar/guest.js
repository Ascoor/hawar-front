import React, { useState } from "react";
import { useTransition, useSpring, animated } from "@react-spring/web";
import { Card, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { RiLoginCircleLine, RiUserAddLine } from "react-icons/ri";
import patternLogoSmall from "../../images/logo2.png";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const Guest = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true); // حالة جديدة لإظهار/إخفاء الأزرار والشعار

  const [imageSize] = useState({ width: 450, height: 300 }); // Example size, replace with your desired values

  const handleCloseForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowButtons(true); // عند إغلاق أي نموذج، قم بإظهار الأزرار والشعار مرة أخرى
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowButtons(false); // عند ظهور نموذج الدخول، قم بإخفاء الأزرار والشعار
  };

  const handleShowRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
    setShowButtons(false); // عند ظهور نموذج تسجيل الاشتراك، قم بإخفاء الأزرار والشعار
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

  // Logo animation
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
        {showButtons && (
          <img
            src={patternLogoSmall}
            style={{ width: imageSize.width, height: imageSize.height }}
            alt="Pattern Logo"
            className="logo img-fluid"
          />
        )}
        <ButtonGroup>
          <Row>
            <Col xs={4} md={4}>
              {/* أزرار مع حالة مرئية */}
              {showButtons && (
                <Button
                  variant="success"
                  onClick={handleShowLoginForm}
                  className="btn-login-auth pr-4"
                >
                  <RiLoginCircleLine className="mr-1" />
                  دخول
                </Button>
              )}
            </Col>
            <Col xs={8} md={8}>
              {/* أزرار مع حالة مرئية */}
              {showButtons && (
                <Button
                  variant="danger"
                  onClick={handleShowRegisterForm}
                  className="btn-register-auth pl-4"
                >
                  <RiUserAddLine className="mr-1" />
                  تسجيل اشتراك
                </Button>
              )}
            </Col>
          </Row>
        </ButtonGroup>
      </animated.div>

      {formsTransition((styles, item) =>
        item ? (
          <animated.div
            style={{ ...styles, marginTop: "20px" }}
            className="centered-content"
          >
            {/* Forms */}
            <div className="d-flex justify-content-center">
              <Card className="backlit-card">
                {showLoginForm && (
                  <LoginForm
                    style={{ position: "relative", zIndex: 3 }}
                    handleCloseForm={handleCloseForm}
                  />
                )}
                {showRegisterForm && (
                  <RegisterForm
                    style={{ position: "relative", zIndex: 3 }}
                    handleCloseForm={handleCloseForm}
                  />
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
