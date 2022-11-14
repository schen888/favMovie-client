import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import {ProfileView} from '../profile-view/profile-view';
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
      user: null,
      userEmail: null,
      userBirthday: null,
      favoriteMovies: []
    }

    this.onLoggedIn=this.onLoggedIn.bind(this);
    this.onLoggedOut=this.onLoggedOut.bind(this);
    this.onUserUpdate=this.onUserUpdate.bind(this);
    this.onAddFavMovie=this.onAddFavMovie.bind(this);
    this.onRemoveFavMovie=this.onRemoveFavMovie.bind(this);
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

  getUser(token) {
    let accessUser=localStorage.getItem('user');
    axios.get(`https://favmovie123.herokuapp.com/users/${accessUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('getUser', response);
      let userData=response.data;
      this.setState({
        user: userData.Username,
        userEmail: userData.Email,
        userBirthday: userData.Birthday,
        favoriteMovies: userData.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onUserUpdate(data) {
    this.setState({
      user: data.Username,
      userEmail: data.Email,
      userBirthday: data.Birthday,
      favoriteMovies: data.FavoriteMovies
    });

    localStorage.setItem('user', data.Username);
    window.open(`/users/${this.state.user}`,'_self')
  }

  onAddFavMovie(movieID){
    let tempFavoriteMovies=[...this.state.favoriteMovies];
    const user= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    if (tempFavoriteMovies.includes(movieID)) {
      alert('This movie is already in your favorite movie list!');
    } else {
      axios.post(`https://favmovie123.herokuapp.com/users/${user}/movies/${movieID}`,
        {FavoriteMovies: movieID},
        {headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        console.log(response);
        tempFavoriteMovies.push(movieID);
        this.setState({
          favoriteMovies: tempFavoriteMovies
        });
        document.getElementById('remove-btn').blur();
      })
      .catch((err) => {
        console.error(err);
      });
      
    }
  }

  onRemoveFavMovie (movieID) {
    const user= localStorage.getItem('user');
    const token= localStorage.getItem('token');

    axios.delete(`https://favmovie123.herokuapp.com/users/${user}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${token}`},
      data: {FavoriteMovies: movieID} 
    })
    .then((response) => {
      let tempFavoriteMovies=[...this.state.favoriteMovies];
      console.log(response);
      tempFavoriteMovies = tempFavoriteMovies.filter((id) => id!==movieID);
      this.setState({favoriteMovies: tempFavoriteMovies});
      
      let movieViewBtn= document.getElementById('add-btn');
      if (movieViewBtn!==null) {
        movieViewBtn.blur();
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  /* called by handleSubmit in loginView. Response containing user data is passed as argument. Set the user state in mainView
   and store the credential data in localStorage.*/
  onLoggedIn(authData) {
    console.log('onLoggedIn', authData);
    this.setState({
      user: authData.user.Username,
      userEmail: authData.user.Email,
      userBirthday: authData.user.Birthday,
      favoriteMovies: authData.user.FavoriteMovies
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
    const { movies, user, userEmail, userBirthday, favoriteMovies} = this.state;
    console.log(this.state);

    return (
      <Router>
        <FavMovieNavbar user={user} onLoggedOut={this.onLoggedOut}/>
        <Container className='main-view'>
          <Row className="justify-content-center mt-3">
            <Route exact path="/" render={()=>{
              if (!user) return <Col md={10} lg={8}>
                <LoginView onLoggedIn ={this.onLoggedIn} />
              </Col>
              // Before movies have been loaded
              if (movies.length === 0) return <div className="main-view">Loading...</div>

              return movies.map(m => (
                <Col md={6} lg={4} xl={3} className='d-flex'>
                  <MovieCard key={m._id} movie={m}/>
                </Col>
              ))
            }} 
            />

            <Route path="/register" render={()=>{
              if(user) return <Redirect to="/" />
              return <Col md={10} lg={8}>
                <RegistrationView />
              </Col>
            }}/>
          </Row>

          {/* <Row className="justify-content-left mt-3">
            <Route exact path="/" render={()=>{
              return movies.map(m => (
                <Col md={6} lg={4} xl={3} className='d-flex'>
                  <MovieCard key={m._id} movie={m}/>
                </Col>
              ))
            }} />
          </Row> */}

          <Row className="justify-content-center mt-5">
            <Route path="/movies/:movieId" render={({match, history})=>{
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <MovieView 
                  movie={movies.find(m => m._id === match.params.movieId)}
                  favoriteMovies={favoriteMovies}
                  onAddFavMovie={this.onAddFavMovie}
                  onRemoveFavMovie={this.onRemoveFavMovie}
                  onBackClick={()=>history.goBack()} 
                />
              </Col> 
            }} />

            
            <Route path={`/users/${user}`} render={({history})=>{// probaboly the match parameter can be deleted
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col>
                <ProfileView 
                  movies={movies} 
                  user={user}
                  email={userEmail}
                  birthday={userBirthday}
                  favoriteMovies={favoriteMovies}
                  onUserUpdate={this.onUserUpdate}
                  onRemoveFavMovie={this.onRemoveFavMovie}
                  onBackClick={()=>{history.goBack()}}
                />
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