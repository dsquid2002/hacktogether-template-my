// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SessionJoiner from './Pages/SessionJoiner/SessionJoiner';

const PlannerSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Select a Planner</h1>
      <button onClick={() => navigate('/session/join/shopping')}>Shopping List</button>
      <button onClick={() => navigate('/session/join/trip')}>Trip Planner</button>
      <button onClick={() => navigate('/session/join/gathering')}>Gathering Planner</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlannerSelection />} />
        <Route path="/session/join/:plannerType" element={<SessionJoiner />} />
      </Routes>
    </Router>
  );
};

export default App;
