import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Ajoutez d'autres routes ici */}
        {/* <Route path="/autre-page" element={<AutrePage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
