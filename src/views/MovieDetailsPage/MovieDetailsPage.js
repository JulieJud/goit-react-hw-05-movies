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
