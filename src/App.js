import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router basename='/blog'>
      <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPostDetails />} />
      </Routes>
    </Router>
  );
};

export default App;