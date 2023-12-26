import { getMovieCast } from '../../Api/Api';
import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import CSS from './Cast.module.css';

const defaultImg =
  'https://barkers-taekwondo.uk/wp-content/uploads/2021/04/photo-coming-soon.jpg';

const Cast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const handleMovieCast = async () => {
      setIsLoading(true);
      try {
        setMovieCast([]);
        const data = await getMovieCast(movieId);
        if (data.length) {
          setMovieCast(data);
          setError(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    handleMovieCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {movieCast.length > 0 ? (
        <ul className={CSS.castList}>
          {movieCast.map(actor => (
            <li className={CSS.castListItem} key={actor.id}>
              <img
                className={CSS.actorImg}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defaultImg
                }
                width={200}
                alt="actor_photo"
                loading="lazy"
              />
              <p className={CSS.castActorName}>{actor.name}</p>
              <p className={CSS.castCharacter}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h3>We don't have any cast for this movie</h3>
      )}
      {error &&
        Notify.failure(
          `Oops! ${error.message}! Please refresh the page and try again`,
          {
            position: 'center-center',
            timeout: 2000,
            width: '500px',
            fontSize: '18px',
          }
        )}
    </>
  );
};

export default Cast;
