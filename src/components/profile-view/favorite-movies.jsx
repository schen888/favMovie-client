import React from 'react';
import { Figur, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function FavoriteMovies ({favoriteMovieList, removeFav}) {
  <div>
    <h2>Favorite Movies</h2>
    {favoriteMovieList.map((movie)=>{
      return (
        <div key={movie._id}>
          <Link to={`/movie/${movie._id}`}>
            <img src={movie.imageURL} />
            <h4>{movie.Title}</h4>
          </Link>
          <Button variant="warning" onClick={()=>removeFav(movie._id)}>Remove</Button>
        </div>
      )
      })
    }
  </div>
}