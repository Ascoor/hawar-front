import React, { useState, useEffect } from 'react';
import { Pagination, Table, Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import API_CONFIG from '../../config';
import MemberDetailsModal from './Modals/MemberDetailsModal';
import FeesModal from './Modals/FeesModal';
import ParentMembersModal from './Modals/ParentMembersModal';

const ITEMS_PER_PAGE = 10;
const MEMBERS_PER_PAGE = 25;

const Members = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [feesData, setFeesData] = useState(null);
  const [memberDetailsData, setMemberDetailsData] = useState(null);
  const [parentMembersData, setParentMembersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/members`, {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
      });
      setMembers(response.data.data);
      setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
    };
    fetchMembers();
  }, [currentPage]);
  const fetchMembers = async () => {
    const response = await axios.get('/api/members', {
    params: {
    page: currentPage,
    limit: ITEMS_PER_PAGE
    }
    });
    setMembers(response.data.data);
    setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
    };
    const handleClearFilter = () => {
        setIsFiltered(false);
     
        fetchMembers();
      };
      
  const handleShowMemberModal = (member) => {
    setMemberDetailsData(member);
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const fetchFees = async (Mem_Code) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/fees?Mem_Code=${Mem_Code}`);
      setFeesData(response.data);
      setShowFeesModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchParentOrMasterMembers = async (Mem_Code) => {
    try {
    const selectedMember = members.find((member) => member.Mem_Code === Mem_Code);
    setSelectedMember(selectedMember);

    if (selectedMember.MembershipType === 'عضو عامل' && selectedMember.Mem_Relation) {
        // If the member is "عضو عامل" and has a relation, fetch the master member's relation
        const response = await axios.get(`${API_CONFIG.baseURL}/api/master-member-relation/${Mem_Code}`);
        setParentMembersData(response.data);
    } else if (selectedMember.MembershipType === 'عضو تابع') {
        // If the member is "عضو تابع," fetch the parent members
        fetchParentMembers(Mem_Code);
    }
    } catch (error) {
    console.log(error);
    }
};

  const fetchParentMembers = async (Mem_Code) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/parent-members/${Mem_Code}`);
      setParentMembersData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setShowMemberModal(false);
    setShowFeesModal(false);
  };

  const fetchMembersBySearchTerm = async (term, page) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/member-search/${term}?page=${page}&perPage=${MEMBERS_PER_PAGE}`
      );
      setMembers(response.data.data);
      setTotalPages(response.data.totalPages);
      setIsFiltered(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === '') {
      handleClearFilter();
    } else {
      setCurrentPage(1);
      fetchMembersBySearchTerm(searchTerm.trim(), 1);
    }
  };
  
  const hasParentMembers = (member) => {
    return member.Mem_ParentMember !== null && member.Mem_ParentMember.length > 0;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   // Render the pagination items
   const renderPaginationItems = () => {
    const paginationItems = [];
    const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    for (let i = 0; i < totalPagesArray.length; i += 10) {
      paginationItems.push(totalPagesArray.slice(i, i + 10));
    }

    return paginationItems.map((row, rowIndex) => (
      <div key={rowIndex} className="d-flex flex-row justify-content-center align-items-center">
        {row.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </div>
    ));
  };


   
  const renderMembers = () => {
    const startIndex = (currentPage - 1) * MEMBERS_PER_PAGE;
    const endIndex = startIndex + MEMBERS_PER_PAGE;
  
    const visibleMembers = members.slice(startIndex, endIndex);
  
    if (visibleMembers.length === 0) {
      return (
        <tr>
          <td colSpan="10">لا توجد نتائج مطابقة للبحث</td>
        </tr>
      );
    }
  
    return visibleMembers.map((member) => {
      return (
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
            {hasParentMembers(member) ? (
              <Button variant="primary" onClick={() => fetchParentOrMasterMembers(member.Mem_Code)}>
                عرض الأعضاء الأبويين
              </Button>
            ) : null}
          </td>
          <td>
            <Button variant="primary" onClick={() => fetchFees(member.Mem_Code)}>
              عرض الرسوم
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
     <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">الأعضاء</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSearch}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="ابحث عن عضو" value={searchTerm} onChange={handleSearchTermChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    بحث
                  </Button>
                    {isFiltered && (
            <Button variant="outline-secondary" onClick={handleClearFilter}>
            إلغاء الفلترة
          </Button>
                      
                    )}
                </Form>
                <br />
                {members.length > 0 ? (
  <Table striped bordered hover>
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
    <tbody>{renderMembers()}</tbody>
  </Table>
) : (
  <p>لا توجد بيانات للعرض</p>
)}   
  {members.length > 0 && (
                  <div className="d-flex justify-content-center">
                    <Pagination>
                      <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />

                      {/* New pagination JSX */}
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {renderPaginationItems()}
                      </div>
                      {/* End of new pagination JSX */}

                      <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                    </Pagination>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    
      {/* Modals */}
      {/* Member details modal */}
      <MemberDetailsModal show={showMemberModal} member={selectedMember} memberDetails={memberDetailsData} onClose={handleCloseModal} />
      {/* Fees modal */}
      <FeesModal show={showFeesModal} member={selectedMember} fees={feesData} onClose={handleCloseModal} />

      {/* Parent members modal */}
      <ParentMembersModal show={Boolean(parentMembersData.length)} members={parentMembersData} onClose={() => setParentMembersData([])} />
    </>
  );
};
export default Members;