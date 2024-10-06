import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../apimovie.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { useSearchParams } from "react-router-dom";
import css from "./HomePage.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const queryParam = params.get("query") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results || []);
      } catch (error) {
        setError(error.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {!queryParam && <h1 className={css.trendingHeader}>Trending Movies</h1>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>Can`t find any trending movies...</p>
      )}
    </div>
  );
};

export default Home;
