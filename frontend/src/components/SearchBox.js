import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Header.css'; // Import custom CSS for styling

function SearchBox() {
  const [keyword, setKeyword] = useState('');

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-form">
      <div className="search-box-container">
        <Form.Control
          type="text"
          name="q"
          placeholder="Search..."
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        <Button type="submit" variant="outline-light" className="search-button">
          <i className="fas fa-search"></i>
        </Button>
      </div>
    </Form>
  );
}

export default SearchBox;
