import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export function UserInfo ({user, email, birthday, favoriteMovies}) {
const token=localStorage.getItem('token');
  function onDeleteAccount () {
    axios.delete(`https://favmovie123.herokuapp.com/users/${user}`,{headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        alert(response.data);
        window.open('/', '_self')
      })
      .catch((response) => {
        console.error(response);
        alert(response.data);
      });
    localStorage.clear();
  }

  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {user}</p>
      <p>e-mail: {email}</p>
      <p>Birthday: {birthday}</p>
      <Button variant="warning" onClick={onDeleteAccount}>Delete Account</Button>
    </>  
  )
}