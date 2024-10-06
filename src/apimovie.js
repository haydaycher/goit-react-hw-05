import axios from "axios";

const url = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjNkMWM1ZGMxYTMyMGJhYWY3YmY0N2M4MzUwYzNmNSIsIm5iZiI6MTcyODA2MzI4My40ODMxMTgsInN1YiI6IjY2ZmFjZTQ3OTIwZTk0MjAwMzEzM2YwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6k1hu6hUczU5n9QIVx7RX2KOGVAIdqInSGmKKNiBR2Q",
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${url}/trending/movie/day`, options);
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${url}/movie/${movieId}`, options);
  return data;
};

export const fetchSearchMovies = async (query) => {
  const { data } = await axios.get(
    `${url}/search/movie?query=${query}`,
    options
  );
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await axios.get(`${url}/movie/${movieId}/credits`, options);
  return data;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`${url}/movie/${movieId}/reviews`, options);
  return data;
};
