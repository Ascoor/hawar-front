import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Nav, Row, Col } from "react-bootstrap";

import API_CONFIG from "../../config";

import MemberDetailsModal from './Modals/MemberDetailsModal';
import FeesModal from './Modals/FeesModal';


const Members = () => {
  const [selectedMember, setSelectedMember] = useState([]);
  const [members, setMembers] = useState([]);
  const [category, setCategory] = useState("work"); // Initial active tab set to "work"
  // Separate state for MemberDetailsModal
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  // Separate state for MemberFeesModal
  const [showMemberFeesModal, setShowMemberFeesModal] = useState(false);
  const [fees, setFees] = useState([]);

  const handleTabChange = (tab) => {
    setCategory(tab);
  };
  
  // Fetch members from API based on activeTab
  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/member-category/${category}`)
      .then((response) => {
        setMembers(response.data);
      });
  }, [category]);


  const handleCloseModal = () => {
    setShowMemberDetailsModal(false);
    setShowMemberFeesModal(false); // Fix the typo here, use setShowMemberFeesModal instead of setShowMemberDetailsModal
  };

  const fetchFees = async (memberId) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/fees`, {
        params: {
          member_id: memberId,
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

    // Fetch fees for the selected member
    await fetchFees(member.id);
  };
  return (
    <>
      <Row>
        <Col xs={12} md={12}>
          <Nav variant="tabs" activeKey={category} onSelect={handleTabChange}>
            <Nav.Item>
              <Nav.Link eventKey="work">عضوية عاملة</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="founding">عضوية تأسيسية</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="affiliate">عضوية تابعة</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="honory">عضوية فخرية</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="seasonal">عضوية موسمي</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="A permit">تصريح</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="athletic">عضوية رياضي</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      {members.length === 0 ? (
        <p>لا يوجد أعضاء للعرض</p> // إظهار رسالة عندما لا يكون هناك أعضاء للعرض
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>رقم العضوية</th>
                <th>الصورة</th>
                <th>اسم العضو</th>
                <th>تاريخ الميلاد</th>
                <th>رقم الهاتف</th>
                <th>البريد الالكتروني</th>
                <th>العنوان</th>
                <th>العمليات</th> 
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.RegNum}>
                  <td>{member.RegNum}</td>
                  <td>
                    <img
                      src={`${API_CONFIG.baseURL}/UserPics/${member.Photo}`}
                      alt={member.FullName}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{member.FullName}</td>
                  <td>{member.BirthDate}</td>
                  <td>{member.Phone}</td>
                  <td>{member.Email}</td>
                  <td>{member.Address}</td>
                  <td>
                    <Button
                      variant="btn- btn-success btn-md"
                      onClick={() => handleShowMemberModal(member)}
                    >
                       التفاصيل
                    </Button>{" "}
                    </td>
                    <td>
                      
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
             </div>
             )}
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
    </>
  );
};

export default Members;