import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

export class DirectorView extends React.Component {
  render () {
    const {movie, onBackClick} = this.props;

    return (
      <div className="director-view">
        <div className="name">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="discription">
          <div>
          <span className="label">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
          </div>
          <div>
          <span className="label">Birthyear: </span>
          <span className="value">{movie.Director.Birth}</span>
          </div>
          <div>
          <span className="label">Deathyear: </span>
          <span className="value">{movie.Director.Death}</span>
          </div>
        </div>
        <Button className='pl-0' onClick={()=>onBackClick()} variant='link'>Back</Button>
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