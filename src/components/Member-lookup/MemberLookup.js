
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import API_CONFIG from "../../config";
const MemberLookup = () => {
  const [lookups, setLookups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLookup, setSelectedLookup] = useState({});
  const [formData, setFormData] = useState({
    MembershipType: "",
    Class: "",
    Relegion: "",
    Gender: "",
  });

  useEffect(() => {
    fetchMemberLookups();
  }, []);

  const fetchMemberLookups = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/member_lookups`);
      setLookups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditModalOpen = (lookup) => {
    setSelectedLookup(lookup);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => setShowEditModal(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateLookup = async () => {
    try {
      await axios.post("/api/member_lookups", formData);
      fetchMemberLookups();
      handleCreateModalClose();
      setFormData({
        MembershipType: "",
        Class: "",
        Relegion: "",
        Gender: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateLookup = async () => {
    try {
      await axios.put(`${API_CONFIG.baseURL}/api/member_lookups/${selectedLookup.id}`, formData);
      fetchMemberLookups();
      handleEditModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLookup = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/member_lookups/${id}`);
      fetchMemberLookups();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleCreateModalOpen} className="mb-3">
        إضافة بيانات البحث
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>نوع العضوية</th>
            <th>الفئة</th>
            <th>الديانة</th>
            <th>الجنس</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {lookups.map((lookup) => (
            <tr key={lookup.id}>
              <td>{lookup.MembershipType}</td>
              <td>{lookup.Class}</td>
              <td>{lookup.Religion}</td>
              <td>{lookup.Gender}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditModalOpen(lookup)} className="me-2">
                  تعديل
                </Button>
                <Button variant="danger" onClick={() => handleDeleteLookup(lookup.id)}>
                  حذف
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة بيانات البحث</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="membershipType">
              <Form.Label>نوع العضوية</Form.Label>
              <Form.Control
                type="text"
                name="MembershipType"
                value={formData.MembershipType}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="class">
              <Form.Label>الفئة</Form.Label>
              <Form.Control
                type="text"
                name="Class"
                value={formData.Class}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="religion">
              <Form.Label>الديانة</Form.Label>
              <Form.Control
                type="text"
                name="Religion"
                value={formData.Religion}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>الجنس</Form.Label>
              <Form.Control
                type="text"
                name="Gender"
                value={formData.Gender}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModalClose}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleCreateLookup}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل بيانات البحث</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="membershipType">
              <Form.Label>نوع العضوية</Form.Label>
              <Form.Control
                type="text"
                name="MembershipType"
                value={formData.MembershipType}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="class">
              <Form.Label>الفئة</Form.Label>
              <Form.Control
                type="text"
                name="Class"
                value={formData.Class}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="religion">
              <Form.Label>الديانة</Form.Label>
              <Form.Control
                type="text"
                name="Religion"
                value={formData.Religion}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>الجنس</Form.Label>
              <Form.Control
                type="text"
                name="Gender"
                value={formData.Gender}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleUpdateLookup}>
            حفظ التعديلات
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberLookup;
