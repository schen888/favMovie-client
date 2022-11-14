import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, ToastContainer, Toast } from 'react-bootstrap';

import {connect} from 'react-redux';
import {setUser} from '../../actions/actions';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

export function UserInfo (props) {
const {user} = props;
const token=localStorage.getItem('token');
const {Username, Email, Birthday} = user;

const [showToast, setShowToast] = useState(false);
const [toastInfo, setToastInfo] = useState('');

const openToast = ()=>setShowToast(true);
const closeToast = ()=>{
  props.setUser('');
  localStorage.clear();
  setShowToast(false);
  if (toastInfo.includes('is deleted')) {
    window.open('/', '_self');
  }
} 

  function onDeleteAccount () {
    axios.delete(`https://favmovie123.herokuapp.com/users/${Username}`,{headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        console.log('response delete user:',  response.data);
        setToastInfo(response.data);
        openToast();
      })
      .catch((response) => {
        console.error(response);
        setToastInfo(response.message);
        openToast();
      });
  }

  return (
    <>
      <ToastContainer className="p-3" position='top-center'>
        <Toast show={showToast} onClose={closeToast} bg='primary'>
          <Toast.Header className="justify-content-between"><strong>FavMovie</strong></Toast.Header>
          <Toast.Body >{toastInfo}</Toast.Body>
        </Toast>
      </ToastContainer>
      <h4>Your Info</h4>
      <p>Name: {Username}</p>
      <p>E-mail: {Email}</p>
      <p>Birthday: {Birthday}</p>
      <div className='d-flex'>
        <Button variant="outline-primary" className='ms-auto' onClick={onDeleteAccount}>Delete Account</Button>
      </div>
    </>  
  )
}

export default connect(mapStateToProps, { setUser } )(UserInfo);

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
};