import React from "react";
import { useSpring, animated } from "@react-spring/web";
import BgVideo from '../videos/cover.webm';

const Welcom = () => {
  const animation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  return (
    <div className="landing-page">
      <div className="video-container">
      <video autoPlay loop muted className="bg-vid"><source src={BgVideo} type="video/mp4" /> </video>
      </div>
      <animated.div style={animation} className="content">
        <h1>Welcome to Our Landing Page</h1>
        <p>Discover Amazing Things with Us</p>
      </animated.div>
    </div>
  );
};

export default Welcom;
