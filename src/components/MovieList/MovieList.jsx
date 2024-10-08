import { Link } from "react-router-dom";
import css from "./MovieList.module.css";
import { useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log(location.state);

  // useEffect(() => {
  //   Analytics.send(location);
  // }, [location]);
  return (
    <div>
      {/* <h2>Trending today</h2> */}
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location.pathname + location.search }}
              className={css.movieListLink}
            >
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
