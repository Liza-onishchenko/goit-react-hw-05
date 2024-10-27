import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Хук для роботи з параметрами запиту в URL
  const [movies, setMovies] = useState([]); // Стан для зберігання списку фільмів

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("query") || ""; // Отримання значення запиту з URL, або порожній рядок

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return; // Якщо запит порожній, виходимо з функції

      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlNWViODRmZmUzYmZjNDdmZTNkM2Q5NTJmNmI5OCIsIm5iZiI6MTcyOTc4NTA2Mi42OTk3NDMsInN1YiI6IjY3MTdhZTJhN2RjN2M2ZjI3ZDUxMjNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avUgqLTzhC3VgipgF4kM0UO0sq6q4EECMzyo09FwLVs",
            },
          }
        );

        if (response.data.results.length === 0) {
          setError("No movies found for your query."); // Встановлюю повідомлення про помилку, якщо фільмів немає
        } else {
          setMovies(response.data.results);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies(); // Викликаємо функцію для отримання фільмів
  }, [query]); // Залежність - повторюємо ефект, якщо query змінюється

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div className={css.container}>
      <SearchForm query={query} onSearch={handleSubmit} />
      {error && movies.length === 0 && <ErrorMessage message={error} />}
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
