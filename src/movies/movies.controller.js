const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const is_showing = req.query.is_showing;
  let data = [];
  if (is_showing) {
    data = await moviesService.isShowing();
  } else {
    data = await moviesService.list();
  }
  res.json({ data });
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

async function movieInTheaters(req, res) {
  const { movieId } = req.params;
  const data = await moviesService.movieInTheaters(movieId);
  res.json({ data });
}

function read(req, res, next) {
  const data = res.locals.movie;
  res.json({ data });
}

async function movieReviews(req, res) {
  const { movieId } = req.params;
  const allReviews = await moviesService.movieReviews(movieId);
  const data = Object.values(allReviews);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  movieInTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(movieInTheaters),
  ],
  movieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(movieReviews),
  ],
};
