const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const guruController = require('../controllers/guruController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router.get('/', authController.isLoggedIn, viewController.getHome);
router
  .route('/login')
  .get(authController.isLoggedIn, viewController.getLoginPage)
  .post(authController.login);
router.get('/logout', authController.isLoggedIn, authController.logOut);

// ///////////////////////////
router.use(authController.isLoggedIn);
// ///////////////////////////
router
  .route('/data')
  .get(
    authController.protect,
    authController.restrtictTo('admin', 'guru'),
    viewController.getDataPage
  )
  .post(authController.protect, viewController.getSearch);
// Check is user login or not

router.get(
  '/guru',
  authController.protect,
  authController.restrtictTo('admin', 'guru'),
  viewController.getGuruPage
);

router.get('/post', viewController.getAllPostPage);

router.get(
  '/guru/create',
  authController.protect,
  authController.restrtictTo('admin'),
  viewController.getCreateGuruPage
);

router.get(
  '/siswa/create',
  authController.protect,
  viewController.getCreateSiswaPage
);

router
  .route('/post/create')
  .get(authController.protect, viewController.getCreatePostPage)
  .post(authController.protect, guruController.postCreate);

router
  .route('/post/:judul')
  .get(viewController.getOnePostPage)
  .patch(authController.protect, guruController.patchPost)
  .delete(authController.protect, guruController.deletePost);

router
  .route('/guru/:nama')
  .get(authController.protect, viewController.getOneGuruPage);
router
  .route('/siswa/:nama')
  .get(authController.protect, viewController.getOneSiswaPage);

module.exports = router;
