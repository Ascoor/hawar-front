import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Modal, Form, Card, Pagination, Container } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../config';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Members = () => {
  // State variables
  const [members, setMembers] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [showParentMembersModal, setShowParentMembersModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fees, setFees] = useState(null);
  const [parentMembers, setParentMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  // Fetch members on initial load and when currentPage or searchTerm changes
  useEffect(() => {
    if (isFiltered) {
      // Fetch members by search term
      fetchMembersBySearchTerm(searchTerm, currentPage);
    } else {
      // Fetch regular members
      fetchMembers(currentPage);
    }
  }, [currentPage, isFiltered, searchTerm]);

  // Function to fetch members from the API
  const fetchMembers = async (page) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/members?page=${page}&perPage=25`);
      setMembers(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch members by search term from the API
  const fetchMembersBySearchTerm = async (term, page) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/member-search/${term}?page=${page}&perPage=25`);
      setMembers(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to fetch fees for a specific member
  const fetchFees = async (Mem_Code) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/fees?Mem_Code=${Mem_Code}`);
      setFees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch master member relation for a specific member
  const fetchMasterMemberRelation = async (Mem_Code) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/master-member-relation/${Mem_Code}`);
      setParentMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
// Function to fetch parent members or master member relation for a specific member
const fetchParentOrMasterMembers = async (Mem_Code) => {
  try {
    const selectedMember = members.find((member) => member.Mem_Code === Mem_Code);
    setSelectedMember(selectedMember);

    if (selectedMember.MembershipType === 'عضو عامل' && selectedMember.Mem_Relation) {
      // If the member is "عضو عامل" and has a relation, fetch the master member's relation
      const response = await axios.get(`${API_CONFIG.baseURL}/api/master-member-relation/${Mem_Code}`);
      setParentMembers(response.data);
    } else if (selectedMember.MembershipType === 'عضو تابع') {
      // If the member is "عضو تابع," fetch the parent members
      fetchParentMembers(Mem_Code);
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch parent members for a specific member
const fetchParentMembers = async (Mem_Code) => {
  try {
    const response = await axios.get(`${API_CONFIG.baseURL}/api/parent-members/${Mem_Code}`);
    setParentMembers(response.data);
  } catch (error) {
    console.log(error);
  }
};

const handleShowParentOrMasterMembers = async (Mem_Code) => {
  const selectedMember = members.find((member) => member.Mem_Code === Mem_Code);
  setSelectedMember(selectedMember);
  if (selectedMember.MembershipType === 'عضو عامل') {
    // If the member is "عضو عامل," fetch the parent members
    fetchParentMembers(Mem_Code);
  } else if (selectedMember.MembershipType === 'عضو تابع') {
    // If the member is "عضو تابع," fetch the master member relation
    fetchMasterMemberRelation(Mem_Code);
  }
};

//...

  // Function to handle showing the member details modal
  const handleShowMemberModal = (member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  // Function to handle showing the fees modal and fetch fees data
  const handleShowFeesModal = (member) => {
    setSelectedMember(member);
    setShowFeesModal(true);
    fetchFees(member.Mem_Code);
  };



  // Function to handle closing all modals and resetting related state
  const handleCloseModal = () => {
    setShowMemberModal(false);
    setShowFeesModal(false);
    setShowParentMembersModal(false);
    setFees(null);
    setParentMembers([]);
    setSelectedMember(null);
  };

  // Function to handle navigating to the previous page
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Function to handle navigating to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };



  // Function to check if the current member has parent members
  const hasParentMembers = (member) => {
    return member.Mem_ParentMember !== null && member.Mem_ParentMember.length > 0;
  };

  // Function to handle search submission
  const handleSearch = (event) => {
    event.preventDefault();
    fetchMembersBySearchTerm(searchTerm);
    setIsFiltered(true);
  };
  
// Function to render the members list
const renderMembers = () => {
  if (members.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="10">No data available</td>
        </tr>
      </tbody>
  );
}
  return (
    <tbody>
     {members.map((member) => (
        <tr key={member.id}>
            <td>
              <AiOutlineInfoCircle />
              <span
                onClick={() => handleShowMemberModal(member)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {member.Mem_Code}
              </span>
            </td>
            <td>
              <Card
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                }}
              >
                <Card.Img
                  src={`https://hawar-api.ask-ar.com/UserPics/${member.Mem_Photo}`}
                  alt="Member Photo"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                  }}
                />
              </Card>
            </td>
            <td>{member.Mem_Name}</td>
            <td>{member.MembershipType}</td>
            <td>{member.Gender}</td>
            <td>{member.Mem_Job}</td>
            <td>{member.Mem_Mobile}</td>
            <td>{member.Mem_BOD}</td>
            <td>{member.Mem_Address}</td>
            <td>
              <Button variant="success btn-sm" onClick={() => handleShowFeesModal(member)}>
                الإشتراكات
              </Button>
          </td>
          <td>
            {member.MembershipType === 'عضو تابع' && selectedMember && (
              <Button
                variant="primary btn-sm"
                onClick={() => handleShowParentOrMasterMembers(member.Mem_Code)}
              >
                العضو التابع له
              </Button>
            )}

            {member.MembershipType !== 'عضو تابع' && selectedMember && (
              <Button
                variant="primary btn-sm"
                onClick={() => handleShowParentOrMasterMembers(member.Mem_Code)}
              >
                الاعضاء التابعين
              </Button>
            )}
          </td>
            </tr>
      ))}
    </tbody>
   );
  }

// Function to render pagination
const renderPageNumbers = () => {
  return Array.from({ length: totalPages }, (_, i) => (
    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
        {i + 1}
      </button>
    </li>
  ));
};
return (
  <>
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Body>
            <Card.Header className="home-text-center p-1">قائمة الأعضاء</Card.Header>

            <Row className="mb-4">
              <Col>
                <div className="p-4">
                  <Form onSubmit={handleSearch}>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchTermChange}
                    />
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </Form>
                </div>
                {/* Display the count of search results */}
                {isFiltered && <p className="my-2">تم العثور على {members.length} نتيجة</p>}
              </Col>
            </Row>

            {/* Add a fixed height to the container to display the members list and page numbers */}
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>رقم العضوية</th>
                    <th>الصورة</th>
                    <th>الإسم</th>
                    <th>نوع العضوية</th>
                    <th>النوع</th>
                    <th>الوظيفة</th>
                    <th>موبيل</th>
                    <th>تاريخ الميلاد</th>
                    <th>العنوان</th>
                    <th>التحكم</th>
                  </tr>
                </thead>
                {renderMembers()}
              </Table>
            </div>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                <Pagination>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePrevPage}>
                          Previous
                        </button>
                      </li>
                      {renderPageNumbers()}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNextPage}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </Pagination>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Row>

      {/* Modal for displaying member details */}
        <Modal show={showMemberModal} onHide={handleCloseModal} dir="rtl">
     
     
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل العضو</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (
            <Card>
              <Card.Body>
                <div className="member-details">
                  <Card.Img
                    src={`${API_CONFIG.baseURL}/UserPics/${selectedMember.Mem_Photo}`}
                    alt="صورة العضو"
                    style={{ objectFit: 'cover', width: '50%', height: '50%', borderRadius: '50%' }}
                  />
                  <div className="member-info">
                  <div className="form-group">
                  <label className="label-color-name">إسم العضو:</label>
                  <h5>{selectedMember.Mem_Name}</h5>
                </div>
                <div className="form-group">
                  <label className="label-color">رقم العضوية:</label>
                  <input type="text" value={selectedMember.Mem_Code} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">تاريخ الميلاد:</label>
                  <input type="text" value={selectedMember.Mem_BOD} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">الرقم القومي:</label>
                  <input type="text" value={selectedMember.Mem_NID} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">التخرج:</label>
                  <input type="text" value={selectedMember.Graduation} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">عضوية الأب:</label>
                  <input type="text" value={selectedMember.Mem_ParentMember} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">الجنس:</label>
                  <input type="text" value={selectedMember.Gender} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">الوظيفة:</label>
                  <input type="text" value={selectedMember.Mem_Job} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">تصنيف الوظيفة:</label>
                  <input type="text" value={selectedMember.JobCategory} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">نوع العضوية:</label>
                  <input type="text" value={selectedMember.MembershipType} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">الديانة:</label>
                  <input type="text" value={selectedMember.Relegion} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">العنوان:</label>
                  <input type="text" value={selectedMember.Mem_Address} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">تاريخ الإنضمام:</label>
                  <input type="text" value={selectedMember.Mem_JoinDate} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">الفئة:</label>
                  <input type="text" value={selectedMember.Class} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">هاتف المنزل:</label>
                  <input type="text" value={selectedMember.Mem_HomePhone} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">الموبايل:</label>
                  <input type="text" value={selectedMember.Mem_Mobile} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">المستلم:</label>
                  <input type="text" value={selectedMember.Mem_Receiver} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">هاتف العمل:</label>
                  <input type="text" value={selectedMember.Mem_WorkPhone} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">ملاحظات:</label>
                  <input type="text" value={selectedMember.Mem_Notes} disabled />
                </div>
                <div className="form-group">
                  <label className="label-color">ملاحظات:</label>
                  <input type="text" value={selectedMember.Mem_Relation} disabled />
                </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying fees */}
      <Modal show={showFeesModal} onHide={handleCloseModal} dir="rtl">
    
        <Modal.Header closeButton>
          <Modal.Title>إشتراكات العضو</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && fees !== null && fees.length > 0 ? (
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
                    <td>{fee.Fee_Year}</td>
                    <td>{fee.Fee_Amount}</td>
                    <td>{fee.Fee_Date}</td>
                    <td>{fee.Fee_RecieptNumber}</td>
                    <td>{selectedMember.Status === -1 ? 'غير مسدد' : ' مسدد'}</td>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying parent members */}
      <Modal show={Boolean(parentMembers.length)} onHide={() => setParentMembers([])}>
       <Modal.Header closeButton>
          <Modal.Title>قائمة الأعضاء التابعين</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {parentMembers.length > 0 ? (
            <ul>
              {parentMembers.map((parentMember) => (
                <li key={parentMember.Mem_Code}>{parentMember.Mem_Name}</li>
              ))}
            </ul>
          ) : (
            <p>لا يوجد أعضاء تابعين لهذا العضو.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setParentMembers([])}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default Members;
