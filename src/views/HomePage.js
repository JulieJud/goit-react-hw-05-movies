import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading/PageHeading";
import * as moviesAPI from "../services/moviesApi";

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.moviesTrending().then((data) => {
      setMovies(data.results);
    });
  }, []);
  return (
    <>
      <PageHeading text="Movies" />
    </>
  );

  //return <>{movies && <HomePageMovies movies={movies} />}</>;
}
