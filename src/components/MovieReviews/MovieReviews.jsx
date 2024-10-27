import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  console.log("Movie ID:", movieId);

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=7eae5eb84ffe3bfc47fe3d3d952f6b98`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlNWViODRmZmUzYmZjNDdmZTNkM2Q5NTJmNmI5OCIsIm5iZiI6MTcyOTc4NTA2Mi42OTk3NDMsInN1YiI6IjY3MTdhZTJhN2RjN2M2ZjI3ZDUxMjNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avUgqLTzhC3VgipgF4kM0UO0sq6q4EECMzyo09FwLVs",
            },
          }
        );
        setReviews(response.data.results);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.containerRew}>
      {loading && <Loader />}
      {error && movies.length === 0 && <ErrorMessage message={error} />}
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p> {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
