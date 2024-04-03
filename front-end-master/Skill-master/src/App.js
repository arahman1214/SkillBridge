import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RoleSelectionPage from './RoleSelectionPage';
import ResumeAtsScorePage from './ResumeAtsScorePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/resume-ats-score" element={<ResumeAtsScorePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
