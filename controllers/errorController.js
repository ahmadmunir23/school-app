const AppError = require('../utils/appError');

const handleDuplicateFieldsDb = (err) => {
  const value = err.keyValue.nik;
  const message = `Nik ${value} telah digunakan`;
  return new AppError(message, 400);
};

const handleNumberRequiredErr = (type, err) => {
  if (type === 'angkatan') {
    const message = `Masukkan angkatan dan gunakan angka`;
    return new AppError(message, 400);
  } else if (type === 'umur') {
    const message = `Masukkan umur dan gunakan angka`;
    return new AppError(message, 400);
  } else if (type === 'nik') {
    const message = 'Masukkan nik dan gunakan angka';
    return new AppError(message, 400);
  } else if (type === 'password') {
    const message =
      'password dan password konfirmasi tidak sama dan minimal 8 karakter';
    return new AppError(message, 400);
  }
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
  //   return res.status(err.statusCode).render('errorPage', {
  //     title: 'Something went wrong!',
  //     msg: err.message,
  //   });
};

const sendErrorProdJson = (err, req, res) => {
  if (err.isOperational)
    return res.status(400).json({
      status: 'error',
      message: err.message,
      error: err,
    });
};

const sendErrorProdPage = (err, req, res) => {
  res.status(err.statusCode).render('errorPage', {
    title: err.message,
    msg: 'Please try again later',
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    console.log(err.message);
    return sendErrorDev(err, req, res);
  } else {
    let error = Object.assign(err);
    console.log(err.message);
    if (error.code === 11000) {
      error = handleDuplicateFieldsDb(error);
      sendErrorProdJson(error, req, res);
    } else if (err.message.includes('umur')) {
      error = handleNumberRequiredErr('umur', error);
      sendErrorProdJson(error, req, res);
    } else if (err.message.includes('angkatan')) {
      error = handleNumberRequiredErr('angkatan', error);
      sendErrorProdJson(error, req, res);
    } else if (err.message.includes('nik')) {
      error = handleNumberRequiredErr('nik', error);
      sendErrorProdJson(error, req, res);
    } else if (err.message.includes('password')) {
      error = handleNumberRequiredErr('password', error);
      sendErrorProdJson(error, req, res);
    } else if (
      err.message.includes('User dengan email tersebut tidak ditemukan')
    ) {
      sendErrorProdJson(error, req, res);
    } else if (err.message === 'Password atau email salah') {
      sendErrorProdJson(error, req, res);
    } else {
      sendErrorProdPage(error, req, res);
    }
  }
};

console.log(process.env.NODE_ENV);
