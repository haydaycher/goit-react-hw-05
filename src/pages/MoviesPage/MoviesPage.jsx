import { useState, useEffect } from "react";
import { fetchSearchMovies } from "../../apimovie";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState(null);

  const [params, setParams] = useSearchParams();
  const queryParam = params.get("query") || "";
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [queryParam]);

  const fetchMovies = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setInputError(null);

    try {
      console.log(`Fetching movies with query: ${searchQuery}`);
      const data = await fetchSearchMovies(searchQuery);
      setMovies(data.results || []);
      console.log(data);
    } catch (fetchError) {
      setError("Failed to fetch movies");
      console.error(fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setInputError("Please enter a movie name.");
      return;
    }

    setParams({ query: query });
  };

  return (
    <div className={css.moviesPageWrap}>
      <form onSubmit={handleSearch} className={css.formMovies}>
        <input
          className={css.inputMovies}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a movie..."
        />
        <button type="submit" className={css.buttonMovies}>
          Search
        </button>
      </form>
      {inputError && <p style={{ color: "orangered" }}>{inputError}</p>}
      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "orangered" }}>{error}</p>}
      {!loading && !error && movies.length === 0 && query && (
        <p className={css.textMoviesPage}>No movies found for `{query}`</p>
      )}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
