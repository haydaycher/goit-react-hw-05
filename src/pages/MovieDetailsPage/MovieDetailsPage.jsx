import { useRef, useEffect, useState, Suspense } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../apimovie";
import css from "./MovieDetailsPage.module.css";
import { SiHomeadvisor } from "react-icons/si";

import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!movie) {
    return <p>Can`t find any movie details...</p>;
  }

  return (
    <div className={css.movieDetailsWrapper}>
      <Link to={backLink.current} className={css.backBtn}>
        <SiHomeadvisor className={css.arrowBtn} />
        RETURN
      </Link>
      <h2 className={css.movieTitle}>{movie.title}</h2>
      <div className={css.moviePicture}>
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <p className={css.movieOverview}>{movie.overview}</p>
      </div>
      <hr />
      <div className={css.castWrap}>
        <NavLink
          to="cast"
          className={(props) => {
            return clsx(css.link, props.isActive && css.active);
          }}
        >
          Movie Cast
        </NavLink>
        <NavLink
          to="reviews"
          className={(props) => {
            return clsx(css.link, props.isActive && css.active);
          }}
        >
          Movie Reviews
        </NavLink>
      </div>
      <Suspense fallback={<p className={css.warningText}>Loading info...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
