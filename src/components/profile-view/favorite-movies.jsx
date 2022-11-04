import React from 'react';
import axios from 'axios';
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
  console.log('movies in favMovie', movies);
  console.log('Favmovies in favMovie', favoriteMovies);

  function onRemoveFavMovie (movieID) {
    const userLocal= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    axios.delete(`https://favmovie123.herokuapp.com/users/${userLocal}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${token}`},
      data: {FavoriteMovies: movieID} 
    })
    .then((response) => {
      console.log(response);
      props.setUser(response.data);
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
          console.log(favoriteMovies);
          console.log('movies in favMovie', movies);
          console.log(favMovieID);
          let favMovie;
          favMovie=movies.find(m=>m._id===favMovieID);
          console.log('favMovie',favMovie);
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


      /* let tempFavoriteMovies=[...this.state.favoriteMovies];
      
      tempFavoriteMovies = tempFavoriteMovies.filter((id) => id!==movieID);
      this.setState({favoriteMovies: tempFavoriteMovies}); */

      //