/*import axios from "axios";

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
*/
const BASE_URL = "https://api.themoviedb.org/3";
const Api_key = "b1540dc4df6fbd7d6b1372bac5a8310e";

async function fetchMovies(url = "", config = {}) {
  const response = await fetch(url, config);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export function moviesTrending() {
  return fetchMovies(`${BASE_URL}/trending/all/day?api_key=${Api_key}`);
}

export function movieInfo(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${Api_key}`);
}

export function movieCast(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${Api_key}&language=en-US`
  );
}

export function movieReviews(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${Api_key}&language=en-US&page=1`
  );
}

export function moviesSearch(searchName, page) {
  return fetchMovies(
    `${BASE_URL}/search/movie?api_key=${Api_key}&page=${page}&query=${searchName}&language=en-US&include_adult=false`
  );
}
