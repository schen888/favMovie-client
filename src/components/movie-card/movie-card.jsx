import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Card, Stack} from 'react-bootstrap';

import { Link } from "react-router-dom";

import {connect} from 'react-redux';
import { setUser} from '../../actions/actions';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

class MovieCard extends React.Component {
  constructor(){
    super(); 
    this.onAddFavMovie=this.onAddFavMovie.bind(this);
    this.onRemoveFavMovie=this.onRemoveFavMovie.bind(this);   
  }

  onAddFavMovie(movieID){
    let favoriteMovies=this.props.user.FavoriteMovies;
    const userLocal= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    if (favoriteMovies.includes(movieID)) {
      alert('This movie is already in your favorite movie list!');
    } else {
      axios.post(`https://favmovie123.herokuapp.com/users/${userLocal}/movies/${movieID}`,
        {FavoriteMovies: movieID},
        {headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        this.props.setUser(response.data);
        console.log('onAddFavMovie', response);
        document.getElementById('remove-btn').blur();
      })
      .catch((err) => {
        console.error(err);
      });
      
    }
  }

  onRemoveFavMovie (movieID) {
    const userLocal= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    axios.delete(`https://favmovie123.herokuapp.com/users/${userLocal}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${token}`},
      data: {FavoriteMovies: movieID} 
    })
    .then((response) => {
      console.log('onRemoveFavMovie', response);
      this.props.setUser(response.data);
      document.getElementById('add-btn').blur();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    const { movie, user } = this.props;
    let favoriteMovies = user.FavoriteMovies;

    return (
     
      <Card className='mb-3'>
        <Card.Img variant="top" src={movie.imageURL} />
        <Card.Body className="d-flex flex-column justify-content-between align-items-start">
          <div>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </div>

          <Stack direction="horizontal" gap={2} className='mt-4'>
            <div className='ms-auto'>
                {favoriteMovies.includes(movie._id)
                ? (<Button id="remove-btn" onClick={()=>this.onRemoveFavMovie(movie._id)}  variant='link'>Remove</Button>)
                : (<Button id="add-btn" onClick={()=>this.onAddFavMovie(movie._id)}  variant='link'>Add</Button>)
                }
            </div>
            <Link to={`/movies/${movie._id}`} >
              <Button variant="primary">Open</Button>
            </Link>
          </Stack>
        </Card.Body>
      </Card>

    );
  }
}

export default connect(mapStateToProps, {setUser})(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string}).isRequired,
    Director: PropTypes.shape({Name: PropTypes.string}).isRequired
  }).isRequired
};