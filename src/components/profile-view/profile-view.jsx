import React, {useState} from 'react';
import {connect} from 'react-redux';
import { setUser} from '../../actions/actions';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import UserInfo from './user-info';
import UserUpdate from './user-update';
import FavoriteMovies from './favorite-movies';

import './profile-view.scss';

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  }
}

export function ProfileView (props) {
const {onBackClick}=props;

  return (
    <Container fluid className="profile-view">
      <Button className="mb-2 px-0" onClick={() => {onBackClick()}} variant="link">
        Back
      </Button>
      <Row>
        <Col className="my-2" xs={12} sm={5}>
          <Card>
            <Card.Body>
              <UserInfo />
            </Card.Body>
          </Card>
        </Col>
        <Col className="my-2" xs={12} sm={7}>
          <Card>
            <Card.Body>
              <UserUpdate />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies  />
      
    </Container>
  )
}

export default connect(mapStateToProps)(ProfileView);