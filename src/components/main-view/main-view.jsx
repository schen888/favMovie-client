import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import {connect} from 'react-redux';
import {setMovies, setUser} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegistrationView from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import FavMovieNavbar from '../navbar/navbar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';


class MainView extends React.Component {
  constructor(){
    super();
    
    this.onLoggedIn=this.onLoggedIn.bind(this);
    this.onLoggedOut=this.onLoggedOut.bind(this);
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }


  getMovies(token) {
    axios.get('https://favmovie123.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
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
      let userData=response.data;
      userData.Birthday=new Date(userData.Birthday).toLocaleDateString();
      this.props.setUser(userData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.props.setUser('');
    localStorage.clear();
    window.open("/", "_self");
  }

  render() {
    const {movies, user} = this.props;
    const username=user.Username;
    const userLocal = localStorage.getItem('user');

    return (
      <Router>
        <FavMovieNavbar username={user.Username} onLoggedOut={this.onLoggedOut}/>
        <Container className='main-view'>
          
          <Route exact path="/" render={()=>{
            if (!userLocal) return <Row className="justify-content-center mt-3">
              <Col md={10} lg={8}>
                <LoginView onLoggedIn ={this.onLoggedIn} />
              </Col>
            </Row>
            
            if (movies.length === 0) return <Row className="justify-content-center mt-3">
              <div className="main-view">Loading...</div>
            </Row>

            return <Row className="justify-content-left mt-3">
                <MoviesList movies={movies} />
            </Row>
          }} />

          <Row className="justify-content-center mt-3">
            <Route path="/register" render={()=>{
              if(user) return <Redirect to="/" />
              return <Col md={10} lg={8}>
                <RegistrationView />
              </Col>
            }}/>
          </Row>

          <Row className="justify-content-center mt-5">
            <Route path="/movies/:movieId" render={({match, history})=>{
              if (!userLocal) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8} className='justify-content-center'>
                <MovieView 
                  movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={()=>history.goBack()} 
                />
              </Col> 
            }} />

            <Route path="/directors/:name" render={({match, history})=>{
              if (!userLocal) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col> 
            }} />

            <Route path="/genres/:name" render={({match, history})=>{
              if (!userLocal) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col> 
            }} />
            
            <Route path={`/users/${username}`} render={({history})=>{
              if (!userLocal) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col>
                <ProfileView
                  onBackClick={()=>{history.goBack()}}
                  user={user}
                />
              </Col>
            }} /> 
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);