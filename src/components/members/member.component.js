import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../config';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fees, setFees] = useState(null);

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const fetchMembers = async (page) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/members?page=${page}&perPage=25`);
      setMembers(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFees = async (Mem_Code) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/fees?Mem_Code=${Mem_Code}`);
      setFees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMemberModal = (member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const handleShowFeesModal = (member) => {
    setSelectedMember(member);
    setShowFeesModal(true);
    fetchFees(member.Mem_Code);
  };

  const handleCloseModal = () => {
    setShowMemberModal(false);
    setShowFeesModal(false);
    setFees(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? 'primary' : 'secondary'}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Member Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
       <td>
      <Card.Img src={`${API_CONFIG.baseURL}/UserPics/${member.Mem_Photo}`} alt="Member Photo" />
    </td>                <td>{member.Mem_Address}</td>
                <td>{member.Mem_Mobile}</td>
                <td>{member.Mem_Code}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowMemberModal(member)}>
                    View Details
                  </Button>
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleShowFeesModal(member)}>
                    View Fees
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </Button>
          {renderPageNumbers()}
          <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </Button>
        </div>
      </Container>

      {/* Modal for displaying member details */}
      <Modal show={showMemberModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (
            <Card>
              <Card.Body>
                <Card.Title>{selectedMember.Mem_Name}</Card.Title>
                <Card.Text>Member Code: {selectedMember.Mem_Code}</Card.Text>
                <Card.Text>Date of Birth: {selectedMember.Mem_BOD}</Card.Text>
                <Card.Text>National ID: {selectedMember.Mem_NID}</Card.Text>
                <Card.Text>Graduation: {selectedMember.Graduation}</Card.Text>
                <Card.Text>Parent Member: {selectedMember.Mem_ParentMember}</Card.Text>
                <Card.Text>Gender: {selectedMember.Gender}</Card.Text>
                <Card.Text>Job: {selectedMember.Mem_Job}</Card.Text>
                <Card.Text>Job Category: {selectedMember.JobCategory}</Card.Text>
                <Card.Text>Membership Type: {selectedMember.MembershipType}</Card.Text>
                <Card.Text>Religion: {selectedMember.Relegion}</Card.Text>
                <Card.Text>Address: {selectedMember.Mem_Address}</Card.Text>
                <Card.Text>Join Date: {selectedMember.Mem_JoinDate}</Card.Text>
                <Card.Text>Class: {selectedMember.Class}</Card.Text>
                <Card.Text>Home Phone: {selectedMember.Mem_HomePhone}</Card.Text>
                <Card.Text>Mobile: {selectedMember.Mem_Mobile}</Card.Text>
                <Card.Text>Receiver: {selectedMember.Mem_Receiver}</Card.Text>
                <Card.Text>Work Phone: {selectedMember.Mem_WorkPhone}</Card.Text>
                <Card.Text>Photo: {selectedMember.Mem_Photo}</Card.Text>
                <Card.Text>Notes: {selectedMember.Mem_Notes}</Card.Text>
                <Card.Text>Last Payed Fees: {selectedMember.Mem_LastPayedFees}</Card.Text>
                <Card.Text>Status: {selectedMember.Status}</Card.Text>
                <Card.Text>Member Card Member Name: {selectedMember.MemCard_MemberName}</Card.Text>
                <Card.Text>Member Card Member Job Title: {selectedMember.MemCard_MemberJobTitle}</Card.Text>
                <Card.Text>Graduation Description: {selectedMember.Mem_GraduationDesc}</Card.Text>
                <Card.Text>Notes 2: {selectedMember.Mem_Notes_2}</Card.Text>
                <Card.Text>Notes 3: {selectedMember.Mem_Notes_3}</Card.Text>
                <Card.Text>Notes 4: {selectedMember.Mem_Notes_4}</Card.Text>
                <Card.Text>Relation: {selectedMember.Mem_Relation}</Card.Text>
                <Card.Text>Parent Name: {selectedMember.parentName}</Card.Text>
                <Card.Text>Is Main Member: {selectedMember.Mem_IsMainMember}</Card.Text>
                <Card.Text>Board Decision Date: {selectedMember.Mem_BoardDecision_Date}</Card.Text>
                <Card.Text>Board Decision Number: {selectedMember.Mem_BoardDecision_Number}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying fees */}
      <Modal show={showFeesModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Member Fees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && fees !== null && fees.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Fee ID</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Receipt Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.Fee_ID}>
                    <td>{fee.Fee_ID}</td>
                    <td>{fee.Fee_Year}</td>
                    <td>{fee.Fee_Amount}</td>
                    <td>{fee.Fee_Date}</td>
                    <td>{fee.Fee_RecieptNumber}</td>
                    <td>   {selectedMember.Status === -1 ? 'مسدد' : 'غير مسدد'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            fees === null && <p>Loading fees...</p>
          )}
          {fees !== null && fees.length === 0 && <p>No fees found for this member.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberList;
