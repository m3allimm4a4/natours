const catchAsync = require('../shared/errors/catchAsyncErrors');
const AppError = require('../shared/errors/appError');
const Review = require('../models/reviewModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const filter = {};

  if (req.params.tourId) {
    filter.tour = req.params.tourId;
  }

  const reviews = await Review.find(filter);

  return res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      review: review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  const newReview = await Review.create(req.body);

  return res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
