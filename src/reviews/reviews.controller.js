const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const validProperties = [
"content",
"score",
"critic_id",
"movie_id",
];

async function hasOnlyValidProperties(req, res, next) {
const { data = {} } = req.body;
const invalidFields = Object.keys(data).filter((field) => !validProperties.includes(field));
if (invalidFields.length) {
    return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`
    });
};
next();
}

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: "Review cannot be found.",
    });
};


async function destroy(req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };
    //   if you don't want data from any service call, 
    // you can just call it as "await serviceNameFunction()"
      await reviewsService.update(updatedReview);
        data = await reviewsService.readReviewCritic(updatedReview.review_id);
      res.json({ data })
}


module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(hasOnlyValidProperties),
        asyncErrorBoundary(update),
    ],
}