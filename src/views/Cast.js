import { useState, useEffect } from "react";
import * as moviesAPI from "../services/moviesApi";
//import styles from './Cast.module.css';

export default function Cast({ movieId }) {
  const [casts, setCasts] = useState(null);
  useEffect(() => {
    moviesAPI.movieCast(movieId).then((data) => setCasts(data.cast));
  }, [movieId]);

  return (
    <>
      <ul>
        {casts &&
          casts.map((cast) => (
            <li key={cast.id}>
              <img
                alt={cast.name}
                src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
              />
              <p>{cast.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
