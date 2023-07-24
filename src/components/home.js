import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import {
  FcBusinessman,
  FcCollaboration,
  FcQuestions,
  FcLeave,
  FcDonate,
  FcDocument,
  FcPaid,
  FcVoicePresentation,
  FcMoneyTransfer,
} from 'react-icons/fc';
import { useSpring, animated } from '@react-spring/web';
import API_CONFIG from '../config';

const Home = () => {
  // Define states for the counts
  const [workerMembersCount, setWorkerMembersCount] = useState(0);
  const [affiliateMembers, setAffiliateMembers] = useState(0);
  const [suspendedMembers, setSuspendedMembers] = useState(0);
  const [duesPaidUntil2022, setDuesPaidUntil2022] = useState(0);
  const [duesPaidUntil2023, setDuesPaidUntil2023] = useState(0);
  const [maleMembers, setMaleMembers] = useState(0);
  const [femaleMembers, setFemaleMembers] = useState(0);
  const [above25Members, setAbove25Members] = useState(0);
  const [above60Members, setAbove60Members] = useState(0);

  useEffect(() => {
    // Function to fetch all counts from the API endpoints
    const fetchCounts = async () => {
      try {
        const response = await Promise.all([
          fetch(`${API_CONFIG.baseURL}/api/member-work-count`),
          fetch(`${API_CONFIG.baseURL}/api/other-counts`),
          fetch(`${API_CONFIG.baseURL}/api/gender-count?gender=أنثى`),
          fetch(`${API_CONFIG.baseURL}/api/age-count?age=25`),
          fetch(`${API_CONFIG.baseURL}/api/category-count?category=عضو عامل`),
        ]);

        const data = await Promise.all(response.map(res => res.json()));
        setWorkerMembersCount(data[0].workerMembersCount);
        setAffiliateMembers(data[1].affiliateMembers);
        setSuspendedMembers(data[1].suspendedMembers);
        setDuesPaidUntil2022(data[1].duesPaidUntil2022);
        setDuesPaidUntil2023(data[1].duesPaidUntil2023);
        setMaleMembers(data[1].maleMembers);
        setFemaleMembers(data[2].count);
        setAbove25Members(data[3].count);
        setAbove60Members(data[4].count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);


  // Define the animated styles for the circle icons and counts
  const animatedStyles = useSpring({
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.5)' },
    delay: 200,
  });

  return (
    <Card>
      <Card.Header className="home-text-center p-1">
        <div className="big-font-container">
          <span className="big-font">لوحة التحكم</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="g-3 justify-content-center align-items-center">
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcBusinessman size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {workerMembersCount}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              الاعضاء العاملين
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcCollaboration size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {affiliateMembers}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              الاعضاء التابعين
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcLeave size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {suspendedMembers}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              العضويات المسقطة
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcMoneyTransfer size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {duesPaidUntil2022}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              العضويات المسددة حتى 2022
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcDonate size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {duesPaidUntil2023}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              العضويات المسددة حتى 2023
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcVoicePresentation size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {maleMembers}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              الأعضاء الذكور
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcPaid size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {femaleMembers}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              الأعضاء الإناث
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcDocument size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {above25Members}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              الأعضاء فوق سن 25
            </animated.div>
          </Col>
          <Col xs={6} sm={4} md={3} className="text-center">
            <animated.div className="circle-icon" style={animatedStyles}>
              <FcQuestions size={32} />
            </animated.div>
            <animated.div className="circle-count" style={animatedStyles}>
              {above60Members}
            </animated.div>
            <animated.div className="circle-label" style={animatedStyles}>
              الأعضاء فوق سن 60
            </animated.div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Home;
