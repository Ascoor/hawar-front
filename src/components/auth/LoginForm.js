import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Row } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import AuthUser from "./AuthUser";
import API_CONFIG from '../../config';
import axios from "axios";
const LoginForm = ({ handleCloseForm }) => {
    const navigate = useNavigate();
    const { setToken } = AuthUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_CONFIG.baseURL}/api/login`, {
                email,
                password,
            });

            // التحقق من وجود الـ "access_token" في الاستجابة
            if (response.data && response.data.access_token) {
                // قم بحفظ الـ "access_token" في المخزن (المفضلة) للدخول اللاحق
                setToken(response.data.user, response.data.access_token);
                // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد الدخول بنجاح
                navigate("/");
            } else {
                setError("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.");
            }
        } catch (error) {
            setError("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

        return (
          <React.Fragment>
            <Card className="auth-form-card">
              <div className="court-setting-card-header">
                <Card.Header>
                  <Card.Title className="card-title-login-form">
                    تسجيل الدخول
                    <FaSignInAlt style={{ marginRight: "5px" }} className="welcome-page-icon" />
                  </Card.Title>
                </Card.Header>
              </div>
      
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter an email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
      
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>كلمة المرور</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
      
                  <Row className="mt-4 justify-content-center">
  {loading ? (
    <Button type="button" disabled className="login-btn">
      ...جارى الدخول
    </Button>
  ) : (
    <Button type="submit" className="login-btn">
      تسجيل الدخول
    </Button>
  )}
</Row>

                </Form>
                {error && <p className="text-danger mt-3">{error}</p>}
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
      
      export default LoginForm;
      