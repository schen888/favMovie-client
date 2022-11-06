import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import { Link } from "react-router-dom";

export default class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
     
      <Card className='mb-3'>
        <Card.Img variant="top" src={movie.imageURL} />
        <Card.Body className="d-flex flex-column justify-content-between align-items-start">
          <div>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </div>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link" className='mt-2 ps-0'>Open</Button>
          </Link>
        </Card.Body>
      </Card>

    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string}).isRequired,
    Director: PropTypes.shape({Name: PropTypes.string}).isRequired
  }).isRequired
};