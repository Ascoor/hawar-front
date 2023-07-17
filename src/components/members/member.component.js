import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Modal, Form, Card, Pagination, Container } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../config';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const MemberList = () => {
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
  const [searchResults, setSearchResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset currentPage to 1 when performing a new search
    fetchMembersBySearchTerm(searchTerm);
    setSearchResults([]);
    setIsFiltered(true);
  };

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

  const fetchParentMembers = async (Mem_Code) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/parent-members?Mem_Code=${Mem_Code}`);
      setParentMembers(response.data);
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

  const handleShowParentMembers = (member) => {
    setSelectedMember(member);
    setShowParentMembersModal(true);
    fetchParentMembers(member.Mem_Code);
  };

  const handleCloseModal = () => {
    setShowMemberModal(false);
    setShowFeesModal(false);
    setShowParentMembersModal(false);
    setFees(null);
    setIsFiltered(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchMembersBySearchTerm = async (term) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/members?search=${term}`);
      const filteredMembers = response.data.data.filter((member) => {
        return (
          member.Mem_Code.toLowerCase().includes(term.toLowerCase()) ||
          member.Mem_Name.toLowerCase().includes(term.toLowerCase()) ||
          member.Mem_BOD.toLowerCase().includes(term.toLowerCase()) ||
          member.Mem_Mobile.toLowerCase().includes(term.toLowerCase())
        );
      });
      setSearchResults(filteredMembers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMembers = () => {
    const dataToRender = isFiltered ? searchResults : members;
    return dataToRender.map((member) => (
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
              src={`${API_CONFIG.baseURL}/UserPics/${member.Mem_Photo}`}
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
          {/* Display the "Parent Members" button if MembershipType is "عضو عامل" */}
          {member.MembershipType === 'عضو عامل' && member.Mem_ParentMember && (
            <Button variant="primary btn-sm" onClick={() => handleShowParentMembers(member)}>
              الأعضاء التابعين
            </Button>
          )}
        </td>
      </tr>
    ));
  };

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
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center my-4">قائمة الأعضاء</h1>
          <Card>
            <Card.Body>
              {/* Search form */}
              <Row className="mb-4">
                <Col>
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
                </Col>
              </Row>
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
    <Modal.Header className="home-text-center" closeButton>
      <Modal.Title>تفاصيل العضو</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedMember && (
        <Card>
          <Card.Body>
            <div className="member-details">
            <Card.Img
                        src={`${API_CONFIG.baseURL}/UserPics/${selectedMember.Mem_Photo}`}
                        alt="Member Photo"
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
                {/* Add more form-group elements for other member details */}
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
        <Modal show={showParentMembersModal} onHide={handleCloseModal} dir="rtl">
  <Modal.Header closeButton>
    <Modal.Title>الأعضاء التابعين</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedMember && parentMembers !== null && parentMembers.length > 0 ? (
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              {Object.keys(parentMembers[0]).map((key) => (
                parentMembers.some((parentMember) => parentMember[key] !== null) && (
                  <th key={key}>{key}</th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {parentMembers.map((parentMember) => (
              <tr key={parentMember.id}>
                {Object.entries(parentMember).map(([key, value]) => (
                  parentMembers.some((parentMember) => parentMember[key] !== null) && (
                    <td key={key}>
                      {key === 'Mem_Photo' ? (
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>

          <Card.Img
               src={`${API_CONFIG.baseURL}/UserPics/${parentMember.Mem_Photo}`}
               alt="Member Photo"
               style={{ objectFit: 'cover', width: '50%', height: '50%', borderRadius: '50%' }}
             />





                        </div>
                      ) : value ? (
                        value
                      ) : (
                        '-'
                      )}
                    </td>

                  )
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ) : (
      parentMembers === null && <p>جارٍ تحميل الأعضاء التابعين...</p>
    )}
    {parentMembers !== null && parentMembers.length === 0 && <p>لا توجد أعضاء تابعين لهذا العضو.</p>}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      إغلاق
    </Button>
  </Modal.Footer>
</Modal>
  
        </Container>
    );
  };

  export default MemberList;
