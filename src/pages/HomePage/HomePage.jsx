import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePages.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]); //збереження списків

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/week",
          {
            headers: {
              Authorization:
                " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlNWViODRmZmUzYmZjNDdmZTNkM2Q5NTJmNmI5OCIsIm5iZiI6MTcyOTc4NTA2Mi42OTk3NDMsInN1YiI6IjY3MTdhZTJhN2RjN2M2ZjI3ZDUxMjNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avUgqLTzhC3VgipgF4kM0UO0sq6q4EECMzyo09FwLVs",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.home}>
      <h1 className={css.titleHome}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
