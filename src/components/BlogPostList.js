import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Spinner, Alert, Pagination } from 'react-bootstrap';
import _ from 'lodash';
import BlogPostItem from './BlogPostItem';


const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  


  useEffect(() => {
    const fetchPosts = async () => {
      
      try {
        setLoading(true);
        const  response = await axios.get(`https://newsapi.org/v2/everything?q=technology&page=${currentPage}&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`);
        setPosts(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const getPaginationItems = () => {
    const pageNeighbours = 2;
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = _.range(startPage, endPage + 1);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = _.range(startPage - spillOffset, startPage);
          pages = ['LEFT', ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = _.range(endPage + 1, endPage + spillOffset + 1);
          pages = [...pages, ...extraPages, 'RIGHT'];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = ['LEFT', ...pages, 'RIGHT'];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return _.range(1, totalPages + 1);
  };

  const handlePageChange = (page) => {
    if (page === 'LEFT') {
      setCurrentPage(currentPage - 1);
    } else if (page === 'RIGHT') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Blog Posts</h1>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <div>
          {posts.map((post, index) => (
            <BlogPostItem key={index} post={post} index={index} />
          ))}
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {getPaginationItems().map((page, index) => (
              <Pagination.Item key={index} active={page === currentPage} onClick={() => handlePageChange(page)}>
                {page === 'LEFT' ? '...' : page === 'RIGHT' ? '...' : page}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
