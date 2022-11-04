import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

export default class DirectorView extends React.Component {
  render () {
    const {director, onBackClick} = this.props;

    return (
      <div className="director-view">
        <div className="name">
          <span className="label">Director: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="description">
          <div>
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
          </div>
          <div>
          <span className="label">Birthyear: </span>
          <span className="value">{director.Birth}</span>
          </div>
          <div>
          <span className="label">Deathyear: </span>
          <span className="value">{director.Death}</span>
          </div>
        </div>
        <Button className='pl-0' onClick={()=>onBackClick()} variant='link'>Back</Button>
       </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};