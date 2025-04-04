import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import noImage from '../../assets/no_images.jpg';

import { getMovieDetails } from '../../services/api';

import Loader from '../../components/Loader/Loader';

import css from './MovieDetailsPage.module.css';
import cssButton from '../../css/button.module.css';
import cssError from '../../css/error.module.css';

export default function MovieDetailsPage () {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    async function getMovieDetailsData () {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getMovieDetailsData();
  }, [movieId]);

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noImage;

  if (loading) {
    return <Loader />;
  }

  if (!movie && !loading && !error) {
    return null;
  }

  return (
    <main className={css.main}>
      <Link to={backLink.current}>
        <button className={cssButton.button} type="button">
          Go back
        </button>
      </Link>
      <div className={css.container}>
        {movie && (
          <div className={css.wrapper}>
            <div>
              <img className={css.image} src={poster} alt={movie.title} />
            </div>
            <div>
              <h2 className={css.title}>
                {movie.title}{' '}
                {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
              </h2>
              <p className={css.score}>User score: {movie.vote_average}</p>
              {movie.overview && (
                <>
                  <h3 className={css.subtitle}>Overview</h3>
                  <p className={css.overview}>{movie.overview}</p>
                </>
              )}
              {movie.genres?.length > 0 && (
                <>
                  <h3 className={css.subtitle}>Genres</h3>
                  <ul className={css.genres}>
                    {movie.genres.map(genre => (
                      <li className={css.text} key={genre.id}>
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {movie.production_companies?.length > 0 && (
                <>
                  <h3 className={css.subtitle}>Production companies</h3>
                  <ul className={css.companiesList}>
                    {movie.production_companies?.map(company => (
                      <li key={company.id}>
                        {company.logo_path && (
                          <img
                            className={css.companyLogo}
                            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                            alt={company.name}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
        <div className={css.informationWrapper}>
          <h3 className={css.subtitle}>Additional information</h3>
          <ul className={css.informationList}>
            <li>
              <Link className={css.link} to="cast">
                Cast
              </Link>
            </li>
            <li>
              <Link className={css.link} to="reviews">
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        <Outlet />

        {loading && <Loader />}
        {error && <p className={cssError.error}>{error}</p>}
      </div>
    </main>
  );
};
