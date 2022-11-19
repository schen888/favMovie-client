import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, ToastContainer, Toast } from 'react-bootstrap';

import {setUser} from '../../actions/actions';
import {connect} from 'react-redux';
import { useEffect } from 'react';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

function UserUpdate (props) {  
  const updateSuccessInfo='Update successful!';
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [usernameErr, setUsernameErr]=useState('');
  const [passwordErr, setPasswordErr]=useState('');
  const [emailErr, setEmailErr]=useState('');

  const token=localStorage.getItem('token');
  const userLocal=localStorage.getItem('user');

  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState('');

  const openToast = ()=>setShowToast(true);
  const closeToast = () => {
    setShowToast(false);
    if (toastInfo===updateSuccessInfo) {
      window.open(`/users/${userLocal}`,'_self');
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
    let config={
      headers: { Authorization: `Bearer ${token}`}
    }
    if (isReq) {
      axios.put(`https://favmovie123.herokuapp.com/users/${userLocal}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },config)
      .then((response) => {
        const data = response.data;
        localStorage.setItem('user', data.Username);
        setToastInfo(updateSuccessInfo);
        openToast();
      })
      .catch((err) => {
        console.error(err);
        setToastInfo(err.message);
        openToast();
      });

    }
  }

  return (
    <>
      <ToastContainer className="p-3" position='top-center'>
        <Toast show={showToast} onClose={closeToast} bg='primary'>
          <Toast.Header className="justify-content-between"><strong>FavMovie</strong></Toast.Header>
          <Toast.Body >{toastInfo}</Toast.Body>
        </Toast>
      </ToastContainer>
      <h4>Update your info here:</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            minLength="5"
            placeholder="Username is required with at least 5 characters."
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
        <div className='d-flex'>
          <Button variant="primary" className='ms-auto' type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
      </Form>
    </>
  )
}

export default connect(mapStateToProps, { setUser } )(UserUpdate);

UserUpdate.propTypes = {
  user: PropTypes.object
};
