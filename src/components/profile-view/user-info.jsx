import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export function UserInfo ({name, email, birthday}) {
const token=localStorage.getItem('token');
const user=localStorage.getItem('user');
  function onDeleteAccount () {
    axios.delete(`https://favmovie123.herokuapp.com/users/${user}`,{headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        //const data = response.data;
        console.log(response);
        //alert(response.response.data);
        window.open('/', '_self')
      })
      .catch((response) => {
        console.error(response);
        //alert(response.response.data);
      });
    localStorage.clear();
  }

  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>E-mail: {email}</p>
      <p>Birthday: {birthday}</p>
      <Button variant="warning" onClick={onDeleteAccount}>Delete Account</Button>
    </>  
  )
}