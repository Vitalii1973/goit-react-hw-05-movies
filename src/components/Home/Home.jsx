import styles from './Home.module.css';
import { NavLink, Link } from 'react-router-dom';

const Home = () => {
  const handlePageColorChange = () => {
    document.body.classList.add(styles.pageColorChange);

    setTimeout(() => {
      document.body.classList.remove(styles.pageColorChange);
    }, 3000);
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <nav className={styles.homeNav}>
          <div className={styles.LogoContainer}>
            <Link to="/" onMouseOver={handlePageColorChange}>
              <span className={styles.homeLogo}>FilmQuest</span>
            </Link>
          </div>
          <ul className={styles.homeList}>
            <li>
              <NavLink to="/" className={styles.homeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={styles.homeLink}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Home;
