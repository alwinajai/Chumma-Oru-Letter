import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HeartsBackground from './components/HeartsBackground';
import Home from './pages/Home';
import Letter from './pages/Letter';

function App() {
  return (
    <Router>
      {/* Background stays persistent across routes */}
      <HeartsBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letter" element={<Letter />} />
      </Routes>
    </Router>
  );
}

export default App;
