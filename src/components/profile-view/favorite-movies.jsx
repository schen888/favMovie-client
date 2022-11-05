import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Row, Col, Figure, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {connect} from 'react-redux';
import { setUser} from '../../actions/actions';

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  }
}

function FavoriteMovies (props) {
  const {movies, user}=props;
  let favoriteMovies=user.FavoriteMovies;
  
  function onRemoveFavMovie (movieID) {
    const userLocal= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    axios.delete(`https://favmovie123.herokuapp.com/users/${userLocal}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${token}`},
      data: {FavoriteMovies: movieID} 
    })
    .then((response) => {
      console.log('Remove FavMovie in FavoriteMovies', response);
      props.setUser(response.data);
      console.log('favMovieRM1', favoriteMovies);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <Row>
        {favoriteMovies.map((favMovieID)=>{
          console.log('favMovieRM2', favoriteMovies);
          let favMovie=movies.find(m=>m._id===favMovieID);
          return (
            <Col key={favMovie._id} xs={12} md={6} lg={4} className='my-2 d-flex fav-movie'>  
              <Card className="border-dark d-flex flex-column justify-content-between ">
                <Figure>
                  <Link to={`/movies/${favMovie._id}`}>
                    <Figure.Image 
                      src={favMovie.imageURL}
                      alt={favMovie.Title}
                    />
                    <Figure.Caption>{favMovie.Title}</Figure.Caption>
                  </Link>
                </Figure>    
                <Button variant="warning" onClick={()=>onRemoveFavMovie(favMovie._id)}>Remove</Button>
              </Card>
            </Col>  
          )})
        }
      </Row>
    </>
  )
}

export default connect(mapStateToProps, { setUser } )(FavoriteMovies);

FavoriteMovies.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired
};