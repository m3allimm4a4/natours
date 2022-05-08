const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');
const { protect, restrictTo } = require('../middlewares/authMiddlewares');
const { getMe } = require('../middlewares/userMiddlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Protect all routes below
router.use(protect);

router.patch('/update-password', updatePassword);

router.get('/me', getMe, getUser);

router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);

// Authorize only admins
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
