import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

import FavMovieNavbar from '../navbar/navbar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      //selectedMovie: null,
      user: null
    }

    //this.setSelectedMovie=this.setSelectedMovie.bind(this);
    this.onLoggedIn=this.onLoggedIn.bind(this);
    this.onLoggedOut=this.onLoggedOut.bind(this);
  }

  getMovies(token) {
    axios.get('https://favmovie123.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the selectedMovie property to 
  that movie*/
  /* setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  } */

  /* called by handleSubmit in loginView. Response containing user data is passed as argument. Set the user state in mainView
   and store the credential data in localStorage.*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }


  //my code for swtich to registration-view
  /* onRegisterFalse(){
    this.setState({
      isRegistered: false
    })
  }

  onRegisterTrue(){
    this.setState({
      isRegistered: true
    })
  } */

  render() {
    const { movies, user} = this.state;

    return (
      <Router>
        <FavMovieNavbar onLoggedOut={this.onLoggedOut}/>
        <Container className='main-view'>
          <Row className="justify-content-center">
            <Route extrac path="/" render={()=>{
              if (!user) return <Col>
                <LoginView onLoggedIn ={this.onLoggedIn} />;
              </Col>
              // Before movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;
            }} />
          </Row>
          
          <Row className="justify-content-left mt-3">
            <Route exact path="/" render={()=>{
              return movies.map(m => (
                <Col md={6} lg={4} xl={3} className='d-flex'>
                  <MovieCard key={m._id} movie={m}/>
                </Col>
              ))
            }} />
          </Row>

          <Row className="justify-content-center mt-5">
            <Route path="/movies/:movieId" render={({match, history})=>{
              return <Col lg={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={()=>history.goBack()} />
              </Col> 
            }} /> 
          </Row>

          <Row className="justify-content-center mt-5">
            <Route path="/directors/:name" render={({match, history})=>{
              if (movies.length === 0) return <div className="main-view" />;
              return <Col lg={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col> 
            }} />

            <Route path="/genres/:name" render={({match, history})=>{
              if (movies.length === 0) return <div className="main-view" />;
              return <Col lg={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col> 
            }} />
          </Row>
        </Container>
      </Router>
    );

    /* if (selectedMovie) return <MovieView movie={selectedMovie} />
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie)=>{ this.setSelectedMovie(movie) }} />)}
      </div>
    ); */
  }
}