import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Tooltip, Link, List, ListItem, ListItemText } from '@mui/material';
import './ResumeAtsScorePage.css'; // Import the CSS file

function ResumeAtsScorePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButtonEvent = (event) => {
      event.preventDefault();
      navigate('/');
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButtonEvent);

    return () => {
      window.removeEventListener('popstate', handleBackButtonEvent);
    };
  }, [navigate]);
  const location = useLocation();
  const { technical_skills, soft_skills, resume_score } = location?.state?.data;
  const missingTechnicalSkills = technical_skills

  const missingSoftSkills = soft_skills;

  const resumeScore = resume_score;

  return (
    <Box className="resume-container">
      <Typography variant="h4" className="resume-score">
        Your ATS Score: {resumeScore}
      </Typography>
      <Box className="skill-section">
        <Typography variant="h5" className="skill-title">Missing Technical Skills:</Typography>
        <List className="skill-list">
          {Object.entries(missingTechnicalSkills).map(([skill, url], index) => (
            <Tooltip key={index} title={`Learn more about ${skill}`} arrow>
              <ListItem className="skill-list-item">
                <Link href={url} target="_blank" rel="noopener noreferrer" className="skill-link">
                  {skill}
                </Link>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
      <Box className="skill-section">
        <Typography variant="h5" className="skill-title">Missing Soft Skills:</Typography>
        <List className="skill-list">
          {missingSoftSkills.map((skill, index) => (
            <ListItem key={index} className="skill-list-item missing-soft-skill">
              {skill}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default ResumeAtsScorePage;
