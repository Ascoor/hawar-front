import React from 'react';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';
import API_CONFIG from '../../../config';


const MemberDetailsModal = ({ show, member, onClose }) => {
  if (!show || !member) {
    return null;
  }

  if (!show || !member) {
    return null;
  }

  // Function to handle image loading error
  const handleImageError = (event) => {
    event.target.style.display = 'none'; // Hide the image if it fails to load
  };

  return (
    <Modal show={show} onHide={onClose} dir="rtl" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #dee2e6' }}>
        <Modal.Title style={{ color: '#4CAF50' }}>تفاصيل العضو</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-3">
          <Card.Body>
            <Row>
            <Col md={6} className="d-flex align-items-center justify-content-center">
                {/* Add member's photo here */}
                <div
                  className="rounded-circle overflow-hidden mx-auto d-block mb-2"
                  style={{
                    width: '175px',
                    height: '175px',
                    border: '5px solid #4CAF50',
                    boxShadow: '0 4px 8px rgba(220 170 22)',
                  }}
                >
                  {member.Photo ? (
                    <Card.Img
                      src={`${API_CONFIG.baseURL}/UserPics/${member.Photo}`}
                      alt="Member Photo"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                      onError={handleImageError}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '100%', height: '100%', fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}
                    >
                      صورة العضو غير متوفرة
                    </div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <Card.Title style={{ color: '#4CAF50', fontSize: '20px', fontWeight: 'bold' }}>بيانات العضو</Card.Title>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الاسم: {member.Name}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الرقم التسجيلي: {member.RegNum}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الفئة: {member.Category}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>العلاقة: {member.Relation}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الجنس: {member.Gender}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الديانة: {member.Relegion}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>العنوان: {member.Address}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>المهنة: {member.Profession}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الحالة: {member.Status}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الهاتف: {member.Phone}</Card.Text>
              </Col>
         
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberDetailsModal;
