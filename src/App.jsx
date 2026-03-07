import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (pageNumber = 1) => {
    if (!query) return;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${pageNumber}`
    );
    const data = await res.json();

    if (data.Search) {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
      setPage(pageNumber);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a movie title..."
      />
      <button className="button" onClick={() => fetchMovies(1)}>
        Search
      </button>

      <div className="movie">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>
              {movie.Title}({movie.Year})
            </h3>
            <img src={movie.Poster} alt={movie.Title} width="100" />
            <p>Rating:{movie.imdbRating}</p>
            <p>Movie:{movie.Plot}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => fetchMovies(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalResults / 10)}
        </span>
        <button
          onClick={() => fetchMovies(page + 1)}
          disabled={page >= Math.ceil(totalResults / 10)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
