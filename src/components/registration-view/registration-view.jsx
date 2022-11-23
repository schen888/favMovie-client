import React, { useState } from 'react';
import axios from 'axios';
import {env} from '../../env';
import { Card, Form, Button, Stack, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function RegistrationView() {
  const registrationSuccessfulText = 'Registration successful, please login!';
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [usernameErr, setUsernameErr]=useState('');
  const [passwordErr, setPasswordErr]=useState('');
  const [emailErr, setEmailErr]=useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState('');

  const openToast = ()=>setShowToast(true);
  const closeToast = ()=>{
    setShowToast(false);
    if (toastInfo===registrationSuccessfulText) {
      window.open('/', '_self');  
    }
  }
  
  function validate(){
    let isReq=true;

    if(!username) {
      setUsernameErr('Username is required.');
      isReq=false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at lease 5 characters long.');
      isReq=false;
    }

    if(!password) {
      setPasswordErr('Password is required.');
      isReq=false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at lease 6 characters long.');
      isReq=false;
    }

    if(!email) {
      setEmailErr('Email address is required.');
      isReq=false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email address is not valid.');
      isReq=false;
    }

    return isReq;
  }

  function handleSubmit (e) {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post(`${env.API_URL}/users`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then((response) => {
        setToastInfo(registrationSuccessfulText);
        openToast();
      })
      .catch((response) => {
        console.error(response);
        setToastInfo(response.response.data);
        openToast();
      });

    }
  }
  

  return (
    <Card>
      <ToastContainer className="p-3" position='top-center'>
        <Toast show={showToast} onClose={closeToast} bg='primary'>
          <Toast.Header className="justify-content-between"><strong>FavMovie</strong></Toast.Header>
          <Toast.Body >{toastInfo}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Card.Title style={{ textAlign: "center", fontSize: "2rem" }}>
        Register
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
                placeholder="Username is required with at least 5 alphanumeric characters."
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
                placeholder="Password is required with at least 6 characters."
              />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Required"
              />
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
              <Form.Text className="text-muted">
                Optional
              </Form.Text>
            </Form.Group>

            <Stack direction="horizontal" className="mt-5 mb-3">
              <Link to="/" className="ms-auto">
                <Button variant="link" type="button">
                  Login
                </Button>
                <Button variant="primary" className='ms-3' type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Link>
            </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}