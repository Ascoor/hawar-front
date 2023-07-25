import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Nav, Row, Dropdown, Col, Card } from "react-bootstrap";

import API_CONFIG from "../../config";

import MemberDetailsModal from './Modals/MemberDetailsModal';
import FeesModal from './Modals/FeesModal';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [category, setCategory] = useState("work");
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [showMemberFeesModal, setShowMemberFeesModal] = useState(false);
  const [fees, setFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null); // Add this line to declare the selectedMember state

  const handleTabChange = (tab) => {
    setCategory(tab);
  };

  useEffect(() => {
    // Send the search request to the server using Axios
    axios
      .get(`${API_CONFIG.baseURL}/api/members/search`, {
        params: {
          searchTerm: searchTerm,
        },
      })
      .then((response) => {
        setMembers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, searchTerm]); // Dependency array includes category and searchTerm

  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/member-category`, {
        params: {
          category: category,
        },
      })
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, searchTerm]); // Dependency array includes category and searchTerm

  const handleCloseModal = () => {
    setShowMemberDetailsModal(false);
    setShowMemberFeesModal(false);
  };

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

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Set searchTerm instead of searchQuery
  };

  const memberships = [
    { eventKey: "work", label: "عضوية عاملة" },
    { eventKey: "affiliate", label: "عضوية تابعة" },
    { eventKey: "founding", label: "عضوية مؤسسة" },
  ];

  const additionalMemberships = [
    { eventKey: "honory", label: "عضوية فخرية" },
    { eventKey: "seasonal", label: "عضوية موسمي" },
    { eventKey: "A permit", label: "تصريح" },
    { eventKey: "athletic", label: "عضوية رياضي" },
  ];

  return (
    <Row className="p-4">
      <Col xs={12}>
        <Card className="p-4">
          <Card.Title>
            {/* Main Memberships */}
            <Nav variant="tabs" activeKey={category} onSelect={handleTabChange} className="nav-tabs-responsive">
              {memberships.map((navItem) => (
                <Nav.Item key={navItem.eventKey}>
                  <Nav.Link eventKey={navItem.eventKey}>{navItem.label}</Nav.Link>
                </Nav.Item>
              ))}
              {/* Additional Memberships */}
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} id="additional-memberships-dropdown">
                  أنواع أخرى
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {additionalMemberships.map((navItem) => (
                    <Dropdown.Item key={navItem.eventKey} eventKey={navItem.eventKey}>
                      {navItem.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Card.Title>
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "10px" }}
          />
          {members.length === 0 ? (
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
                      <th>العمليات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td>{member.RegNum}</td>
                        <td>
                          <img
                            src={`${API_CONFIG.baseURL}/UserPics/${member.Photo}`}
                            alt={member.FullName}
                            className="img-thumbnail"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                        <td>{member.Name}</td>
                        <td>{member.Age}</td>
                        <td>{member.Phone}</td>
                        <td>{member.Gender}</td>
                        <td>{member.Address}</td>
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
        </Card>
      </Col>
      {/* Member Details Modal */}
      <MemberDetailsModal
        show={showMemberDetailsModal}
        member={selectedMember}
        onClose={handleCloseModal}
      />

      {/* Fees modal */}
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
