import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

export default class DirectorView extends React.Component {
  render () {
    const {director, onBackClick} = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title className='mb-4'>{director.Name}</Card.Title>
          <Card.Text>
            <div className='my-3'>
              <span className="label">Bio: </span>
              <span className="value long-text">{director.Bio}</span>
            </div>
            <div className='my-3'>
              <span className="label">Birthyear: </span>
              <span className="value long-text">{director.Birth}</span>
            </div>
            <div className='my-3'>
              <span className="label">Deathyear: </span>
              <span className="value long-text">{director.Death}</span>
            </div>
          </Card.Text>
          <div className='d-flex'>
            <Button className='pe-0 ms-auto' onClick={()=>onBackClick()} variant='link'>Back</Button>
          </div>
        </Card.Body>
      </Card>
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