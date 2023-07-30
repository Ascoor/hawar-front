import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

const FeesModal = ({ show, member, fees, onClose }) => {
  if (!show || !member) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose} dir="rtl">
      <Modal.Header closeButton>
        <Modal.Title>إشتراكات العضو</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {fees !== null && fees.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>السنة</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>رقم الإيصال</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.Fee_ID}>
                  <td>{fee.fee_year}</td>
                  <td>{fee.fee_amount}</td>
                  <td>{fee.fee_date}</td>
                  <td>{fee.fee_recieptNumber}</td>
                  <td>{member.status === -1 ? 'غير مسدد' : 'مسدد'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          fees === null && <p>جارٍ تحميل الإشتراكات...</p>
        )}
        {fees !== null && fees.length === 0 && <p>لا توجد إشتراكات لهذا العضو.</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeesModal;
