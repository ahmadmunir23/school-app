const siswaController = require('../controllers/siswaController');
const authController = require('../controllers/authController');

const express = require('express');

const router = express.Router();

router.use(authController.isLoggedIn);
router
  .route('/')
  .get(authController.protect, siswaController.getAllSiswa)
  .post(authController.protect, siswaController.createSiswa);

router
  .route('/:nama')
  .get(authController.protect, siswaController.getOneSiswa)
  .patch(authController.protect, siswaController.updateOneSiswaData)
  .delete(authController.protect, siswaController.deleteOneSiswa);

// router.patch('/:nama/nilai', siswaController.updateOneSiswaNilai);
module.exports = router;
