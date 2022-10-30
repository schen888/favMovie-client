import React from 'react';
import { Button, Row, Col, Figure } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function FavoriteMovies ({favoriteMovies, onRemoveFavMovie, movies}) {
  console.log(movies);
  return (
    <>
      <h2>Favorite Movies</h2>
      {favoriteMovies.map((favMovieID)=>{
        let favMovie=movies.find((movie)=>movie._id===favMovieID)
        return (
          <Row>
            <Col key={favMovie._id} xs={12} sm={6} md={4} className='mt-5'>
              <Figure>
                <Link to={`/movie/${favMovie._id}`}>
                  <Figure.Image 
                    height={300}
                    src={favMovie.imageURL}
                  />
                  <Figure.Caption>{favMovie.Title}</Figure.Caption>
                </Link>
              </Figure>    
              <Button variant="warning" onClick={()=>onRemoveFavMovie(favMovie._id)}>Remove</Button>
            </Col>
          </Row>
        )
        })
      }
    </>
  )
}