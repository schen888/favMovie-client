import React, {useState} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import {UserInfo} from './user-info';
import {UserUpdate} from './user-update';
import {FavoriteMovies} from './favorite-movies';

import './profile-view.scss';

export function ProfileView (props) {
const {email, birthday, user, favoriteMovies, movies, onBackClick, onUserUpdate, onRemoveFavMovie}=props;
  return (
    <Container fluid className="profile-view">
      <Button className="mb-2 px-0" onClick={() => {onBackClick()}} variant="link">
        Back
      </Button>
      <Row>
        <Col className="my-2" xs={12} sm={5}>
          <Card>
            <Card.Body>
              <UserInfo user={user} email={email} birthday={birthday} />
            </Card.Body>
          </Card>
        </Col>
        <Col className="my-2" xs={12} sm={7}>
          <Card>
            <Card.Body>
              <UserUpdate onUserUpdate={onUserUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMovies={favoriteMovies} onRemoveFavMovie={onRemoveFavMovie} movies={movies}  />
      
    </Container>
  )
}