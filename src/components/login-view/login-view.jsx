import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Card, Form, Button, Stack} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 5){
     setUsernameErr('Username must be at least 5 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPasswordErr('Password must be at least 6 characters long');
     isReq = false;
    }
    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://favmovie123.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then((response) => {
        const data = response.data;
        console.log('Login response:', response);
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e, 'no such user')
      });
    }
  };

  return (
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
            {usernameErr && <p>{usernameErr}</p>}
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
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Stack direction="horizontal" gap={2} className="mt-5 mb-3">
            <Link to="/register"  className="ms-auto">
              <Button variant="link" type="button">
                Register
              </Button>
            </Link>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};