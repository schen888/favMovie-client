import React from 'react';

export function UserInfo ({name, email, birthday}) {

  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>E-mail: {email}</p>
      <p>Birthday: {birthday}</p>
    </>  
  )
}