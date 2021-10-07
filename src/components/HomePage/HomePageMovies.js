import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import s from "./HomePageMovies.module.css";

export default function HomePageMovies({ movies }) {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className={s.div}>
      <ul className={s.ul}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.li}>
            <NavLink
              className={s.link}
              to={{
                pathname: `${url}movies/${movie.id}`,
                state: { from: { location, label: "Back to trend movies" } },
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={s.img}
              />

              <p className={s.p}>
                {movie.name && movie.name}
                {movie.original_title}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
