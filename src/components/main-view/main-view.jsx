import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import FavMovieNavbar from '../navbar/navbar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      isRegistered: true //my code for swtich to registration-view
    }

    this.setSelectedMovie=this.setSelectedMovie.bind(this);
    this.onLoggedIn=this.onLoggedIn.bind(this);
    this.onRegisterFalse=this.onRegisterFalse.bind(this);
    this.onRegisterTrue=this.onRegisterTrue.bind(this);
  }

  componentDidMount(){
    axios.get('https://favmovie123.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the selectedMovie property to 
  that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //my code for swtich to registration-view
  onRegisterFalse(){
    this.setState({
      isRegistered: false
    })
  }

  onRegisterTrue(){
    this.setState({
      isRegistered: true
    })
  }

  render() {
    //my code for swtich to registration-view: isRegistered
    const { movies, selectedMovie, user} = this.state;

    //my code for swtich to registration-view: onRegister={()=>this.onRegister()}
    if (!user) return <LoginView onLoggedIn ={this.onLoggedIn} />;

    //my code for swtich to registration-view
    //if ((!user) && (!isRegistered)) return <RegistrationView onRegisterTrue={this.onRegisterTrue}/>

    if (movies.length === 0) return <div className="main-view" />;

    return (
      
      <div className='main-view'>
        <FavMovieNavbar />
        {selectedMovie
          ? (
            <Row className="justify-content-center mt-5">
            <Col lg={8}>
              <MovieView movie={selectedMovie} onBackClick={this.setSelectedMovie}/>
            </Col> 
            </Row>
          )
          : (
            <Row className="justify-content-left mt-3">
              {movies.map(movie => (

              <Col md={6} lg={4} xl={3} className='d-flex'>
                <MovieCard key={movie._id} movie={movie} onMovieClick={this.setSelectedMovie}/>
              </Col>
            ))}
            </Row>
          )
        }
      </div>
    );

    /* if (selectedMovie) return <MovieView movie={selectedMovie} />
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie)=>{ this.setSelectedMovie(movie) }} />)}
      </div>
    ); */
  }
}