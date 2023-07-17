import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../config';
import { useParams } from 'react-router-dom';

const ProfileUpdateComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [email_verified_at, setEmail_verified_at] = useState('');
    const { userId } = useParams();
    useEffect(() => {
        axios
            .get(`${API_CONFIG.baseURL}/api/user/${userId}`)
            .then(response => {
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setRole(userData.role);
                setEmail_verified_at(userData.email_verified_at);
                // تحقق من قيمة "email_verified_at" وتعيين قيمة "لا يوجد" إذا كانت "null"
                const emailVerified = userData.email_verified_at === null ? 'لا يوجد' : userData.email_verified_at;
                // استخدم القيمة المحدثة لـ "email_verified_at"
                console.log(emailVerified);
            })
            .catch(error => {
                console.log(error.response.data);
                // التعامل مع الخطأ وعرض رسالة خطأ أو إعادة التوجيه
            });
    }, [userId]);



    const handleUpdateProfile = () => {
        axios
            .put(`${API_CONFIG.baseURL}/api/user/${userId}`, {
                name,
                email,
                password,
                confirmPassword,
                role
            })
            .then(response => {
                console.log(response.data);
                // Handle success, display a success message or redirect
            })
            .catch(error => {
                console.log(error.response.data);
                // Handle error, display an error message or validation errors
            });
    };

    const generateUniqueId = fieldName => `${fieldName}-${userId}`;

    return (
        <Container>
            <Card className="card ">

                <div className="custom-card-header">
                    <Card.Header>

                        تحديث الملف الشخصي
                    </Card.Header>
                </div>
                <Card.Body>
                    <form>
                        <Row>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('name')}>الاسم</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={generateUniqueId('name')}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('email')}>البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id={generateUniqueId('email')}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('email_verified_at')}>البريد الإلكتروني لإسترجاع الحساب</label>
                                    <input
                                        type="email_verified_at"
                                        className="form-control"
                                        id={generateUniqueId('email_verified_at')}
                                        value={email_verified_at}
                                        onChange={e => setEmail_verified_at(e.target.value)}
                                    />
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('password')}>كلمة المرور</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id={generateUniqueId('password')}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('confirmPassword')}>تأكيد كلمة المرور</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id={generateUniqueId('confirmPassword')}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('role')}>الدور</label>
                                    <select
                                        className="form-control"
                                        id={generateUniqueId('role')}
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                    >
                                        <option value="">اختر الدور</option>
                                        <option value="admin">مدير</option>
                                        <option value="user">مستخدم</option>
                                        <option value="assistant">مساعد</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Card.Footer>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>
                                تحديث الملف الشخصي
                            </button>
                        </Card.Footer>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfileUpdateComponent;
