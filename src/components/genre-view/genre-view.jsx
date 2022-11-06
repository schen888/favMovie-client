import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

export default class GenreView extends React.Component {
  render () {
    const {genre, onBackClick} = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title className='mb-4'>{genre.Name}</Card.Title>
          <Card.Text>
            <div className='my-3'>
              <span className="label">Description: </span>
              <span className="value long-text">{genre.Description}</span>    
            </div>
          </Card.Text>
          <Button className='ps-0' onClick={()=>onBackClick()} variant='link'>Back</Button>
        </Card.Body>
      </Card>
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