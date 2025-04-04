import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import noImage from '../../assets/no_images.jpg';

export default function MovieList ({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(movie => {
        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : noImage;
        return (
          <li className={css.item} key={movie.id}>
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
                >
            <img className={css.linkImage} src={poster} alt={movie.title} />
            <span className={css.linkText}>{movie.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

