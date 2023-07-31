import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Nav, Row, Dropdown, Col, Card } from "react-bootstrap";

import API_CONFIG from "../../config";

import MemberDetailsModal from './Modals/MemberDetailsModal';
import FeesModal from './Modals/FeesModal';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [showMemberFeesModal, setShowMemberFeesModal] = useState(false);
  const [showAdditionalMemberships, setShowAdditionalMemberships] = useState(false);
  const [fees, setFees] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("work");
  const membersPerPage = 25;

  useEffect(() => {
    if (searchTerm === "") {
      fetchMembersByCategory(category);
    } else {
      fetchMembersBySearch();
    }
  }, [category, searchTerm]);

  const fetchMembersBySearch = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/members/search`, {
        params: {
          searchTerm: searchTerm,
        },
      });
      const membersArray = Object.values(response.data);
      setMembers(membersArray);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembersByCategory = async (selectedCategory) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/member-category`, {
        params: {
          category: selectedCategory,
        },
      });
      const membersArray = Object.values(response.data);
      setMembers(membersArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      fetchMembersByCategory("work");
    } else {
      fetchMembersBySearch();
    }
  }, [searchTerm]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseModal = () => {
    setShowMemberDetailsModal(false);
    setShowMemberFeesModal(false);
  };

  const handleShowAdditionalMemberships = () => {
    setShowAdditionalMemberships(true);
  };

  const mainMemberships = [
    { eventKey: "work", label: "عضوية عاملة" },
  ];

  const fetchFees = async (MemberID) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/fees`, {
        params: {
          member_id: MemberID,
        },
      });
      setFees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMemberModal = (member) => {
    setSelectedMember(member);
    setShowMemberDetailsModal(true);
  };

  const handleShowMemberFeesModal = async (member) => {
    setSelectedMember(member);
    setShowMemberFeesModal(true);
    await fetchFees(member.id);
  };

  const handleTabChange = (tab) => {
    setCategory(tab);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const memberships = [
    { eventKey: "affiliate", label: "عضوية تابعة" },
    { eventKey: "founding", label: "عضوية مؤسسة" },
  ];

  const additionalMemberships = [
    { eventKey: "honory", label: "عضوية فخرية" },
    { eventKey: "seasonal", label: "عضوية موسمي" },
    { eventKey: "A permit", label: "تصريح" },
    { eventKey: "athletic", label: "عضوية رياضي" },
  ];

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <Row className="p-4">
      <Col xs={12}>
        <Card className="p-4">
          <Card.Title>
            {/* Main Memberships */}
            <Nav variant="tabs" onSelect={handleTabChange} className="nav-tabs-responsive">
              {mainMemberships.map((navItem) => (
                <Nav.Item key={navItem.eventKey}>
                  <Nav.Link eventKey={navItem.eventKey}>{navItem.label}</Nav.Link>
                </Nav.Item>
              ))}
              {memberships.map((navItem) => (
                <Nav.Item key={navItem.eventKey}>
                  <Nav.Link eventKey={navItem.eventKey}>{navItem.label}</Nav.Link>
                </Nav.Item>
              ))}

              {!showAdditionalMemberships && (
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} id="additional-memberships-dropdown" onClick={handleShowAdditionalMemberships}>
                    أنواع أخرى
                  </Dropdown.Toggle>
                </Dropdown>
              )}
            </Nav>
          </Card.Title>
          {/* ... (existing code) */}
          {showAdditionalMemberships && (
            <div>
              <Nav variant="tabs" onSelect={handleTabChange} className="nav-tabs-responsive">
                {additionalMemberships.map((navItem) => (
                  <Nav.Item key={navItem.eventKey}>
                    <Nav.Link eventKey={navItem.eventKey}>{navItem.label}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              {/* ... (existing code) */}
            </div>
          )}
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "10px" }}
          />
          {currentMembers.length === 0 ? (
            <p>لا يوجد أعضاء للعرض</p>
          ) : (
            <div className="table-responsive">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>رقم العضوية</th>
                      <th>الصورة</th>
                      <th>اسم العضو</th>
                      <th>السن</th>
                      <th>رقم الهاتف</th>
                      <th>الجنس</th>
                      <th>العنوان</th>
                      <th>العضوية</th>
                      <th>العمليات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMembers.map((member) => (
                      <tr key={member.id}>
                        <td>{member.member_id}</td>
                        <td>
                          <img
                            src={`${API_CONFIG.baseURL}/UserPics/${member.photo}`}
                            alt={member.FullName}
                            className="img-thumbnail"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                        <td>{member.name}</td>
                        <td>{member.age}</td>
                        <td>{member.phone}</td>
                        <td>{member.gender}</td>
                        <td>{member.address}</td>
                        <td>
                          {category === "work"
                            ? "عضوية عاملة"
                            : category === "affiliate"
                            ? "عضوية تابعة"
                            : "عضوية مؤسسة"}
                        </td>
                        <td>
                          <Button
                            variant="btn- btn-success btn-md"
                            onClick={() => handleShowMemberModal(member)}
                          >
                            التفاصيل
                          </Button>{" "}
                          <Button
                            variant="btn btn-primary "
                            onClick={() => handleShowMemberFeesModal(member)}
                          >
                            الإشتراكات
                          </Button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {Array.from({ length: members.last_page }).map((_, index) => (
                  <li key={index} className={`page-item${(index + 1) === currentPage ? " active" : ""}`}>
                    <button
                      onClick={() => handlePagination(index + 1)}
                      className="page-link"
                      style={{ border: "none", background: "none", cursor: "pointer" }}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Card>
      </Col>
      {selectedMember && (
        <MemberDetailsModal
          show={showMemberDetailsModal}
          member={selectedMember}
          onClose={handleCloseModal}
        />
      )}
      <FeesModal
        show={showMemberFeesModal}
        member={selectedMember}
        fees={fees}
        onClose={handleCloseModal}
      />
    </Row>
  );
};

export default Members;
