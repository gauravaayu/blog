import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostItem from './BlogPostItem';

describe('BlogPostItem Component', () => {
  const post = {
    title: 'Post Title',
    description: 'Post Description',
    publishedAt: new Date().toISOString(),
  };

  it('should render blog post details', () => {
    render(<BlogPostItem post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(screen.getByText(new Date(post.publishedAt).toLocaleDateString())).toBeInTheDocument();
  });
});
