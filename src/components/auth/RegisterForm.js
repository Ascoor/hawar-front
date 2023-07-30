import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaUser, FaEnvelope, FaKey, FaSignInAlt } from "react-icons/fa";
import AuthUser from "./AuthUser";
import API_CONFIG from "../../config";
import axios from "axios";

const RegisterForm = ({ handleCloseForm }) => {
    const navigate = useNavigate();
    const { http, setToken } = AuthUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submitForm = async () => {
        setLoading(true);
        setError("");

        try {
            if (password !== rePassword) {
                setError("Passwords do not match");
                setLoading(false);
                return;
            }

            await axios.post(`${API_CONFIG.baseURL}/api/register`, {
                name,
                email,
                password,
            });

            // Registration successful
            setLoading(false);

            // Perform login after successful registration
            await loginUser();
        } catch (error) {
            setLoading(false);
            setError("Failed to register. Please try again later.");
            console.log(error);
        }
    };

    const loginUser = async () => {
        try {
            const response = await http.post("/api/login", { email, password });
            setToken(response.data.user, response.data.access_token);
            navigate("/");
        } catch (error) {
            setError("Failed to login. Please try again later.");
            console.log(error);
        }
    };

  return (
    <React.Fragment>
       <Card className="auth-form-card">
              <div className="court-setting-card-header">
                <Card.Header className="card-header-auth">
                  <Card.Title className="card-title-login-form">
                    تسجيل إشتراك
                    <FaSignInAlt style={{ marginRight: "5px" }} className="welcome-page-icon" />
                  </Card.Title>
                
          </Card.Header>
        </div>

        <Card.Body>
          <Form>
            <Row>
              <Col xs={12} md={12}>
                <Form.Label>
                  <FaUser className="form-icon" /> الاسم:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ادخل الاسم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col xs={12} md={12}>
                <Form.Label>
                  <FaEnvelope className="form-icon" /> البريد الإلكتروني:
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ادخل البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12}>
                <Form.Label>
                  <FaKey className="form-icon" /> كلمة المرور:
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ادخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col xs={12} md={12}>
                <Form.Label>
                  <FaKey className="form-icon" /> إعادة إدخال كلمة المرور:
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="إعادة إدخال كلمة المرور"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Col>
            </Row>

            {loading ? (
              <Button type="button" disabled className="btn  mt-4">
                جاري التحميل...
              </Button>
            ) : (
              <Button type="button" onClick={submitForm} className="btn login-btn">
                تسجيل اشتراك
              </Button>
            )}
          </Form>
          {error && <p className="text-danger mt-3">{error}</p>}
          {/* Error message */}
        </Card.Body>

        <Card.Footer>
          <Button type="button" onClick={handleCloseForm} className="btn-danger login-back">
            العودة للرئيسية
          </Button>
        </Card.Footer>
      </Card>
      </React.Fragment>
  );
};

export default RegisterForm;