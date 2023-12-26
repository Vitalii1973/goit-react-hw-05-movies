import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from '../../Api/Api';
import Searchbar from '../../components/Searchbar/Searchbar';
import Loader from '../../components/Loader/Loader';
import { Notify } from 'notiflix';
import MovieList from '../../components/MoviesList/MoviesList';

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    const handleSearchMovie = async () => {
      try {
        const data = await getMovieByQuery(query);
        if (data.length) {
          setMovies(data);
          setError(false);
        } else {
          Notify.info(
            'Sorry, there are no films matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(true);
        Notify.failure(
          'Oops! Something went wrong! Please refresh the page and try again',
          {
            position: 'center-center',
            timeout: 2000,
            width: '500px',
            fontSize: '18px',
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleSearchMovie();
  }, [query]);

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };
  return (
    <>
      {!error && (
        <>
          <Searchbar submit={handleSubmit} />
          {isLoading && <Loader />}
          {movies && <MovieList movies={movies} />}
        </>
      )}
    </>
  );
};

export default MoviesPage;
