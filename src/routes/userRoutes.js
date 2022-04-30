const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.patch('/update-password', protect, updatePassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
