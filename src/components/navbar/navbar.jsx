import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function FavMovieNavbar({onLoggedOut}) {
  let navBarList;
  const token=localStorage.getItem("token");
  const user=localStorage.getItem("user");

  const isAuth=()=>{
    if(typeof window == "undefined") {
      return false;
    }
    if (token) {
      return token;
    } else {
      return false;
    }
  }

  if(isAuth()) {
    navBarList =<>
      <Nav.Link href={`/users/${user}`}>{`${user}'s Profile`}</Nav.Link>
      <Nav.Link href="/" onClick={onLoggedOut}>Logout</Nav.Link>
    </>
  } 

  return (
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href="/">FavMovie</Navbar.Brand>
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