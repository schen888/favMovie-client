import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render () {
    const {movie,favoriteMovies, onBackClick, onAddFavMovie, onRemoveFavMovie} = this.props;

    return (
      <div className="movie-view">

        <div className="movie-poster my-4">
          <img width='360' src={movie.imageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <span className="value" variant="link">{movie.Genre.Name}</span>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <span className="value pl-0" variant="link">{movie.Director.Name}</span>
          </Link>
        </div>
        <Button onClick={()=>onBackClick()} variant='primary'>Back</Button>
        {favoriteMovies.includes(movie._id)
        ? (<Button id="remove-btn" onClick={()=>{onRemoveFavMovie(movie._id)}}  variant='warning'>Remove from favorite movie list</Button>)
        : (<Button id="add-btn" onClick={()=>{onAddFavMovie(movie._id)}}  variant='secondary'>Add to favorite movie list</Button>)
        }

       </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string}).isRequired,
    Director: PropTypes.shape({Name: PropTypes.string}).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};