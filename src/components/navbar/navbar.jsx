import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function FavMovieNavbar({username, onLoggedOut}) {
  let navBarList;

  const isAuth=()=>{
    if(typeof window == "undefined") {
      return false;
    }
    if (username) {
      return username;
    } else {
      return false;
    }
  }

  if(isAuth()) {
    navBarList =<>
      <Nav.Link as={Link} to={`/users/${username}`} id='navProfile'>{`${username}'s Profile`}</Nav.Link>
      <Nav.Link as={Link} to='/' onClick={onLoggedOut}>Logout</Nav.Link>
    </>
  } 

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container className='px-4'>
        <Navbar.Brand as={Link} to="/">FavMovie</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {navBarList}      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FavMovieNavbar;

FavMovieNavbar.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
  username: PropTypes.string
};