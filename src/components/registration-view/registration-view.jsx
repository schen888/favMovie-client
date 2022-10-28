import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Stack } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [usernameErr, setUsernameErr]=useState('');
  const [passwordErr, setPasswordErr]=useState('');
  const [emailErr, setEmailErr]=useState('');

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
      setPasswordErr('Password must be at lease 5 characters long.');
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

  function handleRegister (e) {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://favmovie123.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alter('Registration successful, please login!');
        window.open('/', '_self')
      })
      .catch((response) => {
        console.error(response);
        alter('unable to register');
      });

    }
  }
  

  return (
    <Card>
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
                placeholder="Required"
              />
              {usernameErr && <p>{usernameErr}</p>}
                <Form.Text className='text-muted'>
                Username is required with at least 5 alphanumeric characters.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Required"
              />
              {passwordErr && <p>{passwordErr}</p>}
              <Form.Text className='text-muted'>
              Password is required with at least 6 characters.
                </Form.Text>
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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
              <Button variant="primary" type="submit" onClick={handleRegister}>
                Register
              </Button>

              <Link to="/">
                <Button variant="link" type="button" className="ml-2">
                  Already registerd
                </Button>
              </Link>
            </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}