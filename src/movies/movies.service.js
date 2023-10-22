const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list() {
  return knex("movies").select("*");
}

function isShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .distinct("m.movie_id")
    .where("mt.is_showing", true);
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

function movieInTheaters(movie_id) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .distinct("t.theater_id")
    .where({ "mt.movie_id": movie_id });
}

function movieReviews(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.*"
    )
    .where({ "r.movie_id": movie_id })
    .then((data) => data.map(addCritic));
}

module.exports = {
  list,
  isShowing,
  read,
  movieInTheaters,
  movieReviews,
};
