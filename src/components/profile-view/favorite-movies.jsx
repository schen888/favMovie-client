import React from 'react';
import { Button, Row, Col, Figure, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function FavoriteMovies ({favoriteMovies, onRemoveFavMovie, movies}) {
  console.log(movies);
  return (
    <>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <Row>
        {favoriteMovies.map((favMovieID)=>{
          let favMovie=movies.find((movie)=>movie._id===favMovieID)
          return (
            <Col key={favMovie._id} xs={12} md={6} lg={4} className='my-2 d-flex fav-movie'>  
              <Card className="border-dark d-flex flex-column justify-content-between ">
                <Figure>
                  <Link to={`/movie/${favMovie._id}`}>
                    <Figure.Image 
                      src={favMovie.imageURL}
                      alt={favMovie.Title}
                    />
                    <Figure.Caption>{favMovie.Title}</Figure.Caption>
                  </Link>
                </Figure>    
                <Button variant="warning" onClick={()=>onRemoveFavMovie(favMovie._id)}>Remove</Button>
              </Card>
            </Col>  
          )})
        }
      </Row>
    </>
  )
}