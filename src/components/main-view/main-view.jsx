import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
//import {ProfileView}
//import {UserUpdate}

import FavMovieNavbar from '../navbar/navbar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      user: null
    }

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
    this.setState({
      user: null
    });
    localStorage.clear();
    //localStorage.removeItem('user');
    window.open("/", "_self"); // is method necessary? set user state to null will render LoginView already
  }

  render() {
    const { movies, user} = this.state;

    return (
      <Router>
        <FavMovieNavbar user={user} onLoggedOut={this.onLoggedOut}/>
        <Container className='main-view'>
          <Row className="justify-content-center">
            <Route exact path="/" render={()=>{
              if (!user) return <Col md={10} lg={8}>
                <LoginView onLoggedIn ={this.onLoggedIn} />
              </Col>
              // Before movies have been loaded
              if (movies.length === 0) return <div className="main-view">Loading...</div>
            }} />

            <Route path="/register" render={()=>{
              if(user) return <Redirect to="/" />
              return <Col md={10} lg={8}>
                <RegistrationView />
              </Col>
            }}/>
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
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={()=>history.goBack()} />
              </Col> 
            }} />

            
            <Route path="/users/:username" render={({match, history})=>{// probaboly the match parameter can be deleted
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <ProfileView movies={movies} user={user===match.params.username} onBackClick={()=>{history.goBack()}}/>
              </Col>
            }} /> 


            <Route path="/user-update/:username" render={({match, history})=>{// probaboly the match parameter can be deleted
              // in <UserUpdate /> maybe movies as props needed?
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}> 
                <UserUpdate user={user===match.params.username} onBackClick={()=>history.goBack()} />
              </Col> 
            }} />
          </Row>

          <Row className="justify-content-center mt-5">
            <Route path="/directors/:name" render={({match, history})=>{
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col> 
            }} />

            <Route path="/genres/:name" render={({match, history})=>{
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col> 
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}