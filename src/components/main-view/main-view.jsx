import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import {setMovies, setUser} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
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

class MainView extends React.Component {
  constructor(){
    super();
    
    this.onLoggedIn=this.onLoggedIn.bind(this);
    this.onLoggedOut=this.onLoggedOut.bind(this);
    this.onUserUpdate=this.onUserUpdate.bind(this);
    this.onAddFavMovie=this.onAddFavMovie.bind(this);
    this.onRemoveFavMovie=this.onRemoveFavMovie.bind(this);
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

  // do I really need this function? User info are fetched by the onLoggedIn function already.
  getUser(token) {
    let accessUser=localStorage.getItem('user');
    axios.get(`https://favmovie123.herokuapp.com/users/${accessUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('getUser', response);
      let userData=response.data;
      this.props.setUser(userData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onUserUpdate(data) {
    this.props.setUser(data);

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

  
  /* called by handleSubmit in loginView. Response containing user data is passed as argument. Set the user state in mainView
   and store the credential data in localStorage.*/
  onLoggedIn(authData) {
    console.log('onLoggedIn', authData);
    this.props.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.props.setUser(null);
    localStorage.clear();
    //localStorage.removeItem('user');
    window.open("/", "_self"); // is method necessary? set user state to null will render LoginView already
  }

  render() {
    let {movies, user} = this.props;
    const userLocal = localStorage.getItem('user');
  
    //const { user, userEmail, userBirthday, favoriteMovies} = this.state;
    console.log('User in MainView',user);

    return (
      <Router>
        <FavMovieNavbar username={user.Username} onLoggedOut={this.onLoggedOut}/>
        <Container className='main-view'>
          <Row className="justify-content-center mt-3">
            <Route exact path="/" render={()=>{
              if (!userLocal) return <Col md={10} lg={8}>
                <LoginView onLoggedIn ={this.onLoggedIn} />
              </Col>
              // Before movies have been loaded
              if (movies.length === 0) return <div className="main-view">Loading...</div>

              return <MoviesList movies={movies} />;

             /*  return movies.map(m => (
                <Col md={6} lg={4} xl={3} className='d-flex'>
                  <MovieCard key={m._id} movie={m}/>
                </Col>
              )) */
            }} />

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
              if (!userLocal) return <Redirect to="/" />
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
              if (!userLocal) return <Redirect to="/" />
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

            
            {/* <Route path="/user-update/:username" render={({match, history})=>{// probaboly the match parameter can be deleted
              // in <UserUpdate /> maybe movies as props needed?
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view">Loading...</div>
              return <Col lg={8}> 
                <UserUpdate user={user===match.params.username} onBackClick={()=>history.goBack()} />
              </Col> 
            }} /> */}
          </Row>

          <Row className="justify-content-center mt-5">
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