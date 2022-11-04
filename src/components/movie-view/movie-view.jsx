import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link } from "react-router-dom";

import {connect} from 'react-redux';
import { setUser} from '../../actions/actions';

let mapStateToProps = state => {
  return { 
    user: state.user
  }
}

//onAddFavMovie, onRemoveFavMovie
export class MovieView extends React.Component {
  constructor(){
    super(); 
    this.onAddFavMovie=this.onAddFavMovie.bind(this);
    this.onRemoveFavMovie=this.onRemoveFavMovie.bind(this);   
  }

  onAddFavMovie(movieID){
    let favoriteMovies=this.props.user.FavoriteMovies;
    let tempFavoriteMovies=[...favoriteMovies];
    const userLocal= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    if (tempFavoriteMovies.includes(movieID)) {
      alert('This movie is already in your favorite movie list!');
    } else {
      axios.post(`https://favmovie123.herokuapp.com/users/${userLocal}/movies/${movieID}`,
        {FavoriteMovies: movieID},
        {headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        console.log(response);
        this.props.setUser(response.data);
        console.log('userAD', this.props.user);
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
      console.log(response);
      this.props.setUser(response.data);
      console.log('userRM', this.props.user);
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
        
        <div className='my-3'>
          <div>
            {favoriteMovies.includes(movie._id)
            ? (<Button id="remove-btn" onClick={()=>this.onRemoveFavMovie(movie._id)}  variant='warning'>Remove from favorite movie list</Button>)
            : (<Button id="add-btn" onClick={()=>this.onAddFavMovie(movie._id)}  variant='secondary'>Add to favorite movie list</Button>)
            }
          </div>
          <div>
            <Button onClick={()=>onBackClick()} variant='link'>Back</Button>
          </div>
        </div>
       </div>
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
  onBackClick: PropTypes.func.isRequired
};