import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../apimovie";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        console.log(data);
        setReviews(data.results || []);
      } catch (error) {
        setError("Failed to fetch reviews");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p>No reviews.</p>;
  }

  return (
    <div className={css.reviewsWrapper}>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3 className={css.reviewsTitle}>{review.author}</h3>
          <p className={css.reviewsContent}>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieReviews;
