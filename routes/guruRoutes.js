const authController = require('../controllers/authController');
const guruController = require('../controllers/guruController');
const express = require('express');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(guruController.getAllGuru)
  .post(authController.restrtictTo('admin'), guruController.createGuru);

router
  .route('/:nama')
  .get(guruController.getOneGuru)
  .delete(authController.restrtictTo('admin'), guruController.deleteOneGuru)
  .patch(
    authController.restrtictTo('admin', 'guru'),
    guruController.updateOneGuru
  );

module.exports = router;
