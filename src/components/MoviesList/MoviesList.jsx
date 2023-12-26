import MovieListItem from '../MoviesListItem/MoviesListItem';
import CSS from './MoviesList.module.css';

const MoviesList = ({ movies, onItemClick }) => {
  return (
    <div className={CSS.moviesListContainer}>
      <ul className={CSS.moviesList}>
        {movies.map(movie => (
          <MovieListItem
            key={movie.id}
            movieName={movie.title}
            movieId={movie.id}
            poster_path={movie.poster_path}
          />
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
