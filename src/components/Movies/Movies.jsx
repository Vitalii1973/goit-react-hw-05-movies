import CSS from './Movies.module.css';

const defaultImg =
  'https://barkers-taekwondo.uk/wp-content/uploads/2021/04/photo-coming-soon.jpg';

const Movies = ({ movieData }) => {
  const { title, popularity, poster_path, overview, genres } = movieData;

  return (
    <div className={CSS.movieContainer}>
      <img
        className={CSS.moviePoster}
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultImg
        }
        width={200}
        alt="poster"
        loading="lazy"
      />
      <div className={CSS.movieInfoContainer}>
        <h1>{title}</h1>
        {popularity && (
          <p>
            <span style={{ fontWeight: '700' }}>User Score:</span>{' '}
            {Math.round(popularity)} %
          </p>
        )}
        {overview && (
          <>
            <h2>Overview</h2>
            <p>{overview}</p>
          </>
        )}
        {genres && genres.length > 0 && (
          <>
            <h2>Genres</h2>
            <p>{genres && genres.map(genre => genre.name).join(', ')}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
