import { Link, useLocation } from 'react-router-dom';
import styles from './MoviesListItem.module.css';

const defaultImg =
  'https://barkers-taekwondo.uk/wp-content/uploads/2021/04/photo-coming-soon.jpg';

const MoviesListItem = ({ movieName, movieId, poster_path }) => {
  const location = useLocation();

  return (
    <li className={styles.galleryItem}>
      <Link
        className={styles.link}
        to={`/movies/${movieId}`}
        state={{ from: location }}
      >
        <img
          className={styles.posterImg}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={400}
          alt="film_poster"
        />
        <h2 className={styles.movieTitle}>{movieName}</h2>
      </Link>
    </li>
  );
};

export default MoviesListItem;
