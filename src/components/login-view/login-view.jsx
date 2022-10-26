import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, Form, Button, Stack} from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent browser reload after click the submit.
    console.log(username, password);
    axios.post('https://favmovie123.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then((response) => {
      const data = response.data;
      console.log(response.data);
      props.onLoggedIn(data);
      
    })
    .catch((e) => {
      console.log(e, 'no such user')
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card>
            <Card.Title style={{ textAlign: "center", fontSize: "2rem" }} className="mt-3">
              Login
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

                  <Button variant="link" type="button" className="ml-2">
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