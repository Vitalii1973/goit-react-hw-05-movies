import axios from 'axios';

const API_KEY = '4bf85ee189d529089c3bb52fa24c5918';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

axios.defaults.params = {
  api_key: API_KEY,
};

export const getTrendingMovies = async () => {
  const { data } = await axios(`trending/movie/day`);
  return data;
};

export const getMovieByQuery = async query => {
  const { data } = await axios('search/movie', {
    params: {
      query: query,
    },
  });
  return data.results;
};

export const getMovieById = async id => {
  const { data } = await axios(`movie/${id}`);
  return data;
};

export const getMovieCast = async id => {
  const { data } = await axios(`movie/${id}/credits`);

  return data.cast;
};

export const getMovieReviews = async id => {
  const { data } = await axios(`movie/${id}/reviews`);
  return data;
};
