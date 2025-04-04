
import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../services/api';

import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

import css from './HomePage.module.css';
import cssError from '../../css/error.module.css';

export default function HomePage () {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTrendingMoviesData () {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setError('Failed to load trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getTrendingMoviesData();
  }, []);
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.header}>Trending today</h1>
      </div>
      {movies && <MovieList movies={movies} />}
      {loading && <Loader />}
      {error && <p className={cssError.error}>{error}</p>}
    </main>
  );
};

