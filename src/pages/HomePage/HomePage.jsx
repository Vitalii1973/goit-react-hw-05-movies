import { getTrendingMovies } from '../../Api/Api';
import MovieList from '../../components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import CSS from './HomePage.module.css';
import { Notify } from 'notiflix';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getTrendingMovies();
        if (data.results.length) {
          setMovies(data.results);
          setError(false);
        }
      } catch (error) {
        setError(true);
        Notify.failure(
          `Oops! ${error.message}! Please refresh the page and try again`,
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
    handleMovies();
  }, []);

  return (
    <>
      {!error && movies && (
        <>
          {isLoading && <Loader />}
          <div className={CSS.container}>
            <h1 className={CSS.title}>Trending today</h1>
            <MovieList movies={movies} />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
