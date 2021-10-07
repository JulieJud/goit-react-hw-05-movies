import { useEffect, useState } from "react";
import * as moviesApi from "../../services/moviesApi";
import s from "./Review.module.css";

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesApi.movieReviews(movieId).then((data) => {
      setReviews(data.results);
      window.scrollTo({ top: 690, behavior: "smooth" });
    });
  }, [movieId]);

  return (
    <ul className={s.ul}>
      {reviews && (
        <>
          {reviews.map((review) => (
            <li key={review.id} className={s.li}>
              <h3 className={s.h3}>{review.author}</h3>
              <p className={s.p}>{review.content}</p>
            </li>
          ))}
        </>
      )}
      {reviews.length === 0 && <p>No reviews</p>}
    </ul>
  );
}
