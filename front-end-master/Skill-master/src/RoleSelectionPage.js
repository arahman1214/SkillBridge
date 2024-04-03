import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelectionPage.css'; // Import the CSS file for custom styling

function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleScan = () => {
    setIsLoading(true);
    fetch('http://localhost:5000/analyze-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle: selectedRole, resumeText: resumeText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        navigate('/resume-ats-score', { state: { data } }); // Navigate to the ATS score page with data
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };


  const handleCancel = () => {
    setResumeText('');
  };

  return (
    <div className="role-selection-container">
      <h1 className="text-center">Select Your Role</h1>
      <div className="role-selection-form">
        <select className="form-select" value={selectedRole} onChange={handleRoleChange}>
          <option value="" disabled>Select a role...</option>
          <option value="data_analyst">Data Analyst</option>
          <option value="full_stack_java">Full-Stack Java</option>
          <option value="full_stack_python">Full Stack Python</option>
          <option value="devops_engineer">DevOps Engineer</option>
        </select>
        <textarea
          className="form-control mt-3"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-3" onClick={handleScan}>Scan</button>
        <button className="btn btn-secondary mt-3" onClick={handleCancel}>Cancel</button>
        {isLoading && <div className="loading-spinner mt-3"></div>}
      </div>
    </div>
  );
}

export default RoleSelectionPage;
