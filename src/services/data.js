import API from "./api.js";

export async function buildData(page = 1) {
  const URL = new API("7b6af2d10187dac2f4a78feca90ed1b7");

  console.log(URL.discoverMovie(page));

  const response = await fetch(URL.discoverMovie(page));
  const data = await response.json();

  return data;
}

export async function movieBanner() {
  const URL = "https://image.tmdb.org/t/p/original";

  const data = await buildData();
  const numberMovie = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * (20 - 1) + 1)
  );
  const selectPathMovie = Array.from(
    numberMovie,
    (x) => data.results[x]["backdrop_path"]
  );

  const imgPathMovie = Array.from(selectPathMovie, (x) => URL + x);

  listMovie();

  return imgPathMovie;
}

export async function listMovie(page) {
  const URL = "https://image.tmdb.org/t/p/original";

  const data = await buildData(page);

  const movies = [];

  for (const key in data["results"]) {
    const movie = {
      title: data["results"][key]["title"],
      posterPath: data["results"][key]["poster_path"],
      average: data["results"][key]["vote_average"],
      id: data["results"][key]["id"],
    };

    movies.push(movie);
  }

  const posterMovies = Array.from(movies, (x) => URL + x["posterPath"]);

  return { movies, posterMovies };
}
