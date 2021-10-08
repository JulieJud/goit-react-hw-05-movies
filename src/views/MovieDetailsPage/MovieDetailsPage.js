import { useEffect, useState, lazy } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import * as moviesApi from "../../services/moviesApi";
const MoviePageDetails = lazy(() =>
  import(
    "../../components/MovieInfo/MovieInfo" /* webpackChunkName: "MoviePageDetails"  */
  )
);

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
        alert("sorry not found");
      });
  }, [movieId, locationFrom, history]);

  return <>{movie && <MoviePageDetails movie={movie} />}</>;
}

//const goBack = () => {
//  history.push(locationFrom ?? "/");
// };

/* return (
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
}*/
