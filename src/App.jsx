import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  return (
    <div className="container">
      <h1 className="title">Movie Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a movie title..."
      />
      <button className="button">Search</button>

      <div className="movie">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>
              {movie.Title}({movie.Year})
            </h3>
            <img src={movie.Poster} alt={movie.Title} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
