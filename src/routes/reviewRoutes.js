const express = require('express');

const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { setTourUserIds } = require('../middlewares/reviewMiddlewares');
const { protect, restrictTo } = require('../middlewares/authMiddlewares');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllReviews).post(restrictTo('user'), setTourUserIds, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
