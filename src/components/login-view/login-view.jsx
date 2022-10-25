import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, Form, Button, Stack, Link} from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10} lg={8}>
          <Card>
            <Card.Title style={{ textAlign: "center", fontSize: "2rem" }} className="mt-3">
              Log in
            </Card.Title>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    minLength="5"
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength="6"
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Stack direction="horizontal" className="mt-5 mb-3">
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>

                  <Button variant="light" type="button" onClick={e => props.onRegisterFalse()} className="ms-auto">
                    Register
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};