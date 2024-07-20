import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BlogPostList from './BlogPostList';

describe('BlogPostList Component', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should render loading spinner initially', async () => {
    mock.onGet().reply(200, {
      articles: [],
      totalResults: 0,
    });

    render(<BlogPostList />);

    expect(screen.getByText(/Blog Posts/i)).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

    expect(screen.getByText(/No blog posts found/i)).toBeInTheDocument();
  });

  it('should fetch and display blog posts', async () => {
    const mockPosts = [
      { title: 'Post 1', description: 'Description 1', publishedAt: new Date().toISOString() },
      { title: 'Post 2', description: 'Description 2', publishedAt: new Date().toISOString() },
    ];

    mock.onGet().reply(200, {
      articles: mockPosts,
      totalResults: 2,
    });

    render(<BlogPostList />);

    await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

    expect(screen.queryByText(/No blog posts found/i)).not.toBeInTheDocument();

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.description)).toBeInTheDocument();
      expect(screen.getByText(new Date(post.publishedAt).toLocaleDateString())).toBeInTheDocument();
    });
  });
});
