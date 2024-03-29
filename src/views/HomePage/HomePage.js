import { useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading/PageHeading";
import HomePageMovies from "../../components/HomePage/HomePageMovies";
import * as moviesApi from "../../services/moviesApi";

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi
      .moviesTrending()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <PageHeading text="Trending today" />
      {movies && <HomePageMovies movies={movies} />}
    </>
  );
}
