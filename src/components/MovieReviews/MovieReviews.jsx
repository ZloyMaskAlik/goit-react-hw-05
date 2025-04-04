import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getMovieReviews } from '../../services/api';

import Loader from '../Loader/Loader';

import css from './MovieReviews.module.css';
import cssError from '../../css/error.module.css';

export default function MovieReviews () {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieReviewsData(){
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
        setError('Failed to load movie reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getMovieReviewsData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <ul className={css.list}>
            {reviews.map(review => (
              <li key={review.id} className={css.item}>
                <h3 className={css.author}>Author: {review.author}</h3>
                <p className={css.content}>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={css.text}>
          We don&apos;t have any reviews for this movie
        </p>
      )}
      {loading && <Loader />}
      {error && <p className={cssError.error}>{error}</p>}
    </div>
  );
};
