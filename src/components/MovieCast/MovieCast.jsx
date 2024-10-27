import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7eae5eb84ffe3bfc47fe3d3d952f6b98`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlNWViODRmZmUzYmZjNDdmZTNkM2Q5NTJmNmI5OCIsIm5iZiI6MTcyOTc4NTA2Mi42OTk3NDMsInN1YiI6IjY3MTdhZTJhN2RjN2M2ZjI3ZDUxMjNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avUgqLTzhC3VgipgF4kM0UO0sq6q4EECMzyo09FwLVs",
            },
          }
        );
        setCast(response.data.cast);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.containerCast}>
      {loading && <Loader />}
      {error && cast.length === 0 && <ErrorMessage message={error} />}
      <h2 className={css.titleInfo}>Cast</h2>
      <ul className={css.listCast}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width={100}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
