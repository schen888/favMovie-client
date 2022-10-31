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
            <Col key={favMovie._id} xs={12} md={6} lg={3} className='mt-3 d-flex'>
              <Card className="d-flex flex-column justify-content-between border-dark">
                <Figure>
                  <Link to={`/movie/${favMovie._id}`}>
                    <Figure.Image 
                      height={300}
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