
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWI1ZjA1MWUxNjI5NjZiY2I2ZWJlYTM1ZjdiMTlkYyIsIm5iZiI6MTc0MzY4ODIwMS40MzgwMDAyLCJzdWIiOiI2N2VlOTIwOTg2ODkwNjFlMWZlMWFhNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdAumI22wTfjtzdX0BQ-Na74geuk_nHDLeQS1eoS79s',
  },
  params: {
    language: 'en-US',
    include_adult: false,
  },
};

export async function getTrendingMovies () {
  const { data } = await axios.get('trending/movie/day', options);
  return data.results;
};

export async function getSearchedMovies(query){
  const { data } = await axios.get(`search/movie?query=${query}`, options);
  return data.results;
};

export async function getMovieDetails (movieId){
  const { data } = await axios.get(`movie/${movieId}`, options);
  return data;
};

export async function getMovieCast(movieId) {
  const { data } = await axios.get(`movie/${movieId}/credits`, options);
  return data.cast;
};

export async function getMovieReviews (movieId) {
  const { data } = await axios.get(`movie/${movieId}/reviews`, options);
  return data.results;
};