import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Suspense, lazy } from "react";
import {
  Outlet,
  NavLink,
  useParams,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Отримуємо movieId з URL

  const location = useLocation(); //інформ про локацію
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null); // Стан для зберігання даних фільму

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Викон запит до АРІ, використов moveId для отрим деталів фільму по айді
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!movieId) {
          throw new Error("Movie ID is not defined"); // Перевірка на undefined
        }
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlNWViODRmZmUzYmZjNDdmZTNkM2Q5NTJmNmI5OCIsIm5iZiI6MTcyOTc4NTA2Mi42OTk3NDMsInN1YiI6IjY3MTdhZTJhN2RjN2M2ZjI3ZDUxMjNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avUgqLTzhC3VgipgF4kM0UO0sq6q4EECMzyo09FwLVs",
            },
          }
        );
        setMovieData(response.data); //оновлює стан MovieData з отриманих даних
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails(); // виклик ф-її для отримання даних
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const backUrl = useRef(location.state?.form || "/movies"); //повернення назад

  if (!movieData) return <div>No movie data available.</div>;
  return (
    <div className={css.listMovie}>
      {loading && <Loader />}
      {error && movies.length === 0 && <ErrorMessage message={error} />}
      <Link to={backUrl.current} className={css.buttonDetails}>
        {" "}
        ← Go Back
      </Link>

      <div className={css.containerList}>
        <div className={css.imageContainer}>
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : defaultImg
            }
            alt="poster"
            width={250}
            className={css.imagesFilm}
          />
        </div>

        <div className={css.textContainer}>
          <h1 className={css.titleFilm}>{movieData.title}</h1>
          <h2>Overview: </h2>
          <p className={css.textDetalis}>{movieData.overview}</p>
          <h2>Genres:</h2>
          <p className={css.textDetalis}>
            {movieData.genres &&
              movieData.genres.map((genre) => genre.name).join(", ")}
          </p>
          <h2>Vote average: </h2>
          <p className={css.textDetalis}>{movieData.vote_average}</p>
        </div>
      </div>

      <ul className={css.listInfo}>
        <h2>Additional information</h2>
        <li className={css.infoMovie}>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Movie Cast
          </NavLink>
        </li>
        <li className={css.infoMovie}>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Movie Review
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
