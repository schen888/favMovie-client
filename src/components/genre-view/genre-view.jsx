import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

export default class GenreView extends React.Component {
  render () {
    const {genre, onBackClick} = this.props;

    return (
      <div className="genre-view">
        <div className="name">
          <span className="label">Genre: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <Button className='pl-0' onClick={()=>onBackClick()} variant='link'>Back</Button>
       </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};