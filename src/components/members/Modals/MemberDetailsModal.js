import React from 'react';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';

const MemberDetailsModal = ({ show, member, onClose }) => {
  if (!show || !member) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose} dir="rtl" centered>
    <Modal.Header closeButton>
      <Modal.Title>تفاصيل العضو</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Card border="success">
        <Card.Body>
          <div className="member-details">
            <Row>
              <Col xs={12} md={6} className="text-center mb-3 mb-md-0">
                <Card.Img
                  src={`https://hawar-api.ask-ar.com/UserPics/${member.Mem_Photo}`}
                  alt="صورة العضو"
                  style={{
                    objectFit: 'cover',
                    width: 'var(--member-image-size)',
                    height: 'var(--member-image-size)',
                    borderRadius: 'var(--member-image-border-radius)',
                  }}
                />
              </Col>
              <Col xs={12} md={8}>
                  <Row>
                    <Col xs={12} md={6}>
                      <div className="form-group">
                        <label className="label-color-name">إسم العضو:</label>
                        <h5>{member.Mem_Name}</h5>
                      </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <div className="form-group">
                          <label className="label-color">رقم العضوية:</label>
                          <input type="text" value={member.Mem_Code} disabled />
                        </div>
                        <div className="form-group">
                <label className="label-color-name">إسم العضو:</label>
                <h5>{member.Mem_Name}</h5>
              </div>
              <div className="form-group">
                <label className="label-color">رقم العضوية:</label>
                <input type="text" value={member.Mem_Code} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">تاريخ الميلاد:</label>
                <input type="text" value={member.Mem_BOD} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">الرقم القومي:</label>
                <input type="text" value={member.Mem_NID} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">التخرج:</label>
                <input type="text" value={member.Graduation} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">عضوية الأب:</label>
                <input type="text" value={member.Mem_ParentMember} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">الجنس:</label>
                <input type="text" value={member.Gender} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">الوظيفة:</label>
                <input type="text" value={member.Mem_Job} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">تصنيف الوظيفة:</label>
                <input type="text" value={member.JobCategory} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">نوع العضوية:</label>
                <input type="text" value={member.MembershipType} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">الديانة:</label>
                <input type="text" value={member.Relegion} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">العنوان:</label>
                <input type="text" value={member.Mem_Address} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">تاريخ الإنضمام:</label>
                <input type="text" value={member.Mem_JoinDate} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">الفئة:</label>
                <input type="text" value={member.Class} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">هاتف المنزل:</label>
                <input type="text" value={member.Mem_HomePhone} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">الموبايل:</label>
                <input type="text" value={member.Mem_Mobile} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">المستلم:</label>
                <input type="text" value={member.Mem_Receiver} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">هاتف العمل:</label>
                <input type="text" value={member.Mem_WorkPhone} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">ملاحظات:</label>
                <input type="text" value={member.Mem_Notes} disabled />
              </div>
              <div className="form-group">
                <label className="label-color">ملاحظات:</label>
                <input type="text" value={member.Mem_Relation} disabled />
              </div>
              </Col>
                  </Row>
                </Col>
              </Row>
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
