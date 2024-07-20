import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BlogPostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state;

  return (
    <div className="container mt-4">
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className="mt-4">{post.title}</h1>
      <img src={post.urlToImage} alt={post.title} className="img-fluid" />
      <p className="mt-4">{post.content}</p>
      <p><small>{new Date(post.publishedAt).toLocaleDateString()}</small></p>
    </div>
  );
};

export default BlogPostDetails;
