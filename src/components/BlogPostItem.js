import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const BlogPostItem = ({ post, index }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${index}`} state={{ post }}>
            {post.title}
          </Link>
        </Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <Card.Footer className="text-muted">{new Date(post.publishedAt).toLocaleDateString()}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default BlogPostItem;
