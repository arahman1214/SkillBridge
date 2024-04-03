import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  return (
    <div className="home-page">
      <div className="decorative-shape shape-1"></div>
      <div className="decorative-shape shape-2"></div>
      <h1 className="dancing-text">SkillBridge: Bridging the Gap to Your Dream Job</h1>
      <h2 className="dancing-text">A Web Application Powered by AWS</h2>
      <Link to="/role-selection" className="start-button">Start Analyzing Your Resume</Link>
    </div>
  );
}

export default HomePage;
