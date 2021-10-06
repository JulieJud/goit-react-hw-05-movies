import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router";

import * as moviesApi from "../services/moviesApi";
import s from "../components/MovieDetails/MovieDetails.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const locationFrom = location?.state?.from?.location;

  useEffect(() => {
    moviesApi
      .movieInfo(movieId)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
        history.push(locationFrom ?? "/movies");
      });
  }, [movieId, locationFrom, history]);

  const goBack = () => {
    history.push(locationFrom ?? "/");
  };

  return (
    <div>
      {movie && (
        <>
          <button type="button" onClick={goBack} className={s.button}>
            Go back
          </button>
          <div className={s.movie_card}>
            <img
              className={s.img}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div>
              <h1 className={s.h1}>{movie.title}</h1>
              <div className={s.movie_info}>
                <p>
                  Score: <span>{movie.vote_average}</span>
                </p>
                <h3>Overview: </h3>
                <span>{movie.overview}</span>
                <h3>Genres: </h3>
                <span>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </span>
                <h3>Additional information: </h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
