import CSS from './Reviews.module.css';
import { getMovieReviews } from '../../Api/Api';
import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

const Review = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const handleMovieReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        if (data.results.length) {
          setMovieReviews(data.results);
          setError(false);
          return;
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
    handleMovieReviews();
  }, [movieId]);

  return (
    !error && (
      <>
        {movieReviews && movieReviews.length > 0 ? (
          <>
            {isLoading && <Loader />}
            <ul className={CSS.reviewsList}>
              {movieReviews.map(review => (
                <li key={review.id}>
                  <h3 className={CSS.reviewAuthorTitle}>
                    Author: {review.author_details.username}
                  </h3>
                  <p className={CSS.reviewContent}>{review.content}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h3>We don't have any reviews for this movie</h3>
        )}
      </>
    )
  );
};

export default Review;
