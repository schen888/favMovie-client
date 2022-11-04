import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import UserInfo from './user-info';
import UserUpdate from './user-update';
import FavoriteMovies from './favorite-movies';

import './profile-view.scss';

export default function ProfileView (props) {
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

ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};