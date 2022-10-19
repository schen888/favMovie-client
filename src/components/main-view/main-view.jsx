import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        {"_id":{"$oid":"63444d31cd27bc1e4fd67018"},"Title":"The Lord of the Rings: The Fellowship of the Ring","Description":"A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.","Genre":{"Name":"Adventure","Description":"An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war."},"Director":{"Name":"Peter Jackson","Bio":"Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.","Birth":"1961","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BZTQ4YTA1YmEtNWY1Yy00ODA2LWI2MGYtZGY2ZTgzYjEzMDZjXkEyXkFqcGdeQXVyNTE1MDE2MzY@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd67019"},"Title":"The Lord of the Rings: The Two Towers","Description":"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.","Genre":{"Name":"Adventure","Description":"An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war."},"Director":{"Name":"Peter Jackson","Bio":"Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.","Birth":"1961","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd6701a"},"Title":"The Lord of the Rings: The Return of the King","Description":"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.","Genre":{"Name":"Adventure","Description":"An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war."},"Director":{"Name":"Peter Jackson","Bio":"Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.","Birth":"1961","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd6701b"},"Title":"Iron Man","Description":"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.","Genre":{"Name":"Sci-Fi","Description":"Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."},"Director":{"Name":"Jon Favreau","Bio":"Initially an indie film favorite, actor Jon Favreau has progressed to strong mainstream visibility into the millennium and, after nearly two decades in the business, is still enjoying character stardom as well as earning notice as a writer/producer/director.","Birth":"1966","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd6701c"},"Title":"The Dark Knight","Description":"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","Genre":{"Name":"Crime","Description":"Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film,[1] but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir."},"Director":{"Name":"Christopher Nolan","Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.","Birth":"1970","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd6701d"},"Title":"The Grand Budapest Hotel","Description":"A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.","Genre":{"Name":"Comedy","Description":"A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement.[1] Films in this style traditionally have a happy ending (black comedy being an exception). One of the oldest genres in film—and derived from the classical comedy in theatre. Some of the earliest silent films were comedies, as slapstick comedy often relies on visual depictions, without requiring sound. When sound films became more prevalent during the 1920s, comedy films took another swing, as laughter could result from burlesque situations but also dialogue."},"Director":{"Name":"Wes Anderson","Bio":"Anderson attended the University of Texas in Austin. It was there that he met Owen Wilson. They became friends and began making short films, some of which aired on a local cable-access station. One of their shorts was Bottle Rocket (1994), which starred Owen and his brother Luke Wilson. The short was screened at the Sundance Film Festival, where it was successfully received, so much so that they received funding to make a feature-length version. Success followed with films such as Rushmore (1998), The Life Aquatic with Steve Zissou (2004), The Royal Tenenbaums (2001) and an animated feature, Fantastic Mr. Fox (2009). The latter two films earned Anderson Oscar nominations.","Birth":"1969","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd6701e"},"Title":"The Devil Wears Prada","Description":"A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high fashion magazine.","Genre":{"Name":"Drama","Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline."},"Director":{"Name":"David Frankel","Bio":"David Frankel was born on April 2, 1959 in New York City, New York, USA. He is a production manager and producer, known for The Devil Wears Prada (2006), One Chance (2013) and Band of Brothers (2001).","Birth":"1959","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BZjQ3ZTIzOTItMGNjNC00MWRmLWJlMGEtMjJmMDM5ZDIzZGM3XkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd6701f"},"Title":"Zootopia","Description":"In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.","Genre":{"Name":"Animation","Description":"Animation is a method by which still figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI). Computer animation can be very detailed 3D animation, while 2D computer animation (which may have the look of traditional animation) can be used for stylistic reasons, low bandwidth, or faster real-time renderings. Other common animation methods apply a stop motion technique to two- and three-dimensional objects like paper cutouts, puppets, or clay figures."},"Director":{"Name":"Byron Howard","Bio":"Byron Howard was born on December 26, 1968 in Misawa, Japan. He is a director and actor, known for Zootopia (2016), Encanto (2021) and Tangled (2010).","Birth":"1968","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd67020"},"Title":"Minions: The Rise of Gru","Description":"The untold story of one twelve-year-old's dream to become the world's greatest supervillain.","Genre":{"Name":"Comedy","Description":"A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement.[1] Films in this style traditionally have a happy ending (black comedy being an exception). One of the oldest genres in film—and derived from the classical comedy in theatre. Some of the earliest silent films were comedies, as slapstick comedy often relies on visual depictions, without requiring sound. When sound films became more prevalent during the 1920s, comedy films took another swing, as laughter could result from burlesque situations but also dialogue."},"Director":{"Name":"Kyle Balda","Bio":"Kyle Balda is a BAFTA nominated feature animation director working in the industry for 30 years, most notably with Illumination Entertainment and Pixar Animation Studios. He began his career in early 90s after studying at Calarts. After animating the Grim Reaper for Peter Jackson's The Frighteners at Weta Digital in New Zealand, Kyle returned to California to work at Pixar on A Bug's Life, Monsters Inc and as directing animator of Toy Story 2. Following a number of years conducting Masterclasses at renowned film schools worldwide and directing short form animation projects, Balda returned to feature production in Paris as the head of layout for Illumination's Despicable Me followed by a co-directing position on The Lorax and directing roles (with directing partner Pierre Coffin) on Minions and Despicable Me 3.","Birth":"1971","Death":""},"imageURL":"https://m.media-amazon.com/images/M/MV5BZDQyODUwM2MtNzA0YS00ZjdmLTgzMjItZWRjN2YyYWE5ZTNjXkEyXkFqcGdeQXVyMTI2MzY1MjM1._V1_SX300.jpg","Featured":true},
        {"_id":{"$oid":"63444d31cd27bc1e4fd67021"},"Title":"Boundin'","Description":"A sheep dances proudly in his southwestern landscape, until one day his wool is sheared and he is left naked. He's depressed and shy, until a cheerful jackalope comes along and shows him how to leap proudly and not to be ashamed.","Genre":{"Name":"Animation","Description":"Animation is a method by which still figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI). Computer animation can be very detailed 3D animation, while 2D computer animation (which may have the look of traditional animation) can be used for stylistic reasons, low bandwidth, or faster real-time renderings. Other common animation methods apply a stop motion technique to two- and three-dimensional objects like paper cutouts, puppets, or clay figures."},"Director":{"Name":"Bud Luckey","Bio":"Bud Luckey was an American animator, writer, director and voice actor from Montana known for his works at Pixar and Sesame Street. He directed and voiced the short film Boundin' before voicing Rick Dicker in The Incredibles and Jack-Jack Attack. He later voiced Chuckles from Toy Story 3 and Eeyore from Winnie the Pooh.","Birth":"1934","Death":"2018"},"imageURL":"https://m.media-amazon.com/images/M/MV5BMWMzZDRhNjMtZGM3Ny00MjQwLWI1M2MtODRkNDFmNjNjYzhmXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SX300.jpg","Featured":false}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    
    if (movies.length === 0){
      return <div className="main-view">The list is empty!</div>;
    }

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

export {MainView};