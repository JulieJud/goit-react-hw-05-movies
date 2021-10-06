//import { lazy} from 'react';
import {
  //useRouteMatch,

  // useParams,
  useLocation,
  useHistory,
} from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage({ movie }) {
  const history = useHistory();
  const location = useLocation();
  const locationFrom = location?.state?.from?.location;

  const goBack = () => {
    history.push(locationFrom ?? "/");
  };

  return (
    <div>
      <button type="button" onClick={goBack} className={styles.button}></button>

      <div className={styles.div}>
        <div className={styles.movie_card}>
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />

          <div className={styles.movie_info}>
            <h2 className={styles.h2}>{movie.title}</h2>
            <p className={styles.p}> {movie.release_date}</p>
            <ul className={styles.li}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>

            <p className={styles.p}>{movie.overview}</p>

            <div className={styles.links}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
