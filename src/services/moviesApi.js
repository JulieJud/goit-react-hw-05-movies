import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: "b1540dc4df6fbd7d6b1372bac5a8310e",
};

async function fetchMovies(url = "", config = {}) {
  const response = await axios.get(url, config);
  return response.data;
}

export function moviesTrending() {
  return fetchMovies(`trending/movie/day?`);
}

export function moviesSearch(searchMovie, page) {
  return fetchMovies(`search/movie?&query=${searchMovie}&page=${page}`);
}

export function movieInfo(movieId) {
  return fetchMovies(`movie/${movieId}`);
}

export function movieCast(movieId) {
  return fetchMovies(`movie/${movieId}/credits`);
}

export function movieReviews(movieId) {
  return fetchMovies(`movie/${movieId}/reviews`);
}
