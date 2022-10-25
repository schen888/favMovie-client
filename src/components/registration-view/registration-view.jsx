import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Stack } from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10} lg={8}>
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
                    <Button variant="primary" type="button" onClick={e=>props.onRegisterTrue()}>
                      Register
                    </Button>

                    <Button variant="link" type="button" onClick={e=>props.onRegisterTrue()} className="ml-2">
                      Already registerd
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