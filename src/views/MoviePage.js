import { useState, useEffect, lazy } from "react";
import * as moviesAPI from "../services/moviesApi";
import {
  useHistory,
  useLocation,
  NavLink,
  useRouteMatch,
} from "react-router-dom";

const SearchBarPage = lazy(() =>
  import(
    "../components/MovieDetails/MoviePage.js" /* webpackChunkName: "SearchBarPage"  */
  )
);

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");
  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  useEffect(() => {
    if (!searchQuery) return;
    moviesAPI.moviesSearch(searchQuery, page).then((data) => {
      if (data.results.length === 0) {
        return (
          `Sorry there are no movies with ${searchMovie} name`, setMovies([])
        );
      }
      if (data.results) {
        return setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    });
  }, [searchQuery, page, searchMovie]);

  const handleFormSubmit = (searchMovie) => {
    setMovies([]);
    setSearchMovie(searchMovie);
    setPage(1);
    history.push({ ...location, search: `query=${searchMovie}` });
  };

  const handleButtonLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showButton = movies.length >= 20;
  return (
    <div>
      <SearchBarPage onSubmit={handleFormSubmit} />
      {movies && (
        <>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `${url}/${`${movie.title} ${movie.id}`}`,
                    state: {
                      from: {
                        location,
                        label: "Back to search movies",
                        search: `?query=${searchMovie}`,
                      },
                    },
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
          {showButton && (
            <button onClick={handleButtonLoadMore}>Load more</button>
          )}
        </>
      )}
    </div>
  );
}
