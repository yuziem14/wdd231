const BASE_URL = "https://api.themoviedb.org";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDIwZmU3ZTc0ZmI0ODY5NzA4ODRhNDkxYjVkYTU1ZSIsIm5iZiI6MTc1MDM2MDkwNC43ODMsInN1YiI6IjY4NTQ2MzQ4ODEzODVhNGU0MDBjZjU5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5vvrXb3v3DfAW3oTha9tPue8rt53zD6cto5Ws2gEdY4";

const GENRES_STORAGE_KEY = "movietrack_movie_genres";

async function fetchMovies() {
  try {
    const response = await fetch(`${BASE_URL}/3/trending/all/day`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return await response.json();
  } catch (e) {
    throw e;
  }
}

async function searchMovies(query = '') {
  try {
    const response = await fetch(`${BASE_URL}/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return await response.json();
  } catch (e) {
    throw e;
  }
}

async function fetchGenres() {
  try {
    const response = await fetch(`${BASE_URL}/3/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return await response.json();
  } catch (e) {
    throw e;
  }
}

async function getGenres() {
  try {
    const savedGenres = localStorage.getItem(GENRES_STORAGE_KEY);
    if (!savedGenres) {
      const response = await fetchGenres();
      localStorage.setItem(GENRES_STORAGE_KEY, JSON.stringify(response.genres));
      return response.genres;
    }

    return JSON.parse(savedGenres);
  } catch (e) {
    throw e;
  }
}

export { fetchMovies, fetchGenres, getGenres, searchMovies };
