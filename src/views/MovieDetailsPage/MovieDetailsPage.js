import { useEffect, useState, lazy, Suspense } from "react";
import {
  Route,
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router";
import { NavLink } from "react-router-dom";
import * as moviesApi from "../../services/moviesApi";
import s from "./MovieDetails.module.css";

const Cast = lazy(() =>
  import("../Cast/Cast.js" /* webpackChunkName: "cast" */)
);

const Reviews = lazy(() =>
  import("../Review/Reviews.js" /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

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
        alert("sorry not found");
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
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: location?.state?.from ?? "/" },
                  }}
                  className={s.link}
                >
                  Cast
                </NavLink>

                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location?.state?.from ?? "/" },
                  }}
                  className={s.link}
                >
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <Route path={`${path}/cast`}>
          <Cast movieId={movieId} />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </div>
  );
}
