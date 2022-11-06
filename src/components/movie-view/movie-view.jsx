import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {connect} from 'react-redux';
import { setUser} from '../../actions/actions';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

export class MovieView extends React.Component {
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

  render () {
    const {movie, onBackClick, user} = this.props;
    let favoriteMovies = user.FavoriteMovies;

    return (
      <Card className="mx-auto" style={{ maxWidth: '36rem' }}>
        <Card.Img src={movie.imageURL} style={{ width: '90%' }} className='mx-auto mt-4'/>
        <Card.Body className='pb-2'>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className='mb-4'>
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
          </Card.Text>
          <div>
            <div>
              {favoriteMovies.includes(movie._id)
              ? (<Button id="remove-btn" onClick={()=>this.onRemoveFavMovie(movie._id)}  variant='outline-primary'>Remove from favorite movies</Button>)
              : (<Button id="add-btn" onClick={()=>this.onAddFavMovie(movie._id)}  variant='primary'>Add to favorite movies</Button>)
              }
            </div>
            <div>
              <Button onClick={()=>onBackClick()} variant='link' className='pl-0 mt-2'>Back</Button>
            </div>
        </div>
        </Card.Body>
      </Card>
    );
  }
}

export default connect(mapStateToProps, {setUser})(MovieView);


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string}).isRequired,
    Director: PropTypes.shape({Name: PropTypes.string}).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  user: PropTypes.object
};