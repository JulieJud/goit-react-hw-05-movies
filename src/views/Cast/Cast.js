import { useState, useEffect } from "react";
import * as moviesApi from "../../services/moviesApi";
import defaultImg from "../../defaultImg/osoba.png";
import s from "./Cast.module.css";

export default function Cast({ movieId }) {
  const [casts, setCasts] = useState("");

  useEffect(() => {
    moviesApi.movieCast(movieId).then((data) => setCasts(data.cast));
    window.scrollTo({ top: 690, behavior: "smooth" });
  }, [movieId]);

  return (
    <>
      <ul className={s.ul}>
        {casts &&
          casts.map((cast) => (
            <li className={s.li} key={cast.id}>
              <img
                className={s.img}
                alt={cast.name}
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${cast.profile_path}`
                    : defaultImg
                }
              />
              <p className={s.p}>{cast.name}</p>
            </li>
          ))}
        {casts.length === 0 && <p>No reviews</p>}
      </ul>
    </>
  );
}
