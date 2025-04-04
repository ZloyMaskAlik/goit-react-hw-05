import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getMovieCast } from '../../services/api';

import Loader from '../Loader/Loader';

import css from './MovieCast.module.css';
import cssError from '../../css/error.module.css';

import defaultImage from '../../assets/no_images.jpg';

export default function MovieCast () {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieCastData() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setActors(data);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
        setError('Failed to load movie cast. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getMovieCastData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {actors.length > 0 ? (
        <ul className={css.list}>
          {actors.map(actor => (
            <li key={actor.id} className={css.item}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defaultImage
                }
                alt={actor.name}
                className={css.image}
              />
              <h3 className={css.name}>{actor.name}</h3>
              <p className={css.character}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.text}>We don&apos;t have any cast for this movie</p>
      )}
      {loading && <Loader />}
      {error && <p className={cssError.error}>{error}</p>}
    </div>
  );
};
