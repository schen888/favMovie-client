import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import {connect} from 'react-redux';
import {setUser} from '../../actions/actions';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

export function UserInfo (props) {
const {user} = props;
console.log('user in UserInfo', user);
const token=localStorage.getItem('token');
const {Username, Email, Birthday} = user;
  function onDeleteAccount () {
    axios.delete(`https://favmovie123.herokuapp.com/users/${Username}`,{headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        alert(response.data);
        props.setUser('');
        localStorage.clear();
        window.open('/', '_self')
      })
      .catch((response) => {
        console.error(response);
        alert(response.data);
      });
  }

  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {Username}</p>
      <p>e-mail: {Email}</p>
      <p>Birthday: {Birthday}</p>
      <Button variant="warning" onClick={onDeleteAccount}>Delete Account</Button>
    </>  
  )
}

export default connect(mapStateToProps, { setUser } )(UserInfo);