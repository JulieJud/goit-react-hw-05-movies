import { useState, useEffect, lazy } from "react";
import * as moviesAPI from "../services/moviesApi";
import {
  useHistory,
  useLocation,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import defaultImg from "../defaultImg/osoba.png";
import s from "./MoviePage.module.css";

const SearchBarPage = lazy(() =>
  import(
    "../components/MovieDetails/SearchBar.js" /* webpackChunkName: "SearchBarPage"  */
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
        <ul className={s.ul}>
          {movies.map((movie) => (
            <li key={movie.id} className={s.li}>
              <NavLink
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  alt={movie.title}
                  className={s.img}
                />
              </NavLink>
              <p className={s.p}>
                {movie.name && movie.name}
                {movie.original_title}
              </p>
            </li>
          ))}
        </ul>
      )}
      {showButton && (
        <button onClick={handleButtonLoadMore} className={s.button}>
          Load more
        </button>
      )}
    </div>
  );
}
