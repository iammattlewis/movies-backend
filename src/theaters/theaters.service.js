const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const data = knex("theaters").select("*");

const addMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movies.movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  created_at: ["movies", null, "movies.created_at"],
  updated_at: ["movies", null, "movies.updated_at"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "movies.theater_id"],
});

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "t.*",
      "m.movie_id as movies.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at as movies.created_at",
      "m.updated_at as movies.updated_at",
      "mt.is_showing",
      "mt.theater_id as movies.theater_id"
    )
    .then(theaters => addMovies(theaters));
}

module.exports = {
  list,
};
