import React, {useState} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import {UserInfo} from './user-info';
import {UserUpdate} from './user-update';
import {FavoriteMovies} from './favorite-movies';

export function ProfileView (props) {
const {email, birthday, user, movies, onBackClick}=props;
  return (
    <Container className="profile-view">
      <Button className="mb-2 px-0" onClick={() => {onBackClick()}} variant="link">
        Back
      </Button>
      <Row>
        <Col xl={12} sm={6}>
          <Card>
            <Card.Body>
              <UserInfo name={user} email={email} birthday={birthday}/>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={12} sm={6}>
          <Card>
            <Card.Body>
              <UserUpdate />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} /> */}
      
    </Container>
  )
}