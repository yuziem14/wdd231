import { fetchMovies, getGenres, searchMovies } from "./movies-api.js";
const searchParam = new URLSearchParams(location.search).get("search");
const data = {
  movies: [],
  genres: [],
};

getGenres().then((genres) => {
  data.genres = genres;

  const getMovies = !searchParam
    ? fetchMovies
    : () => searchMovies(searchParam);
  getMovies().then((response) => {
    data.movies = response.results.map(serializeMovie);
    populateMovies(data.movies);
  });
});
function serializeMovie(movie) {
  const genres = data.genres.filter((genre) =>
    movie.genre_ids.includes(genre.id)
  );
  const genreText = genres.map((g) => g.name).join(", ");
  return {
    id: movie.id,
    title: movie.original_title || movie.original_name,
    genres,
    genreText,
    year: (movie.release_date || "").replace(/-(\d{2})-(\d{2})/g, ""),
    rating: movie.vote_average,
    description: movie.overview,
    poster: ["https://image.tmdb.org/t/p/w500", movie.poster_path].join(""),
  };
}

function populateMovies(movies = []) {
  const moviesGrid = document.querySelector(".movie-grid");
  const movieCards = movies.map(
    (movie) => `
        <div class="movie-card">
            <img
              src="${movie.poster}"
              alt="${movie.title} Poster"
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="movie-rating">Rating: ${movie.rating}</p>
                <p class="movie-genre">${movie.genreText}</p>
                <button class="view-details-button" data-movie-id="${movie.id}">
                View Details
                </button>
            </div>
        </div>
    `
  );
  moviesGrid.innerHTML = movieCards.join("\n");

  const modal = document.getElementById("movie-details-modal");
  const closeButton = document.querySelector(".close-button");

  document.querySelectorAll(".view-details-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const movieId = event.target.dataset.movieId;
      const movie = data.movies.find((m) => m.id == movieId);

      if (movie) {
        document.getElementById("modal-movie-poster").src = movie.poster;
        document.getElementById("modal-movie-title").textContent = movie.title;
        document.getElementById(
          "modal-movie-genre"
        ).textContent = `Genre: ${movie.genreText}`;
        document.getElementById(
          "modal-movie-year"
        ).textContent = `Release Year: ${movie.year}`;
        document.getElementById(
          "modal-movie-rating"
        ).textContent = `Rating: ${movie.rating}`;
        document.getElementById("modal-movie-description").textContent =
          movie.description;

        modal.showModal();
      }
    });
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.close();
    }
  });
}
// Toggle filters on mobile
document
  .querySelector(".filter-toggle-button")
  .addEventListener("click", () => {
    document.querySelector(".filter-options").classList.toggle("active");
    document
      .querySelector(".filter-toggle-button .arrow")
      .classList.toggle("rotate");
  });
