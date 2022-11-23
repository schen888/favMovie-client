import React from 'react';
import axios from 'axios';
import {env} from '../../env';
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
  let {movies, user}=props;
  let favoriteMovies=user.FavoriteMovies;
  
  function onRemoveFavMovie (movieID) {
    const userLocal= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    axios.delete(`${env.API_URL}/users/${userLocal}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${token}`},
      data: {FavoriteMovies: movieID} 
    })
    .then((response) => {
      let userData=response.data;
      userData.Birthday=new Date(userData.Birthday).toLocaleDateString();
      props.setUser(userData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
    <Card className='mt-3'>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>

        <Row>
          {favoriteMovies.map((favMovieID)=>{
            let favMovie=movies.find(m=>m._id===favMovieID);
            return (
              <Col key={favMovie._id} xs={12} md={6} lg={4} className='my-2 d-flex fav-movie'>  
                <Card className="d-flex flex-column justify-content-between p-2 mx-auto" style={{borderColor: '#6c757d'}}>
                  <Figure>
                    <Link to={`/movies/${favMovie._id}`}>
                      <Figure.Image 
                        src={favMovie.imageURL}
                        alt={favMovie.Title}
                      />
                      <Figure.Caption text='white'>{favMovie.Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <div className='d-flex'>    
                    <Button variant="link" onClick={()=>onRemoveFavMovie(favMovie._id)} className='ms-auto pe-0'>Remove</Button>
                  </div>
                </Card>
              </Col>  
            )})
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default connect(mapStateToProps, { setUser } )(FavoriteMovies);

FavoriteMovies.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired
};