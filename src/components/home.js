import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MemberIcon from "../assest/icons/members.jpg";
import maleIcon from "../assest/icons/male.jpg";
import femaleIcon from "../assest/icons/female.jpg";
import partMemberIcon from "../assest/icons/part-members.jpg";
import over25 from "../assest/icons/over25.jpg";
import over60 from "../assest/icons/over60.jpg";
import prevYear from "../assest/icons/prevyear.jpg";
import yearPay from "../assest/icons/yearpay.jpg";
import ignoredIcon from "../assest/icons/ignored-member.png";
import DashBoard from "../images/logo2.png";
import {
  Card,
  Container,
  // Row,
  //  Col,
  //   Button,
  //  Form
} from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import API_CONFIG from '../config';
import '../assest/css/home.css';

const useIconCardAnimation = () => {
  const [hovered, setHovered] = useState(false);

  const [touched, setTouched] = useState(false);
  const cardSpringStyles = useSpring({
    scale: hovered || touched ? 1.1 : 1,
    y: touched ? -5 : 0,
  });
  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverEnd = () => {
    setHovered(false);
  };

  const handleTouchStart = () => {
    setTouched(true);
  };

  const handleTouchEnd = () => {
    setTouched(false);
  };

  return { cardSpringStyles, handleHover, handleHoverEnd, handleTouchStart, handleTouchEnd };
};
const EventCard = ({ title, count, icon }) => {
  const { cardSpringStyles, handleHover, handleHoverEnd } = useIconCardAnimation();

  return (<animated.div
    style={cardSpringStyles}
    onMouseEnter={handleHover}
    onMouseLeave={handleHoverEnd}
    onTouchStart={handleHover}
    onTouchEnd={handleHoverEnd}

  >
    <Card className="text-center event-card m-3" style={{

      fontFamily: "'ArabicFont', Arial, sans-serif",
      background: "linear-gradient(#0b1626, #031e49, #040f21)",

      alignItems: "center",

      border: "6px solid #faa61a",
      height:"150px",
      width:"250px",
      padding:"auto",
      margin:"auto",

      justifyContent: "center",
    }}>
      <Card.Body className="event-card-body">
        <div className="event-card-icon">{icon}</div>
        <div className="event-card-title m-10">{title}</div>
        <span className="count">{count}</span>
      </Card.Body>
    </Card>
  </animated.div>
  );
};
function toArabicNumeral(en) {
  return ("" + en).replace(/[0-9]/g, function (t) {
    return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t + 1);
  });
}

const Home = () => {
  const [workMemberCount, setWorkMemberCount] = useState([0]);
  const [partMemberCount, setPartMemberCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [countOver60, setCountOver60] = useState(0);
  const [countOver25, setCountOver25] = useState(0);
  const [membersPaidCurrentYear, setMembersPaidCurrentYear] = useState(0);
  const [membersPaidPreviousYear, setMembersPaidPreviousYear] = useState(0);
  const [membersIgnored, setMembersIgnored] = useState(0);

  // const [searchText, setSearchText] = useState(''); // State to store the search text
  // const [searchResults, setSearchResults] = useState([]); // State to store the search results
  // const [showResults, setShowResults] = useState(false); // State to determine whether search results should be displayed or not
  // const [searchType, setSearchType] = useState('clients'); // State to store the selected search type

  useEffect(() => {

  }, []);
  useEffect(() => {
    fetchWorkMemberCount();
  }, []);

  const fetchWorkMemberCount = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/member-count`);
      setWorkMemberCount(response.data.workMemberCount);
      setPartMemberCount(response.data.partMemberCount);
      setMaleCount(response.data.maleCount);
      setFemaleCount(response.data.femaleCount);
      setCountOver25(response.data.countOver25);
      setCountOver60(response.data.countOver60);
      setMembersPaidCurrentYear(response.data.membersPaidCurrentFiscalYear);
      setMembersPaidPreviousYear(response.data.membersPaidPreviousFiscalYear);
      setMembersIgnored(response.data.membersIgnored);
    } catch (error) {
      console.log(error);
    }
  };




  // const handleFormSubmit = async (e) => {
  //     e.preventDefault();
  //     handleSearch();
  // };

  // const handleSearch = async () => {
  //     setShowResults(true); // Show search results

  //     try {
  //         let endpoint = '';

  //         if (searchType === 'clients') {
  //             endpoint = `${API_CONFIG.baseURL}/api/client-search`;
  //         } else if (searchType === 'legCases') {
  //             endpoint = `${API_CONFIG.baseURL}/api/leg-case-search`;
  //         }

  //         const response = await axios.get(endpoint, {
  //             params: {
  //                 query: searchText,
  //             },
  //         });


  //         setSearchResults(response.data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };


  // const handleSearchInputChange = (e) => {
  //     setSearchText(e.target.value);
  // };

  return (

    <Container>
      <Card>
        <Card.Header className="home-text-center">
          <div className="court-setting-card-header">
            <img src={DashBoard} alt="Icon" className="dashboard-icon" />
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap justify-content-center mb-3">
            {/* Add the "custom-text-center" class */}
            <Link to="/members" style={{ textDecoration: 'none' }}>
              <EventCard
                title="الاعضاء العاملين"

                count={toArabicNumeral(workMemberCount)}
                icon={<img src={MemberIcon} alt="Icon" className="members-icon" />}
              />
            </Link>
            <Link to="/legcases" style={{ textDecoration: 'none' }}>
              <EventCard
                title="الاعضاء التابعين"

                count={toArabicNumeral(partMemberCount)}
                icon={<img src={partMemberIcon} alt="Icon" className="part-members-icon" />}
              />
            </Link>
            <Link to="/procedures" style={{ textDecoration: 'none' }}>
              <EventCard
                title="الأعضاء الذكور"

                count={toArabicNumeral(maleCount)}
                icon={<img src={maleIcon} alt="Icon" className="male-icon" />}
              />
            </Link>
            <EventCard
              title="الأعضاء الإناث"

              count={toArabicNumeral(femaleCount)}
              icon={<img src={femaleIcon} alt="Icon" className="female-icon" />}
            />
            <EventCard
              title="العضويات المسقطة"

              count={toArabicNumeral(membersIgnored)}
              icon={<img src={ignoredIcon} alt="Icon" className="defualt-icon" />}
            />
            <EventCard
              title="السن فوق 60"

              count={toArabicNumeral(countOver60)}
              icon={<img src={over60} alt="Icon" className="defualt-icon" />}
            />
            <EventCard
              title="السن فوق 25"

              count={toArabicNumeral(countOver25)}
              icon={<img src={over25} alt="Icon" className="defualt-icon" />}
            />
            <EventCard
              title="المسدد لهذا العام"

              count={toArabicNumeral(membersPaidCurrentYear)}
              icon={<img src={yearPay} alt="Icon" className="defualt-icon" />}
            />
            <EventCard
              title="المسدد للعام السابق"

              count={toArabicNumeral(membersPaidPreviousYear)}
              icon={<img src={prevYear} alt="Icon" className="defualt-icon" />}
            />
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-12">
        <Card.Header className="home-text-center">
          <h3>بحث</h3>
        </Card.Header>
        <Card.Body>
          {/* Your search form */}
        </Card.Body>
      </Card>

      {/* Uncomment and add the relevant content for your search results */}
    </Container>
  );
};

export default Home;