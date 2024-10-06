import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../apimovie";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast || []);
      } catch (error) {
        setError(error, "Failed to fetch cast details");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (cast.length === 0) {
    return <p>Can`t find cast informaion...</p>;
  }

  return (
    <ul className={css.listCast}>
      {cast.map((cast) => (
        <li key={cast.cast_id} className={css.imageCardCast}>
          {cast.profile_path ? (
            <img
              className={css.imageCast}
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt={cast.name}
            />
          ) : (
            <img
              className={css.imageCast}
              src="https://via.placeholder.com/200x300?text=No+Image"
              alt="No profile"
            />
          )}
          <p className={css.textCast}>
            {cast.name} as {cast.character}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
