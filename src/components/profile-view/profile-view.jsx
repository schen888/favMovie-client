import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import {setUser} from '../../actions/actions';
import {connect} from 'react-redux';

import UserInfo from './user-info';
import UserUpdate from './user-update';
import FavoriteMovies from './favorite-movies';

import './profile-view.scss';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

function ProfileView (props) {
const {onBackClick}=props;

  return (
    <Container fluid className="profile-view">
      <Button className="mb-2 px-0" onClick={() => {onBackClick()}} variant="link">
        Back
      </Button>
      <Row>
        <Col className="my-2" sm={12} md={4}>
          <Card>
            <Card.Body>
              <UserInfo />
            </Card.Body>
          </Card>
        </Col>
        <Col className="my-2" sm={12} md={8}>
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

export default connect(mapStateToProps, { setUser } )(ProfileView);

ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};