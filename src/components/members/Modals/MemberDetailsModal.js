import React from 'react';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';
import API_CONFIG from '../../../config';


const MemberDetailsModal = ({ show, member, onClose   }) => {
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
  // Parse the notes JSON string into an array of objects
  const parsedNotes = JSON.parse(member.notes);

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
                  {member.photo ? (
                    <Card.Img
                      src={`${API_CONFIG.baseURL}/UserPics/${member.photo}`}
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
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الاسم: {member.name}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الرقم التسجيلي: {member.member_id}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الفئة: {member.category_id}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>العلاقة: {member.relation_id}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الجنس: {member.gender}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الديانة: {member.relegion}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>العنوان: {member.address}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>المهنة: {member.profession}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الحالة: {member.status_id}</Card.Text>
                <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>الهاتف: {member.phone}</Card.Text>
              </Col>
               </Row>
              
<div>
  <h5>Notes:</h5>
  {parsedNotes.length > 0 ? (
    parsedNotes.map((note, index) => (
      <div key={index}>
        {note.note && <p>Created By: {note.createdBy}</p>}
        {note.note && <p>Note: {note.note}</p>}
        {note.note && <p>Created At: {note.createdAt}</p>}
      </div>
    ))
  ) : (
    <p>No notes available for this member.</p>
  )}
</div>

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
