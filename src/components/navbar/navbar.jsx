import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function FavMovieNavbar({user, onLoggedOut}) {
  let navBarList;

  const isAuth=()=>{
    if(typeof window == "undefined") {
      return false;
    }
    if (user) {
      return user;
    } else {
      return false;
    }
  }
//href="/"
  if(isAuth()) {
    navBarList =<>
      <Nav.Link as={Link} to={`/users/${user}`}>{`${user}'s Profile`}</Nav.Link>
      <Nav.Link as={Link} to='/' onClick={onLoggedOut}>Logout</Nav.Link>
    </>
  } 

  return (
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">FavMovie</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {navBarList}      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FavMovieNavbar;