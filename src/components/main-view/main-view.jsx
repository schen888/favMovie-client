import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      isRegistered: true //my code for swtich to registration-view
    }
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
  onRegister(){
    this.setState({
      isRegistered: false
    })
  }

  render() {
    //my code for swtich to registration-view: isRegistered
    const { movies, selectedMovie, user, isRegistered } = this.state;

    //my code for swtich to registration-view: onRegister={()=>this.onRegister()}
    if ((!user) && isRegistered) return <LoginView onLoggedIn ={user => this.onLoggedIn(user)} onRegister={()=>this.onRegister()}/>;

    //my code for swtich to registration-view
    if ((!user) && (!isRegistered)) return <RegistrationView />

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
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