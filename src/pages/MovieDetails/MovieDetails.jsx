import { getMovieById } from '../../Api/Api';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import Movies from '../../components/Movies/Movies';
import Loader from '../../components/Loader/Loader';
import { Notify } from 'notiflix';
import CSS from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) return;
    const handleMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieById(movieId);
        if (data) {
          setMovieDetails(data);
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
    handleMovieDetails();
  }, [movieId]);

  return (
    <div className={CSS.Container}>
      <Link to={backLink.current}>
        <button className={CSS.backButton} type="button">
          Go back
        </button>
      </Link>
      {isLoading && <Loader />}
      {!error && movieDetails && (
        <>
          <Movies movieData={movieDetails} />
          <div className={CSS.additionalContainer}>
            <h2 className={CSS.additionalTitle}>Additional information</h2>
            <ul className={CSS.additionalList}>
              <li>
                <Link className={CSS.link} to={'cast'}>
                  Cast
                </Link>
              </li>
              <li>
                <Link className={CSS.link} to={'reviews'}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetails;
