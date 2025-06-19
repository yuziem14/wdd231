const submission = new URLSearchParams(location.search);
console.log(submission.size);
if (submission.size !== 0) getAddedMovie(submission);

function getAddedMovie(movie = new URLSearchParams()) {
  const title = movie.get("movie-title") || "";
  const genre = movie.get("genre") || "";
  const year = movie.get("release-year") || "";
  const rating = movie.get("rating") || "";
  const description = movie.get("description") || "";
  const posterUrl = movie.get("poster-url") || "";

  console.log("New Movie Added:", {
    title,
    genre,
    year,
    rating,
    description,
    posterUrl,
  });

  alert(`Movie "${title}" added successfully!`);
}
