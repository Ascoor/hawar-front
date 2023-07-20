import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ParentMembersModal = ({ show, members, onClose }) => {
  if (!show || members.length === 0) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose} dir="rtl">
      <Modal.Header closeButton>
        <Modal.Title>قائمة الأعضاء التابعين</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {members.length > 0 ? (
          <ul>
            {members.map((parentMember) => (
              <li key={parentMember.Mem_Code}>{parentMember.Mem_Name}</li>
            ))}
          </ul>
        ) : (
          <p>لا يوجد أعضاء تابعين لهذا العضو.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParentMembersModal;
