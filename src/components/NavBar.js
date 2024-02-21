import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log(response.data);
    localStorage.removeItem('token'); 
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error); 
  }
};

const NavBar = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Events</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto justify-content-end">
          {!isAuthenticated() && (
            <>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          )}
          {isAuthenticated() && (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;







