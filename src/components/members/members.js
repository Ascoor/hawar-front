import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button,Card } from "react-bootstrap";
import { RiEdit2Line } from "react-icons/ri";
import API_CONFIG from "../../config";
const Members = () => {
  const [members, setMembers] = useState([]);

  // Fetch members from API
  useEffect(() => {
    axios.get(`${API_CONFIG.baseURL}/api/members`).then((response) => {
      setMembers(response.data);
    });
  }, []);
  return (
    <>
     <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم العضوية</th>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>الفئة</th>
            <th>العلاقة</th>
            <th>الجنس</th>
            <th>الديانة</th>
            <th>العنوان</th>
            <th>المهنة</th>
            <th>موبيل</th>
            <th>الحالة</th>
         
            <th>حالة التجديد</th>
            <th>تاريخ اخر تجديد</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
               <td>{member.RegNum}</td>
               <td>
          <Card
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
            }}
          >
            <Card.Img
              src={`${API_CONFIG.baseURL}/UserPics/${member.Photo}`}
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

              <td>{member.Name}</td>
              <td>{member.Category}</td>
              <td>{member.Relation}</td>
              <td>{member.Gender}</td>
              <td>{member.Relegion}</td>
              <td>{member.Address}</td>
              <td>{member.Profession}</td>
              <td>{member.Phone}</td>
              <td>{member.Status}</td>
              <td>{member.RenewalStatus}</td>
              <td>{member.Remarks}</td>

        
              <td>
                <Button variant="info">
                  <RiEdit2Line />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default Members;
