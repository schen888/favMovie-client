import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
     
      <Card>
        <Card.Img variant="top" src={movie.imageURL} />
        <Card.Body className="d-flex flex-column justify-content-between align-items-start">
          <div>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </div>
          <Button onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};