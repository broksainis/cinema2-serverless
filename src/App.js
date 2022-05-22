import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from './Movie';
import Movies from './Movies';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Movies></Movies>} />
          <Route path="/:ID" element={<Movie></Movie>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;